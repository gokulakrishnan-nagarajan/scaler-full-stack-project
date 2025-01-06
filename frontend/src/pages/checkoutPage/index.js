import React from "react";

import Checkout from "../../components/checkout";
import DataFetchWrapper from "../../components/dataFetchWrapper";

function CheckoutPage() {
    return (
        <DataFetchWrapper>
            <Checkout />
        </DataFetchWrapper>
    );
}

export default CheckoutPage;
