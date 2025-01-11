const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        orders: {
            type: [orderDetailsSchema],
            default: [],
            required: true,
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
