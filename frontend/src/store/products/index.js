import { createSlice } from "@reduxjs/toolkit";

import { FETCH_PRODUCTS_URL } from "../../constants/endpoints";

const initialState = { list: [], isLoading: 0 };

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProducts(state, action) {
            const { payload } = action;

            state.list = payload;
        },
        loadingStarted(state) {
            state.isLoading++;
        },
        loadingEnded(state) {
            state.isLoading--;
        },
    },
});

export const { loadProducts, loadingStarted, loadingEnded } =
    productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = () => (dispatch) => {
    dispatch(loadingStarted());

    fetch(FETCH_PRODUCTS_URL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error("Failed to fetch products");
        })
        .then((data) => dispatch(loadProducts(data)))
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingEnded()));
};
