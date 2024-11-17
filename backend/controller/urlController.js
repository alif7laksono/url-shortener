// controller/urlController.js

import Url from "../models/urlModel.js";

// GET all URLs
export const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving URLs", error });
    }
};

// GET a URL by ID
export const getUrlById = async (req, res) => {
    const { id } = req.params;

    try {
        const url = await Url.findById(id);
        if (!url) {
            return res.status(404).json({ message: "Link not found" });
        }

        res.status(200).json({ message: "Link found successfully", data: url });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the link", error: error.message });
    }
};

// DELETE a specific URL by ID
export const deleteUrlById = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await Url.findOneAndDelete({ _id: id });
        if (!url) {
            return res.status(404).json({ message: "Link not found" });
        }
        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting a link", error: error.message });
    }
};

// POST to shorten URL
export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ message: "Original URL is required" });
    }

    try {
        let existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({
                message: "URL already shortened",
                data: {
                    originalUrl: existingUrl.originalUrl,
                    shortCode: existingUrl.shortCode,
                    clicks: existingUrl.clicks,
                },
            });
        } else {
            const newUrl = new Url({ originalUrl });
            await newUrl.save();

            return res.status(201).json({
                message: "URL shortened successfully",
                data: {
                    originalUrl: newUrl.originalUrl,
                    shortCode: newUrl.shortCode,
                    clicks: newUrl.clicks,
                },
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating shortened URL", error });
    }
};

// Redirect to the original URL based on shortCode
export const redirectToOriginalUrl = async (req, res) => {
    console.log("Request params", req.params)
    const { shortCode } = req.params;
    try {
        // Find the URL document based on the short code, not the _id field
        const urlDoc = await Url.findOne({ shortCode });
        console.log(urlDoc);

        if (!urlDoc) {
            return res.status(404).send('Short URL not found');
        }

        // Increment the click count
        urlDoc.clicks += 1;
        await urlDoc.save();

        // Redirect to the original URL
        return res.redirect(urlDoc.originalUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error in redirectToOriginalUrl ${shortCode}`);
    }
};
