import express from "express";
import { loginUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/validateToken", verifyToken, (req, res) => {
    res.status(200).json({ success: true, userId: req.userId });
});

export default router;