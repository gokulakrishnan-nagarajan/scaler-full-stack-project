import axios from "axios";

import { store } from "../store";
import { logoutUser } from "../store/user";

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
            config.headers["Authorization"] = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logoutUser());
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
