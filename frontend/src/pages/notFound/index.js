import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { HOME } from "../../constants/path";

function NotFound() {
    const history = useHistory();

    useEffect(() => {
        const timeoutHandle = setTimeout(() => {
            history.push(HOME);
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
