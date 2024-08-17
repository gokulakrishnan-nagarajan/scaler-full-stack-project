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
