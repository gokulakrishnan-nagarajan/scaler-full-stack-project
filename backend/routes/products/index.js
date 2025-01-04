const express = require("express");

const ProductModel = require("../../db/models/products");

const router = express.Router();

// Get products

router.get("/all", async (req, res) => {
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
