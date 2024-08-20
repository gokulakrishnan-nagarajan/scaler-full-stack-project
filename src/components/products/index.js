import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/products";
import ProductCard from "../productCard";

import styles from "./index.module.scss";

function Products() {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.list || []);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!products.length) {
            setIsLoading(true);

            dispatch(fetchProducts()).finally(() => {
                setIsLoading(false);
            });
        }
    }, []);

    if (isLoading) {
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
