import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "" };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotificationMessage(state, action) {
            const { message, type } = action.payload;

            state.message = message;
            state.type = type;
        },
    },
});

export const { setNotificationMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
