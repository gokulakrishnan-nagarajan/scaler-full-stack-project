const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        products: {
            type: Map,
            of: Number,
            default: {},
        },
    },
    { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
