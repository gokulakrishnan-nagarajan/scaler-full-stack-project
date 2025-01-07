import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationMessage } from "../../store/notification";

function Notification() {
    const dispatch = useDispatch();

    const { message, type } = useSelector((state) => state.notification);

    const onClose = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(setNotificationMessage({}));
    };

    if (!message) {
        return;
    }

    return (
        <Snackbar
            open={message}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert severity={type} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
