import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/products";
import ProductCard from "../productCard";

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

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default Products;
