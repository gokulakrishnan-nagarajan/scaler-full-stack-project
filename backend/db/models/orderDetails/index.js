const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const orderDetailsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        products: {
            type: [productSchema],
            default: [],
        },
    },
    { timestamps: true }
);

const OrderDetailsModel = mongoose.model("OrderDetails", orderDetailsSchema);

module.exports = OrderDetailsModel;
