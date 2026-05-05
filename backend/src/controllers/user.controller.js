import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

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

        user.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
