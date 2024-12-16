import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import productsReducer from "./products";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
    },
});
