import React from "react";

import ProductDetails from "../../components/productDetails";
import DataFetchWrapper from "../../components/dataFetchWrapper";

function ProductDetailsPage() {
    return (
        <DataFetchWrapper>
            <ProductDetails />
        </DataFetchWrapper>
    );
}

export default ProductDetailsPage;
