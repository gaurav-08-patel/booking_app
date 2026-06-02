import express from 'express';
import { searchHotels } from '../controllers/hotel.controller.js';
const router = express.Router();

// to search hotels

router.get("/search", searchHotels);

export default router;