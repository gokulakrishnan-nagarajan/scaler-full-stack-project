import { createSlice } from "@reduxjs/toolkit";

import {
    LOGIN_URL,
    REGISTER_URL,
    USER_DETAILS_URL,
} from "../../constants/endpoints";
import axiosInstance from "../../axios";
import { NOTIFICATION_TYPE } from "../../constants/notification";
import { setNotificationMessage } from "../notification";

const initialState = {
    isRegistering: 0,
    isLoggingin: 0,
    isFetchingDetails: 0,
    details: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registeringStarted(state) {
            state.isRegistering++;
        },
        registeringEnded(state) {
            state.isRegistering--;
        },
        loginStarted(state) {
            state.isLoggingin++;
        },
        loginEnded(state) {
            state.isLoggingin--;
        },
        detailsFetchStarted(state) {
            state.isFetchingDetails++;
        },
        detailsFetchEnded(state) {
            state.isFetchingDetails--;
        },
        setUserDetails(state, action) {
            state.details = action.payload;
        },
    },
});

export const {
    registeringStarted,
    registeringEnded,
    loginStarted,
    loginEnded,
    detailsFetchStarted,
    detailsFetchEnded,
    setUserDetails,
} = userSlice.actions;

export default userSlice.reducer;

export const register = (payload) => (dispatch) => {
    dispatch(registeringStarted());

    return axiosInstance
        .post(REGISTER_URL, payload)
        .then((res) => {
            const { message, type } = res?.data || {};

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );

            return res;
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
        .finally(() => dispatch(registeringEnded()));
};

export const login = (payload) => (dispatch) => {
    dispatch(loginStarted());

    return axiosInstance
        .post(LOGIN_URL, payload)
        .then((res) => {
            const { message, type, token } = res?.data || {};

            localStorage.setItem("authToken", token);

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );

            return res;
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
        .finally(() => dispatch(loginEnded()));
};

export const getUserDetails = () => (dispatch) => {
    dispatch(detailsFetchStarted());

    return axiosInstance
        .get(USER_DETAILS_URL)
        .then((res) => {
            const details = res?.data?.data;

            dispatch(setUserDetails(details));

            return res;
        })
        .catch((err) => {
            const { message, type } = err?.response?.data || {};

            dispatch(setUserDetails(null));

            dispatch(
                setNotificationMessage({
                    message,
                    type,
                })
            );

            throw err;
        })
        .finally(() => dispatch(detailsFetchEnded()));
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("authToken");

    dispatch(setUserDetails(null));

    dispatch(
        setNotificationMessage({
            message: "User logged out successfully",
            type: NOTIFICATION_TYPE.INFO,
        })
    );
};
