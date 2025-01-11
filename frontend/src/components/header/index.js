import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";

import { CART, HOME, LOGIN, ORDERS, WISHLIST } from "../../constants/path";
import { logoutUser } from "../../store/user";

import styles from "./index.module.scss";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.user.details);

    const { name = "" } = userDetails || {};
    const firstName = name.split(" ")[0];

    const onHomeClick = () => {
        navigate(HOME);
    };

    const onWishlistClick = () => {
        navigate(WISHLIST);
    };

    const onCartClick = () => {
        navigate(CART);
    };

    const onOrdersClick = () => {
        navigate(ORDERS);
    };

    const onSignOutClick = () => {
        dispatch(logoutUser());

        navigate(LOGIN);
    };

    const renderUserSection = () => {
        if (!userDetails) {
            return;
        }

        return (
            <>
                <div className={`${styles["user-details"]} flex-align-center`}>
                    <PersonIcon fontSize="large" />
                    <span>{firstName}</span>
                </div>
                <span>|</span>
                <Tooltip title="Wishlist">
                    <FavoriteIcon
                        className="cursor-pointer"
                        onClick={onWishlistClick}
                    />
                </Tooltip>
                <Tooltip title="Cart">
                    <ShoppingCartIcon
                        className="cursor-pointer"
                        onClick={onCartClick}
                    />
                </Tooltip>
                <Tooltip title="Orders">
                    <SellIcon
                        className="cursor-pointer"
                        onClick={onOrdersClick}
                    />
                </Tooltip>
                <Tooltip title="Sign Out">
                    <ExitToAppIcon
                        className="cursor-pointer"
                        onClick={onSignOutClick}
                    />
                </Tooltip>
            </>
        );
    };

    return (
        <div
            className={`${styles["container"]} flex-align-center flex-justify-space-between`}
        >
            <div className={styles["left-section"]}>
                <div className="cursor-pointer" onClick={onHomeClick}>
                    eComm
                </div>
            </div>
            <div className={`${styles["right-section"]} flex-align-center`}>
                {renderUserSection()}
            </div>
        </div>
    );
}

export default Header;
