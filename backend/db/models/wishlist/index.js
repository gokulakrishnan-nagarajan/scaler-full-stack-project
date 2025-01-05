const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        products: {
            type: Map,
            of: Boolean,
            default: {},
        },
    },
    { timestamps: true }
);

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

module.exports = WishlistModel;
