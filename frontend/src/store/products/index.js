import { createSlice } from "@reduxjs/toolkit";

import { FETCH_PRODUCTS_URL } from "../../constants/endpoints";
import axiosInstance from "../../axios";

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

    axiosInstance
        .get(FETCH_PRODUCTS_URL)
        .then((data) => {
            const products = data.data.data;

            dispatch(loadProducts(products));
        })
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingEnded()));
};
