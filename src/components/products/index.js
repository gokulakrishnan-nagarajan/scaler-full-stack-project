import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/products";
import Category from "../category";

import styles from "./index.module.scss";

function Products() {
    const dispatch = useDispatch();

    const { list: products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products || {}
    );

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, []);

    const getCategorizedProducts = () => {
        const categoriesMap = {};

        products.forEach((product) => {
            if (!categoriesMap[product.category]) {
                categoriesMap[product.category] = [];
            }

            categoriesMap[product.category].push(product);
        });

        const categoryArr = Object.keys(categoriesMap);

        return categoryArr.map((category) => (
            <Category
                key={category}
                category={category}
                products={categoriesMap[category]}
            />
        ));
    };

    if (isProductsLoading) {
        return (
            <div className="flex-justify-center">
                <img
                    className={styles.loader}
                    alt="loading"
                    src="https://i.gifer.com/ZKZg.gif"
                />
            </div>
        );
    }

    return <div className="flex-column">{getCategorizedProducts()}</div>;
}

export default Products;
