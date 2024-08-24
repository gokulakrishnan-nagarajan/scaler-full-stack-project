import React from "react";
import { Link } from "react-router-dom";

import Price from "../price";
import Rating from "../rating";
import Features from "../features";
import Specs from "../specs";
import ImageCarousel from "../imageCarousel";
import { HOME } from "../../constants/path";

import styles from "./index.module.scss";

function ProductDetails(props) {
    const { product } = props;

    const { title, brand, category, price, rating, features, specs } =
        product || {};
    const { count: ratingCount, value: ratingValue } = rating || {};

    return (
        <div className={`${styles["container"]} flex-column flex-gap-24`}>
            <div>
                <Link to={HOME}>Products</Link> {">"} {category} {">"} {brand}
            </div>
            <div className={`flex-align-start flex-gap-24`}>
                <div className="">
                    <ImageCarousel product={product} />
                </div>
                <div className={"flex-column flex-gap-8"}>
                    <div className={styles["title"]}>{title}</div>
                    <div className={styles["brand"]}>{brand}</div>
                    <Price price={price} />
                    <Rating rating={ratingValue} count={ratingCount} />
                    <Features features={features} />
                    <Specs specs={specs} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
