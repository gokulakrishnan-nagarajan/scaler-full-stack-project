import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../../store/cart";

import styles from "./index.module.scss";

function AddToCart(props) {
    const { product } = props;

    const dispatch = useDispatch();

    const quantity = useSelector((state) => {
        return state.cart.items[product.id]?.quantity || 0;
    });

    const increment = () => {
        dispatch(addToCart(product));
    };

    const decrement = () => {
        dispatch(removeFromCart(product));
    };

    if (!quantity) {
        return (
            <button className={styles["add-to-cart"]} onClick={increment}>
                Add To Cart
            </button>
        );
    }

    return (
        <div>
            <button onClick={decrement}>-</button>
            <span className={styles["quantity"]}>{quantity}</span>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default AddToCart;
