const express = require("express");

const CartModel = require("../../db/models/cart");
const authMiddleware = require("../../middlewares/authentication");
const { NOTIFICATION_TYPE } = require("../../constants/notification");

const router = express.Router();

// Get cart

router.get("/all", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;
        const result =
            (await CartModel.findOne({
                userId,
            }).select("products -_id")) || {};
        const products = result.products || {};

        res.send({
            success: true,
            message: "Cart fetched successfully",
            type: NOTIFICATION_TYPE.INFO,
            data: products,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Cart fetch failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

// Update cart

router.post("/product", authMiddleware, async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let updateOperation;

        if (quantity) {
            updateOperation = {
                $set: {
                    [`products.${productId}`]: quantity,
                },
            };
        } else {
            updateOperation = {
                $unset: {
                    [`products.${productId}`]: 0,
                },
            };
        }

        const result =
            (await CartModel.findOneAndUpdate(
                {
                    userId,
                },
                updateOperation,
                { new: true, upsert: true }
            ).select("products -_id")) || {};
        const products = result.products || {};

        res.send({
            success: true,
            message: "Cart updated successfully",
            type: NOTIFICATION_TYPE.SUCCESS,
            data: products,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Cart update failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

module.exports = router;
