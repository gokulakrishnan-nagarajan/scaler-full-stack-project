import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { HOME } from "../../constants/path";
import Price from "../price";
import Rating from "../rating";
import Features from "../features";
import Specs from "../specs";
import ImageCarousel from "../imageCarousel";
import WishlistAndCart from "../wishlistAndCart";

import styles from "./index.module.scss";

function ProductDetails() {
    const params = useParams();
    const { productId } = params;

    const product = useSelector((state) =>
        state.products.list.find((product) => product.id === productId)
    );

    if (!product) {
        return <div className="text-align-center">Product not found !</div>;
    }

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
                    <WishlistAndCart product={product} />
                    <Features features={features} />
                    <Specs specs={specs} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
