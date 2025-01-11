import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import productsReducer from "./products";
import userReducer from "./user";
import wishlistReducer from "./wishlist";
import notificationReducer from "./notification";
import orderReducer from "./order";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        notification: notificationReducer,
        order: orderReducer,
    },
});
