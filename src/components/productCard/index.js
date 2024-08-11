import React from "react";

import styles from "./index.module.scss";

function ProductCard(props) {
    const { title, price } = props;

    return (
        <div className={styles.container}>
            <div>{title}</div>
            <div>{price}</div>
        </div>
    );
}

export default ProductCard;
