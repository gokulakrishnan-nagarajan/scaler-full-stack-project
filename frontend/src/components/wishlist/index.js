import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/products";
import { fetchCart } from "../../store/cart";
import { fetchWishlist } from "../../store/wishlist";
import ProductCard from "../productCard";
import Loader from "../loader";

import styles from "./index.module.scss";

function Wishlist() {
    const dispatch = useDispatch();

    const { list: products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products || []
    );
    const { items: cart, isLoading: isCartLoading } = useSelector(
        (state) => state.cart || {}
    );
    const { items: wishlist, isLoading: isWishlistLoading } = useSelector(
        (state) => state.wishlist || {}
    );

    const wishlistProductIds = Object.keys(wishlist);
    const wishlistItems = products.filter(({ id: productId }) =>
        wishlistProductIds.includes(productId)
    );

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }

        if (!Object.keys(cart).length) {
            dispatch(fetchCart());
        }

        if (!Object.keys(wishlist).length) {
            dispatch(fetchWishlist());
        }
    }, []);

    if (isProductsLoading || isCartLoading || isWishlistLoading) {
        return <Loader />;
    }

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
