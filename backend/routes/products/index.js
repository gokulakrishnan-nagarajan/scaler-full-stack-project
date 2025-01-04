const express = require("express");

const ProductModel = require("../../db/models/products");
const authMiddleware = require("../../middlewares/authentication");

const router = express.Router();

// Get products

router.get("/all", authMiddleware, async (req, res) => {
    try {
        const products = await ProductModel.find();

        res.send({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Products fetch failed. Please try again.",
        });
    }
});

module.exports = router;
