import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required." });
    }

    let user = await User.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: "User does not exist." });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials." });
    }

    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res
        .status(200)
        .json({
            success: true,
            message: "User logged in successfully.",
            userId: user._id,
        });
};
