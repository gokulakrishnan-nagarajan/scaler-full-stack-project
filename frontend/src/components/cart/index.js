import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CHECKOUT } from "../../constants/path";
import ProductCard from "../productCard";

import styles from "./index.module.scss";

function Cart() {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart.items);

    const cartItems = Object.values(cart);

    const onCheckoutClick = () => {
        navigate(CHECKOUT);
    };

    if (!cartItems.length) {
        return <div className={styles["cart-empty"]}>Cart is empty !</div>;
    }

    return (
        <div className={`${styles["container"]} flex-column`}>
            <div className={`${styles["items-container"]} flex-wrap`}>
                {cartItems.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
            <div
                className={`${styles["actions-container"]} flex-align-center flex-justify-center`}
            >
                <button
                    className={`${styles["checkout-btn"]} btn-outlined green-btn`}
                    onClick={onCheckoutClick}
                >
                    Proceed to checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;
