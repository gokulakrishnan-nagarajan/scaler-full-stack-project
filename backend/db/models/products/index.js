const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});

const specsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const ratingSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: priceSchema,
        brand: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        features: {
            type: [String],
            required: true,
        },
        specs: [specsSchema],
        rating: ratingSchema,
    },
    { timestamps: true }
);

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;
