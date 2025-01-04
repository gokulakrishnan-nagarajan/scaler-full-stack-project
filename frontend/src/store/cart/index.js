import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../axios";
import { FETCH_CART_URL, UPDATE_CART_URL } from "../../constants/endpoints";

const initialState = { items: {}, isLoading: 0, isUpdating: 0 };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action) {
            state.items = action.payload;
        },
        loadingStarted(state) {
            state.isLoading++;
        },
        loadingEnded(state) {
            state.isLoading--;
        },
        updateStarted(state) {
            state.isUpdating++;
        },
        updateEnded(state) {
            state.isUpdating--;
        },
    },
});

export const {
    setCart,
    loadingStarted,
    loadingEnded,
    updateStarted,
    updateEnded,
} = cartSlice.actions;

export default cartSlice.reducer;

export const fetchCart = () => (dispatch) => {
    dispatch(loadingStarted());

    axiosInstance
        .get(FETCH_CART_URL)
        .then((data) => {
            const cartObj = data.data.data;

            dispatch(setCart(cartObj));
        })
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingEnded()));
};

export const updateCart = (payload) => (dispatch) => {
    dispatch(updateStarted());

    axiosInstance
        .post(UPDATE_CART_URL, payload)
        .then((data) => {
            const cartObj = data.data.data;

            dispatch(setCart(cartObj));
        })
        .catch((err) => console.error(err))
        .finally(() => dispatch(updateEnded()));
};
