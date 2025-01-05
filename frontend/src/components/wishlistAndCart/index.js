import React from "react";

import AddToWishlist from "../addToWishlist";
import AddToCart from "../addToCart";

import styles from "./index.module.scss";

function WishlistAndCart(props) {
    const { product } = props;

    return (
        <div className={`${styles["actions-container"]} flex-align-center`}>
            <AddToWishlist product={product} />
            <AddToCart product={product} />
        </div>
    );
}

export default WishlistAndCart;
