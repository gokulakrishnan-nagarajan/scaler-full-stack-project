const express = require("express");

const WishlistModel = require("../../db/models/wishlist");
const authMiddleware = require("../../middlewares/authentication");

const router = express.Router();

// Get wishlist

router.get("/all", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;
        const result =
            (await WishlistModel.findOne({
                userId,
            }).select("products -_id")) || {};
        const products = result.products || {};

        res.send({
            success: true,
            message: "Wishlist fetched successfully",
            data: products,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Wishlist fetch failed. Please try again.",
        });
    }
});

// Update wishlist

router.post("/product", authMiddleware, async (req, res) => {
    try {
        const { userId, productId, flag } = req.body;
        let updateOperation;

        if (flag) {
            updateOperation = {
                $set: {
                    [`products.${productId}`]: true,
                },
            };
        } else {
            updateOperation = {
                $unset: {
                    [`products.${productId}`]: false,
                },
            };
        }

        const result =
            (await WishlistModel.findOneAndUpdate(
                {
                    userId,
                },
                updateOperation,
                { new: true, upsert: true }
            ).select("products -_id")) || {};
        const products = result.products || {};

        res.send({
            success: true,
            message: "Wishlist updated successfully",
            data: products,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Wishlist update failed. Please try again.",
        });
    }
});

module.exports = router;
