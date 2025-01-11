import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../axios";
import {
    FETCH_WISHLIST_URL,
    UPDATE_WISHLIST_URL,
} from "../../constants/endpoints";
import { setNotificationMessage } from "../notification";

const initialState = { items: null, isLoading: 0, isUpdating: 0 };

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist(state, action) {
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
    setWishlist,
    loadingStarted,
    loadingEnded,
    updateStarted,
    updateEnded,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const fetchWishlist = () => (dispatch) => {
    dispatch(loadingStarted());

    axiosInstance
        .get(FETCH_WISHLIST_URL)
        .then((data) => {
            const wishlistObj = data.data.data;

            dispatch(setWishlist(wishlistObj));
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

export const updateWishlist = (payload) => (dispatch) => {
    dispatch(updateStarted());

    axiosInstance
        .post(UPDATE_WISHLIST_URL, payload)
        .then((data) => {
            const wishlistObj = data.data.data;

            dispatch(setWishlist(wishlistObj));
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
        .finally(() => dispatch(updateEnded()));
};
