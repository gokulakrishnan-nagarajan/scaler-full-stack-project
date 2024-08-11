import React from "react";

import ProductCard from "../productCard";

const PRODUCTS = [
    { title: "iPhone 14", price: "Rs. 80,000" },
    { title: "Galaxy S20", price: "Rs. 70,000" },
    { title: "OnePlus 7", price: "Rs. 30,000" },
    { title: "Xperia S10", price: "Rs. 20,000" },
    { title: "Mi6", price: "Rs. 10,000" },
];

function Products() {
    return (
        <div>
            {PRODUCTS.map(({ title, price }) => (
                <ProductCard key={title} title={title} price={price} />
            ))}
        </div>
    );
}

export default Products;
