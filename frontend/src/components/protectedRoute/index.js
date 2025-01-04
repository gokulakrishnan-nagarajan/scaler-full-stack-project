import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "../../constants/path";
import { getUserDetails } from "../../store/user";
import Loader from "../loader";

function ProtectedRoute(props) {
    const { children } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.user.details);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            navigate(LOGIN);

            return;
        }

        if (!userDetails) {
            dispatch(getUserDetails()).catch(() => {
                navigate(LOGIN);
            });
        }
    }, []);

    if (!userDetails) {
        return <Loader />;
    }

    return children;
}

export default ProtectedRoute;
