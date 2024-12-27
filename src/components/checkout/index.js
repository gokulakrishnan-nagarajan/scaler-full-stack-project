import React from "react";
import { useSelector } from "react-redux";

import {
    CURRENCY_MAP,
    CURRENY_PUNCTUATION_MAP,
} from "../../constants/currency";

import styles from "./index.module.scss";

function Checkout() {
    const cart = useSelector((state) => state.cart.items);

    const cartItems = Object.values(cart);

    if (!cartItems.length) {
        return <div className={styles["cart-empty"]}>Cart is empty !</div>;
    }

    const currency = cartItems[0].price.currency;
    const total = cartItems.reduce((total, { price, quantity }) => {
        const actualPrice = price.value - price.discount;

        return total + actualPrice * quantity;
    }, 0);
    const totalStr =
        CURRENCY_MAP[currency] +
        " " +
        total.toLocaleString(CURRENY_PUNCTUATION_MAP[currency]);

    const renderRows = () => {
        return cartItems.map(({ id, title, price, quantity }) => {
            const actualPrice = price.value - price.discount;
            const currencyPunctuation = CURRENY_PUNCTUATION_MAP[price.currency];
            const total = (actualPrice * quantity).toLocaleString(
                currencyPunctuation
            );

            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>{actualPrice.toLocaleString(currencyPunctuation)}</td>
                    <td>{quantity}</td>
                    <td>{total}</td>
                </tr>
            );
        });
    };

    return (
        <div className={styles["container"]}>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Sum to pay</td>
                        <td>{totalStr}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Checkout;
