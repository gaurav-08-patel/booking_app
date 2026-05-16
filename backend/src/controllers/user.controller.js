import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "All fields are required." });
    }

    let user = await User.findOne({ email });

    if (user)
        return res
            .status(400)
            .json({ success: false, message: "User already exists." });

    let hashedPassword = await bcrypt.hash(password, 10);

    try {
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save();

        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{
            expiresIn: "15d",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "User registered successfully.",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
