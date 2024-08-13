import React, { useEffect, useState } from "react";

import ProductCard from "../productCard";

import styles from "./index.module.scss";

const PRODUCTS = [
    { title: "iPhone 14", price: "Rs. 80,000" },
    { title: "Galaxy S20", price: "Rs. 70,000" },
    { title: "OnePlus 7", price: "Rs. 30,000" },
    { title: "Xperia S10", price: "Rs. 20,000" },
    { title: "Mi6", price: "Rs. 10,000" },
];

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        setProducts([]);

        setTimeout(() => {
            setIsLoading(false);
            setProducts(PRODUCTS);
        }, 2000);
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
            {products.map(({ title, price }) => (
                <ProductCard key={title} title={title} price={price} />
            ))}
        </div>
    );
}

export default Products;
