import React from "react";
import { useSelector } from "react-redux";

import ProductCard from "../productCard";

import styles from "./index.module.scss";

function Wishlist() {
    const { list: products } = useSelector((state) => state.products || []);
    const { items: wishlist } = useSelector((state) => state.wishlist || {});

    const wishlistProductIds = Object.keys(wishlist);
    const wishlistItems = products.filter(({ id: productId }) =>
        wishlistProductIds.includes(productId)
    );

    if (!wishlistItems.length) {
        return (
            <div className={styles["wishlist-empty"]}>Wishlist is empty !</div>
        );
    }

    return (
        <div className={`${styles["container"]} flex-column`}>
            <div className={`${styles["items-container"]} flex-wrap`}>
                {wishlistItems.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
        </div>
    );
}

export default Wishlist;
