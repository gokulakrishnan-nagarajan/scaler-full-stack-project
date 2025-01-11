import { createSlice } from "@reduxjs/toolkit";

import { FETCH_PRODUCTS_URL } from "../../constants/endpoints";
import axiosInstance from "../../axios";
import { setNotificationMessage } from "../notification";

const initialState = { list: null, isLoading: 0 };

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
        .then((res) => {
            const products = res?.data?.data;

            dispatch(loadProducts(products));
        })
        .catch((err) => {
            const { message, type } = err?.response?.data || {};

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );
        })
        .finally(() => dispatch(loadingEnded()));
};
