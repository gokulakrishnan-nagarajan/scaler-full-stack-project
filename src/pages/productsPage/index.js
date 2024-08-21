import React from "react";
import { Link } from "react-router-dom";

import Products from "../../components/products";

function ProductsPage() {
    return (
        <div className="flex-column flex-align-center">
            <Link to="/cart">Go to cart</Link>
            <Products />
        </div>
    );
}

export default ProductsPage;
