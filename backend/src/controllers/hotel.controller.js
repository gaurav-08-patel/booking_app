import cloudinary from "../../cloudinary.js";
import Hotel from '../model/hotel.model.js';

export const registerHotel = async (req, res) => {
    async function uploadToCloudinary(fileBuffer) {
        // Convert buffer to base64 string
        const base64String = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

        // Upload directly
        const result = await cloudinary.uploader.upload(base64String, {
            folder: "booking_app/hotels", // target folder
        });

        return result.secure_url;
    }

    let imageFiles = req.files;
    const newHotelData = req.body;

    if (!req.files || req.files.length === 0) {
        return res
            .status(400)
            .json({ success: false, message: "No files uploaded." });
    }
    if (!newHotelData.name) {
        return res
            .status(400)
            .json({ success: false, message: "Hotel name is required." });
    }
    if (!newHotelData.city) {
        return res
            .status(400)
            .json({ success: false, message: "Hotel city is required." });
    }
    if (!newHotelData.description) {
        return res.status(400).json({
            success: false,
            message: "Hotel description is required.",
        });
    }
    if (!newHotelData.type) {
        return res
            .status(400)
            .json({ success: false, message: "Hotel type is required." });
    }
    if (!newHotelData.adultCount) {
        return res
            .status(400)
            .json({ success: false, message: "Adult count is required." });
    }
    if (!newHotelData.childCount) {
        return res
            .status(400)
            .json({ success: false, message: "Child count is required." });
    }
    if (!newHotelData.country) {
        return res
            .status(400)
            .json({ success: false, message: "Country is required." });
    }
    if (!newHotelData.pricePerNight) {
        return res
            .status(400)
            .json({ success: false, message: "Price per night is required." });
    }
    if (!newHotelData.starRating) {
        return res
            .status(400)
            .json({ success: false, message: "Star rating is required." });
    }

    try {
        const urls = await Promise.all(
            imageFiles.map((file) => uploadToCloudinary(file.buffer)),
        );

        //populate newHotelDatas
        newHotelData.userId = req.userId;
        newHotelData.imageUrls = urls;

        const newHotel = new Hotel(newHotelData);
        await newHotel.save();

        res.status(201).json({
            success: true,
            message: "Hotel registered successfully.",
            hotel: newHotel,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
