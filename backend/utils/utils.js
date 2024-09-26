import jwt from "jsonwebtoken";
export const generateVerficationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const generateTokenAndSetCookie = (res, _id) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true, //prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent attack csrf
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 day
    })

    return token;
}