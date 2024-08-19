import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: {} };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const { payload: product } = action;
            const { id: productId } = product;

            if (!state.items[productId]) {
                state.items[productId] = {
                    ...product,
                    quantity: 0,
                };
            }

            state.items[productId].quantity++;
        },
        removeFromCart(state, action) {
            const { payload: product } = action;
            const { id: productId } = product;

            if (!state.items[productId]) {
                return;
            }

            state.items[productId].quantity--;

            if (state.items[productId].quantity === 0) {
                delete state.items[productId];
            }
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
