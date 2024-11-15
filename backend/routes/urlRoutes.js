// routes/urlRoutes.js

import express from "express";
import {
    getAllUrls,
    getUrlById,
    deleteUrlById,
    shortenUrl,
    redirectToOriginalUrl,
} from "../controller/urlController.js";

const router = express.Router();

router.get("/", getAllUrls);
router.get("/:id", getUrlById);
router.delete("/:id", deleteUrlById);
router.post("/", shortenUrl);
router.get('/:shortCode', redirectToOriginalUrl);

export default router;