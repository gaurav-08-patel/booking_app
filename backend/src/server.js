import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", (req, res) => {
    res.json({ message: "hello from test route." });
});

app.listen(3000, () => {
    console.log(`Server running on PORT 3000`);
});
