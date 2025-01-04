import { createSlice } from "@reduxjs/toolkit";

import {
    LOGIN_URL,
    REGISTER_URL,
    USER_DETAILS_URL,
} from "../../constants/endpoints";
import axiosInstance from "../../axios";

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
        .then(() => {})
        .catch((err) => {
            console.error(err);

            throw err;
        })
        .finally(() => dispatch(registeringEnded()));
};

export const login = (payload) => (dispatch) => {
    dispatch(loginStarted());

    return axiosInstance
        .post(LOGIN_URL, payload)
        .then((data) => {
            const authToken = data.data.token;

            localStorage.setItem("authToken", authToken);
        })
        .catch((err) => {
            console.error(err);

            throw err;
        })
        .finally(() => dispatch(loginEnded()));
};

export const getUserDetails = () => (dispatch) => {
    dispatch(detailsFetchStarted());

    return axiosInstance
        .get(USER_DETAILS_URL)
        .then((data) => {
            const details = data.data.data;

            dispatch(setUserDetails(details));
        })
        .catch((err) => {
            console.error(err);

            dispatch(setUserDetails(null));

            throw err;
        })
        .finally(() => dispatch(detailsFetchEnded()));
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("authToken");

    dispatch(setUserDetails(null));
};
