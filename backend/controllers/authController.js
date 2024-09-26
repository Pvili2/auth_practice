import bcryptjs from "bcryptjs";
import { User } from '../models/User.js';
import { generateVerficationCode, generateTokenAndSetCookie } from "../utils/utils.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
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
    res.send("Login route")
}
export const logoutController = async (req, res) => {
    res.send("Logout route")
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