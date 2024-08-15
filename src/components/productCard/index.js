import React from "react";

import { CURRENCY_MAP, DEFAULT_CURRENCY } from "../../constants/currency";

import styles from "./index.module.scss";

function ProductCard(props) {
    const {
        title,
        price: { currency, value },
    } = props;

    const currentSymbol =
        CURRENCY_MAP[currency] ?? CURRENCY_MAP[DEFAULT_CURRENCY];

    return (
        <div className={styles.container}>
            <div>{title}</div>
            <div>
                {currentSymbol} {value}
            </div>
        </div>
    );
}

export default ProductCard;
