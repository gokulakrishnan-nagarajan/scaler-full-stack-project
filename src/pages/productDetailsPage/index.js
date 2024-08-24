import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductDetails from "../../components/productDetails";

function ProductDetailsPage() {
    const params = useParams();
    const { productId } = params;

    const product = useSelector((state) =>
        state.products.list.find((product) => product.id === productId)
    );

    if (!product) {
        return <div className="text-align-center">Product not found !</div>;
    }

    return <ProductDetails product={product} />;
}

export default ProductDetailsPage;
