import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from '../models/User.js';
import { generateVerficationCode, generateTokenAndSetCookie } from "../utils/utils.js";
import { sendVerificationEmail, sendWelcomeEmail, sendForgotPasswordEmail, sendSuccessPasswordChangeEmail } from "../mailtrap/emails.js";
export const signupController = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('All field is required');
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ status: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const verificationCode = generateVerficationCode(); // We send a verification code to complete registration
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationCode,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
        });

        //save user to the database
        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        //send verification email
        await sendVerificationEmail(user.email, verificationCode);
        //send a response
        res.status(201).json({
            success: true, message: "User created successfully", user: { ...user._doc, password: null }
        })
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}
export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Email address not found" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: "Password is not correct" });
        }
        //setup token cookie
        generateTokenAndSetCookie(res, user._id);

        //update our last login
        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Failed to login. Error: " + error.message });
    }
}
export const logoutController = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const verifyEmailController = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // if it is not expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        //we no longer need these two property
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        // "update" user
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ success: true, message: "Welcome message sent!", user: { ...user._doc, password: undefined } });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to verify registration " + error.message });
    }
}

export const forgotPasswordController = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ success: false, message: "There is no user with this email " + email });
        }
        //generate password reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        //send email
        await sendForgotPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset email sent!", user: { ...user._doc, password: undefined } });

    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to send forgot password email. Error: " + error.message });
    }
}

export const resetPasswordController = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });

    if (!user) {
        return res.status(404).json({ success: false, message: "Invalid or expired reset token", });
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    //send success email
    await sendSuccessPasswordChangeEmail(user.email);

    res.status(200).json({ success: true, message: "Password changed!", user: { ...user._doc, password: undefined } });

    try {

    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to change password. Error: " + error.message });
    }
}