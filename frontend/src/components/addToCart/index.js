import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateCart } from "../../store/cart";

import styles from "./index.module.scss";

function AddToCart(props) {
    const { product } = props;
    const { id: productId } = product || {};

    const dispatch = useDispatch();

    const quantity = useSelector((state) => {
        return state.cart.items[productId] || 0;
    });

    const increment = () => {
        const payload = { productId, quantity: quantity + 1 };

        dispatch(updateCart(payload));
    };

    const decrement = () => {
        const payload = { productId, quantity: quantity - 1 };

        dispatch(updateCart(payload));
    };

    if (!quantity) {
        return (
            <button
                className={`${styles["add-to-cart"]} btn-outlined green-btn`}
                onClick={increment}
            >
                Add To Cart
            </button>
        );
    }

    return (
        <div className="flex-align-center">
            <button className={styles["dec-btn"]} onClick={decrement}>
                -
            </button>
            <span className={styles["quantity"]}>{quantity}</span>
            <button className={styles["inc-btn"]} onClick={increment}>
                +
            </button>
        </div>
    );
}

export default AddToCart;
