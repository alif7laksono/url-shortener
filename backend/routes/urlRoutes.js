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

router.get("/:param", (req, res, next) => {
    const { param } = req.params;

    if (isNumeric(param)) {
        return getUrlById(req, res, next); // now we call our getUrlById which returns item by id
    } else {
        return redirectToOriginalUrl(req, res, next); // or we redirect to other url.
    }
});

router.get("/:shortCode", redirectToOriginalUrl);
router.get("/", getAllUrls);
router.get("/get/:id", getUrlById);
router.delete("/delete/:id", deleteUrlById);
router.post("/", shortenUrl);

export default router;
