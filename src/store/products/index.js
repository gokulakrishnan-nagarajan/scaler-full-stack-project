import { createSlice } from "@reduxjs/toolkit";

import { FETCH_PRODUCTS_URL } from "../../constants/endpoints";

const initialState = { list: [] };

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProducts(state, action) {
            const { payload } = action;

            state.list = payload;
        },
    },
});

export const { loadProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = () => (dispatch) => {
    return fetch(FETCH_PRODUCTS_URL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error("Failed to fetch categories");
        })
        .then((data) => dispatch(loadProducts(data)))
        .catch((err) => console.error(err));
};
