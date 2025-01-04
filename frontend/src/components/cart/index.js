import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    CURRENCY_MAP,
    CURRENY_PUNCTUATION_MAP,
} from "../../constants/currency";
import { CHECKOUT } from "../../constants/path";
import { fetchProducts } from "../../store/products";
import { fetchCart } from "../../store/cart";
import ProductCard from "../productCard";
import Loader from "../loader";

import styles from "./index.module.scss";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list: products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products || []
    );
    const { items: cart, isLoading: isCartLoading } = useSelector(
        (state) => state.cart || {}
    );

    const cartProductIds = Object.keys(cart);
    const cartItems = products.filter(({ id: productId }) =>
        cartProductIds.includes(productId)
    );

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }

        if (!Object.keys(cart).length) {
            dispatch(fetchCart());
        }
    }, []);

    if (isProductsLoading || isCartLoading) {
        return <Loader />;
    }

    if (!cartItems.length) {
        return <div className={styles["cart-empty"]}>Cart is empty !</div>;
    }

    const currency = cartItems[0].price.currency;
    const total = cartItems.reduce((total, { id, price }) => {
        const actualPrice = price.value - price.discount;
        const quantity = cart[id];

        return total + actualPrice * quantity;
    }, 0);
    const totalStr =
        CURRENCY_MAP[currency] +
        " " +
        total.toLocaleString(CURRENY_PUNCTUATION_MAP[currency]);

    const onCheckoutClick = () => {
        navigate(CHECKOUT);
    };

    return (
        <div className={`${styles["container"]} flex-column`}>
            <div className={`${styles["items-container"]} flex-wrap`}>
                {cartItems.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
            <div
                className={`${styles["actions-container"]} flex-align-center flex-justify-space-between`}
            >
                <span>Total: {totalStr}</span>
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
