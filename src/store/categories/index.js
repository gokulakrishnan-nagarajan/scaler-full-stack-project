import { createSlice } from "@reduxjs/toolkit";

import { FETCH_CATEGORIES_URL } from "../../constants/endpoints";

const initialState = { list: [] };

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        loadCategories(state, action) {
            const { payload } = action;

            state.list = payload;
        },
    },
});

export const { loadCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const fetchCategories = () => (dispatch) => {
    return fetch(FETCH_CATEGORIES_URL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error("Failed to fetch categories");
        })
        .then((data) => dispatch(loadCategories(data)))
        .catch((err) => console.error(err));
};
