import React from "react";

import Products from "../../components/products";
import DataFetchWrapper from "../../components/dataFetchWrapper";

function ProductsPage() {
    return (
        <DataFetchWrapper>
            <Products />
        </DataFetchWrapper>
    );
}

export default ProductsPage;
