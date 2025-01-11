import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../axios";
import {
    FETCH_ORDER_DETAILS_URL,
    FETCH_ORDERS_URL,
} from "../../constants/endpoints";
import { setNotificationMessage } from "../notification";
import { setCart } from "../cart";

const initialState = {
    items: [],
    details: null,
    isLoading: 0,
    isLoadingDetails: 0,
    isCreating: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders(state, action) {
            state.items = action.payload;
        },
        loadingStarted(state) {
            state.isLoading++;
        },
        loadingEnded(state) {
            state.isLoading--;
        },
        setOrderDetails(state, action) {
            state.details = action.payload;
        },
        loadingDetailsStarted(state) {
            state.isLoadingDetails++;
        },
        loadingDetailsEnded(state) {
            state.isLoadingDetails--;
        },
        creatingStarted(state) {
            state.isCreating++;
        },
        creatingEnded(state) {
            state.isCreating--;
        },
    },
});

export const {
    setOrders,
    loadingStarted,
    loadingEnded,
    setOrderDetails,
    loadingDetailsStarted,
    loadingDetailsEnded,
    creatingStarted,
    creatingEnded,
} = orderSlice.actions;

export default orderSlice.reducer;

export const fetchOrders = () => (dispatch) => {
    dispatch(loadingStarted());

    axiosInstance
        .get(FETCH_ORDERS_URL)
        .then((data) => {
            const orders = data.data.data;

            orders.sort(
                (o1, o2) => new Date(o2.createdAt) - new Date(o1.createdAt)
            );

            dispatch(setOrders(orders));
        })
        .catch((err) => {
            const { message, type } = err?.response?.data || {};

            dispatch(setOrders([]));

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );
        })
        .finally(() => dispatch(loadingEnded()));
};

export const fetchOrderDetails = (orderId) => (dispatch) => {
    dispatch(loadingDetailsStarted());

    axiosInstance
        .get(`${FETCH_ORDER_DETAILS_URL}/${orderId}`)
        .then((data) => {
            const orderDetails = data.data.data;

            dispatch(setOrderDetails(orderDetails));
        })
        .catch((err) => {
            const { message, type } = err?.response?.data || {};

            dispatch(setOrderDetails({}));

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );
        })
        .finally(() => dispatch(loadingDetailsEnded()));
};

export const createOrder = (payload) => (dispatch) => {
    dispatch(creatingStarted());

    return axiosInstance
        .post(FETCH_ORDER_DETAILS_URL, payload)
        .then((data) => {
            const { orderDetails, cart } = data.data.data;

            dispatch(setCart(cart));

            return orderDetails;
        })
        .catch((err) => {
            const { message, type } = err?.response?.data || {};

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );

            throw err;
        })
        .finally(() => dispatch(creatingEnded()));
};
