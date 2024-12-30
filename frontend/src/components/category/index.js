import React from "react";

import ProductCard from "../productCard";

import styles from "./index.module.scss";

function Category({ category, products }) {
    return (
        <div className={`${styles["container"]} flex-column`}>
            <div className={styles["category-title"]}>{category}</div>
            <div className={`${styles["products-container"]} flex-no-wrap`}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Category;
