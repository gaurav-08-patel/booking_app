import express from "express";
let router = express.Router();
import multer from "multer";
import { getHotels, registerHotel } from "../controllers/hotel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import Hotel from "../model/hotel.model.js";

let storage = multer.memoryStorage();

let upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload", verifyToken, upload.array("images", 6), registerHotel);

router.get("/", verifyToken, getHotels);

export default router;
