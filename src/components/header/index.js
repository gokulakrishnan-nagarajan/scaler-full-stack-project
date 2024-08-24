import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { CART, HOME } from "../../constants/path";

import styles from "./index.module.scss";

function Header() {
    const history = useHistory();

    const cart = useSelector((state) => state.cart.items);

    const cartItems = Object.values(cart);

    const onHomeClick = () => {
        history.push(HOME);
    };

    const onCartClick = () => {
        history.push(CART);
    };

    return (
        <div className={`${styles["container"]} flex-justify-space-between`}>
            <div className={styles["left-section"]}>
                <div
                    className="cursor-pointer flex-align-center"
                    onClick={onHomeClick}
                >
                    eComm
                </div>
            </div>
            <div className={styles["right-section"]}>
                <div
                    className="cursor-pointer flex-align-center"
                    onClick={onCartClick}
                >
                    Cart ({cartItems.length})
                </div>
            </div>
        </div>
    );
}

export default Header;
