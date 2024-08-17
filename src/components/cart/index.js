import React, { useContext } from "react";

import CartContext from "../../context/cartContext/CartContext";
import { CURRENCY_MAP, DEFAULT_CURRENCY } from "../../constants/currency";
import AddToCart from "../addToCart";

import styles from "./index.module.scss";

function Cart() {
    const { cart } = useContext(CartContext);

    const cartItems = Object.values(cart);

    return (
        <div>
            {cartItems.map((item) => {
                const currentSymbol =
                    CURRENCY_MAP[item.price.currency] ??
                    CURRENCY_MAP[DEFAULT_CURRENCY];

                return (
                    <div key={item.id} className={`${styles["container"]}`}>
                        <div>{item.title}</div>
                        <div>
                            {currentSymbol} {item.price.value}
                        </div>
                        <AddToCart product={item} />
                    </div>
                );
            })}
        </div>
    );
}

export default Cart;
