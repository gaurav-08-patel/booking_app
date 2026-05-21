import express from "express";
let router = express.Router();
import multer from "multer";

let storage = multer.memoryStorage();

let upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload", (req, res) => {
   
    res.send("test route");
});