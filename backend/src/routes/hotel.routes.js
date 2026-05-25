import express from "express";
let router = express.Router();
import multer from "multer";
import { registerHotel } from "../controllers/hotel.controller.js";

let storage = multer.memoryStorage();

let upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload", upload.array("images",6) , registerHotel );

export default router;