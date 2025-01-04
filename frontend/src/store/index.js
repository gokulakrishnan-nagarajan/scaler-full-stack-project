import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import productsReducer from "./products";
import userReducer from "./user";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        user: userReducer,
    },
});
