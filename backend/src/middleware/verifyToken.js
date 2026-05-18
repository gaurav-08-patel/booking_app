import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res
            .status(403)
            .json({ success: false, message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    } catch (err) {
        return res
            .status(403)
            .json({ success: false, message: "Access denied" });
    }

    next();
};
