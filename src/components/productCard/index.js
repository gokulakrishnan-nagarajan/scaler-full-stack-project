import React from "react";
import { useHistory } from "react-router-dom";

import AddToCart from "../addToCart";
import Rating from "../rating";
import Price from "../price";
import { PRODUCT } from "../../constants/path";

import styles from "./index.module.scss";

function ProductCard(props) {
    const { product } = props;

    const history = useHistory();

    const { id, title, brand, price, rating, images } = product || {};
    const { count: ratingCount, value: ratingValue } = rating || {};

    const onProductClick = () => {
        history.push(`${PRODUCT}/${id}`);
    };

    return (
        <div className={`${styles["container"]} flex-align-start flex-gap-24`}>
            <img
                className={`${styles["img"]} cursor-pointer`}
                src={images[0]}
                alt={title}
                onClick={onProductClick}
            />
            <div className={"flex-column flex-gap-8"}>
                <div
                    className={`${styles["title"]} cursor-pointer`}
                    onClick={onProductClick}
                >
                    {title}
                </div>
                <div className={styles["brand"]}>{brand}</div>
                <Price price={price} />
                <Rating rating={ratingValue} count={ratingCount} />
                <AddToCart product={product} />
            </div>
        </div>
    );
}

export default ProductCard;
