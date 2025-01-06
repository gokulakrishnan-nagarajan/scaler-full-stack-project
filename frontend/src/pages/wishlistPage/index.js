import React from "react";

import Wishlist from "../../components/wishlist";
import DataFetchWrapper from "../../components/dataFetchWrapper";

function LoginPage() {
    return (
        <DataFetchWrapper>
            <Wishlist />
        </DataFetchWrapper>
    );
}

export default LoginPage;
