import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HOME } from "../../constants/path";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutHandle = setTimeout(() => {
            navigate(HOME);
        }, 2000);

        return () => {
            clearTimeout(timeoutHandle);
        };
    }, []);

    return (
        <div className="text-align-center">
            Not Found ! Redirecting to home.
        </div>
    );
}

export default NotFound;
