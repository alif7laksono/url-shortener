// index.js

import express from "express";
import mongoose from "mongoose";
import { port, mongoDBURL } from "./db/config.js";
import UrlRoutes from "./routes/urlRoutes.js";
import { redirectToOriginalUrl } from "./controller/urlController.js"
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Register URL routes
app.use("/", UrlRoutes);

// Connect to MongoDB
mongoose
    .connect(mongoDBURL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to the database:", err));

// Root route
app.get("/", (req, res) => {
    res.send("Full Stack MERN URL Shortener!");
});

app.get("/:shorCode", redirectToOriginalUrl)

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
