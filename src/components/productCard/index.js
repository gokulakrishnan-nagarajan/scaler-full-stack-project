import React from "react";

import { CURRENCY_MAP, DEFAULT_CURRENCY } from "../../constants/currency";
import AddToCart from "../addToCart";

import styles from "./index.module.scss";

function ProductCard(props) {
    const { product } = props;

    const currentSymbol =
        CURRENCY_MAP[product.price.currency] ?? CURRENCY_MAP[DEFAULT_CURRENCY];

    return (
        <div className={styles.container}>
            <div>{product.title}</div>
            <div>
                {currentSymbol} {product.price.value}
            </div>
            <AddToCart product={product} />
        </div>
    );
}

export default ProductCard;
