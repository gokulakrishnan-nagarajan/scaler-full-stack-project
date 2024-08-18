import React from "react";

import { CURRENCY_MAP, DEFAULT_CURRENCY } from "../../constants/currency";
import AddToCart from "../addToCart";
import Rating from "../rating";

import styles from "./index.module.scss";

function ProductCard(props) {
    const { product } = props;

    const { title, price, rating } = product || {};
    const { currency, value: priceValue } = price || {};
    const { count: ratingCount, value: ratingValue } = rating || {};

    const currentSymbol =
        CURRENCY_MAP[currency] ?? CURRENCY_MAP[DEFAULT_CURRENCY];

    return (
        <div className={styles.container}>
            <div>{title}</div>
            <div>
                {currentSymbol} {priceValue}
            </div>
            <Rating rating={ratingValue} count={ratingCount} />
            <AddToCart product={product} />
        </div>
    );
}

export default ProductCard;
