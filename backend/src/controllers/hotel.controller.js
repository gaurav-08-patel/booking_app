import cloudinary from "../../cloudinary.js";
import Hotel from "../model/hotel.model.js";

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

export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId }).sort({
            updatedAt: -1,
        });
        res.status(200).json(hotels);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const getHotelById = async (req, res) => {
    const id = req.params.id;
    try {
        const hotel = await Hotel.findById({ _id: id });
        res.status(200).json(hotel);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const updateHotel = async (req, res) => {
    const hotelId = req.params.hotelId;
    const updatedHotelData = req.body;

    if (req.files && req.files.length > 0) {
        const imageFiles = req.files;
        const imageUrls = await Promise.all(
            imageFiles.map((file) => uploadToCloudinary(file.buffer)),
        );
        updatedHotelData.imageUrls.push(...imageUrls);
    }

    await Hotel.findByIdAndUpdate({ _id: hotelId }, updatedHotelData);

    res.status(200).json({ success: true });
};

export const searchHotels = async (req, res) => {
    const query = constructSearchQuery(req.query);
    const sortOption = {};

    switch (req.query.sortOption) {
        case "priceLowToHigh":
            sortOption = { pricePerNight: 1 };
            break;
        case "priceHighToLow":
            sortOption = { pricePerNight: -1 };
            break;
        case "starRating":
            sortOption = { starRating: -1 };
            break;
    }

    try {
        const pageSize = 6;
        const pageNumber = parseInt(req.query.page) || 1;
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query).sort(sortOption).skip(skip).limit(pageSize);

        const totalPages = Math.ceil(
            (await Hotel.countDocuments(query)) / pageSize,
        );

        res.status(200).json({
            hotels,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalHotels: await Hotel.countDocuments(query),
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

function constructSearchQuery(query) {
    const searchQuery = {};

    if (query.destination) {
        searchQuery.$or = [
            { city: { $regex: query.destination.trim(), $options: "i" } },
            { country: { $regex: query.destination.trim(), $options: "i" } },
        ];
    }


    if (query.adultCount) {
        searchQuery.adultCount = {
            $gte: parseInt(query.adultCount),
        };
    }

    if (query.childCount) {
        searchQuery.childCount = {
            $gte: parseInt(query.childCount),
        };
    }

    if (query.facilities) {
        searchQuery.facilities = {
            $all: Array.isArray(query.facilities)
                ? query.facilities
                : [query.facilities],
        };
    }

    if (query.types) {
        searchQuery.type = {
            $in: Array.isArray(query.types) ? query.types : [query.types],
        };
    }

    if (query.starRating) {
        let startRating = Array.isArray(query.starRating)
            ? query.starRating.map((rating) => parseInt(rating))
            : [parseInt(query.starRating)];
        searchQuery.starRating = {
            $in: startRating,
        };
    }

    if (query.maxPrice) {
        searchQuery.pricePerNight = {
            $lte: parseInt(query.maxPrice),
        };
    }

    return searchQuery;
}
