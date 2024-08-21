import React from "react";

import { CURRENCY_MAP, DEFAULT_CURRENCY } from "../../constants/currency";
import AddToCart from "../addToCart";
import Rating from "../rating";

import styles from "./index.module.scss";

function ProductCard(props) {
    const { product } = props;

    const { title, brand, price, rating, images } = product || {};
    const { currency, value: priceValue, discount } = price || {};
    const { count: ratingCount, value: ratingValue } = rating || {};

    const currentSymbol =
        CURRENCY_MAP[currency] ?? CURRENCY_MAP[DEFAULT_CURRENCY];

    return (
        <div className={`${styles["container"]} flex-align-start flex-gap-24`}>
            <img className={styles["img"]} src={images[0]} alt={title} />
            <div
                className={`${styles["details-container"]} flex-column flex-gap-8`}
            >
                <div className={styles["title"]}>{title}</div>
                <div className={styles["brand"]}>{brand}</div>
                <div className={styles["price"]}>
                    <span>
                        {currentSymbol} {priceValue - discount}
                    </span>
                    <span className={styles["original-price"]}>
                        {currentSymbol} {priceValue}{" "}
                    </span>
                    <span className={styles["discount-percentage"]}>
                        ({((discount / priceValue) * 100).toFixed(2)}% off)
                    </span>
                </div>
                <Rating rating={ratingValue} count={ratingCount} />
                <AddToCart product={product} />
            </div>
        </div>
    );
}

export default ProductCard;
