const express = require("express");
const stripe = require("stripe");

const OrderModel = require("../../db/models/order");
const OrderDetailsModel = require("../../db/models/orderDetails");
const CartModel = require("../../db/models/cart");
const authMiddleware = require("../../middlewares/authentication");
const { NOTIFICATION_TYPE } = require("../../constants/notification");

const router = express.Router();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Get orders

router.get("/", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;
        const result =
            (await OrderModel.findOne({
                userId,
            }).select("orders -_id")) || {};
        const orders = result.orders || [];

        res.send({
            success: true,
            message: "Orders fetched successfully",
            type: NOTIFICATION_TYPE.INFO,
            data: orders,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Orders fetch failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

// Get order details

router.get("/:orderId", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;
        const { orderId } = req.params;

        const result = await OrderDetailsModel.findOne({
            _id: orderId,
            userId,
        }).select("_id amount products createdAt");

        let orderDetails = null;

        if (result) {
            const { _id, amount, products, createdAt } = result;

            orderDetails = {
                orderId: _id,
                userId,
                amount,
                products,
                createdAt,
            };
        }

        res.send({
            success: true,
            message: "Order details fetched successfully",
            type: NOTIFICATION_TYPE.INFO,
            data: orderDetails,
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Order details fetch failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

// Create order

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { userId, payment, order } = req.body;

        // Processing payment

        const charge = await stripeInstance.charges.create({
            amount: payment.amount,
            currency: "INR",
            source: payment.token.id,
            description: `Payment by ${userId}`,
        });

        // Create order details

        order.userId = userId;
        order.transactionId = charge.id;

        const newOrder = new OrderDetailsModel(order);

        const result = await newOrder.save();
        const { _id, amount, products, createdAt } = result;
        const orderDetails = {
            orderId: _id,
            userId,
            amount,
            products,
            createdAt,
        };

        // Add order details to user orders

        await OrderModel.findOneAndUpdate(
            {
                userId,
            },
            {
                $push: {
                    orders: { orderId: _id, amount, createdAt },
                },
            },
            { new: true, upsert: true }
        );

        // Empty user cart

        const cartResult =
            (await CartModel.findOneAndUpdate(
                {
                    userId,
                },
                {
                    $set: {
                        products: {},
                    },
                },
                { new: true, upsert: true }
            ).select("products -_id")) || {};
        const cart = cartResult.products || {};

        res.send({
            success: true,
            message: "Order created successfully",
            type: NOTIFICATION_TYPE.SUCCESS,
            data: { orderDetails, cart },
        });
    } catch (err) {
        console.log("Error", err);

        res.status(400).send({
            success: false,
            message: "Order creation failed. Please try again.",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
});

module.exports = router;
