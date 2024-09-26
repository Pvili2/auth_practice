import { mailtrapClient, sender } from "./config.js"
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js"
export const sendVerificationEmail = async (email, veriCode) => {
    const recipient = [{
        email
    }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", veriCode),
            category: "Email Verification"
        })
        console.log("Email sent successfully");
    } catch (error) {
        throw new Error(`Error sending verification email: ${error.message}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "81236a86-168a-4774-a749-0dfe564d1b5a",
            template_variables: {
                "name": name,
                "company_info_name": "Test_Company_info_name"
            },
        })

        console.log("Welcome email sent successfully");
    } catch (error) {
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
}

export const sendForgotPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Reset Password",
            subject: "Forgot password"
        })

        console.log("Password reset email sent!");
        return;
    } catch (error) {
        throw new Error("Failed to send email");
    }
}

export const sendSuccessPasswordChangeEmail = async (email) => {
    const recipient = [{ email }];

    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password successfully changed",
            subject: "Password changed"
        })

        console.log("Password change email sent!");
        return;
    } catch (error) {
        console.log("Failed to send password change email!");
        throw new Error(error.message);
    }
}