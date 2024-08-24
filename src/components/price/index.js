import React from "react";

import {
    CURRENCY_MAP,
    CURRENY_PUNCTUATION_MAP,
    DEFAULT_CURRENCY,
} from "../../constants/currency";

import styles from "./index.module.scss";

function Price(props) {
    const { price } = props;

    const { currency, value: priceValue, discount } = price || {};

    const currentSymbol =
        CURRENCY_MAP[currency] ?? CURRENCY_MAP[DEFAULT_CURRENCY];
    const currencyPunctuation = CURRENY_PUNCTUATION_MAP[currency];

    return (
        <div>
            <span>
                {currentSymbol}{" "}
                {(priceValue - discount).toLocaleString(currencyPunctuation)}
            </span>
            <span className={styles["original-price"]}>
                {currentSymbol} {priceValue.toLocaleString(currencyPunctuation)}
            </span>
            <span className={styles["discount-percentage"]}>
                ({((discount / priceValue) * 100).toFixed(2)}% off)
            </span>
        </div>
    );
}

export default Price;
