import { mailtrapClient, sender } from "./config.js"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
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