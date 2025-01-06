import React from "react";

import Cart from "../../components/cart";
import DataFetchWrapper from "../../components/dataFetchWrapper";

function CartPage() {
    return (
        <DataFetchWrapper>
            <Cart />
        </DataFetchWrapper>
    );
}

export default CartPage;
