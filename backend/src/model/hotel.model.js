import mongoose from "mongoose";

let HotelSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    adultCount: {
        type: Number,
        required: true,
    },
    childCount: {
        type: Number,
        required: true,
    },
    facilities: [
        {
            type: String,
            required: true,
        },
    ],
    pricePerNight: {
        type: Number,
        required: true,
    },
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    imageUrls: [
        {
            type: String,
            required: true,
        },
    ],
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

let Hotel = mongoose.model("Hotel", HotelSchema);
