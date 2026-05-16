import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";


mongoose
    .connect(process.env.Mongo_DB_URI)
    .then(() => {
        console.log("Connected to MongoDB .");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log(`Server running on PORT 3000`);
});
