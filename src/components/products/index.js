import React, { useEffect, useState } from "react";

import { fetchProducts } from "../../helper/api";
import ProductCard from "../productCard";

import styles from "./index.module.scss";

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        setProducts([]);

        fetchProducts()
            .then((data) => {
                console.log("Debug", "products", data);

                setProducts(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <img
                className={styles.loader}
                alt="loading"
                src="https://i.gifer.com/ZKZg.gif"
            />
        );
    }

    return (
        <div>
            {products.map(({ id, title, price }) => (
                <ProductCard key={id} title={title} price={price} />
            ))}
        </div>
    );
}

export default Products;
