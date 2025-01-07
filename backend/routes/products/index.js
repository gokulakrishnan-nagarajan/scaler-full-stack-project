const express = require("express");

const ProductModel = require("../../db/models/products");
const authMiddleware = require("../../middlewares/authentication");
const { NOTIFICATION_TYPE } = require("../../constants/notification");

const router = express.Router();

// Get products

router.get("/all", authMiddleware, async (req, res) => {
    try {
        const products = await ProductModel.find();

        res.send({
            success: true,
            message: "Products fetched successfully",
            type: NOTIFICATION_TYPE.INFO,
            data: products,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Products fetch failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

module.exports = router;
