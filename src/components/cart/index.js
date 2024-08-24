import React from "react";
import { useSelector } from "react-redux";

import ProductCard from "../productCard";

import styles from "./index.module.scss";

function Cart() {
    const cart = useSelector((state) => state.cart.items);

    const cartItems = Object.values(cart);

    if (!cartItems.length) {
        return <div className={styles["cart-empty"]}>Cart is empty !</div>;
    }

    return (
        <div className={`${styles["container"]} flex-wrap`}>
            {cartItems.map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
        </div>
    );
}

export default Cart;
