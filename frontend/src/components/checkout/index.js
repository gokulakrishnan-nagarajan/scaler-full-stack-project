import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

import {
    CURRENCY_MAP,
    CURRENY_PUNCTUATION_MAP,
} from "../../constants/currency";
import { createOrder } from "../../store/order";
import { ORDERS } from "../../constants/path";
import SummaryTable from "../summaryTable";

import styles from "./index.module.scss";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list: products } = useSelector((state) => state.products || []);
    const { items: cart } = useSelector((state) => state.cart || {});
    const { details: userDetails } = useSelector((state) => state.user || {});
    const { isCreating: isCreatingOrder } = useSelector(
        (state) => state.order || {}
    );

    const cartProductIds = Object.keys(cart);
    const cartItems = products.filter(({ id: productId }) =>
        cartProductIds.includes(productId)
    );

    if (!cartItems.length) {
        return <div className="p-24 text-align-center">Cart is empty !</div>;
    }

    const currency = cartItems[0].price.currency;
    const total = cartItems.reduce((total, { id, price }) => {
        const actualPrice = price.value - price.discount;
        const quantity = cart[id];

        return total + actualPrice * quantity;
    }, 0);
    const totalInPaise = total * 100;
    const totalStr =
        CURRENCY_MAP[currency] +
        " " +
        total.toLocaleString(CURRENY_PUNCTUATION_MAP[currency]);

    const summary = cartItems.map(({ id, title, price }) => {
        const currencyPunctuation = CURRENY_PUNCTUATION_MAP[price.currency];
        const actualPrice = price.value - price.discount;
        const formattedPrice = actualPrice.toLocaleString(currencyPunctuation);
        const quantity = cart[id];
        const total = (actualPrice * quantity).toLocaleString(
            currencyPunctuation
        );

        return {
            productId: id,
            productName: title,
            price: formattedPrice,
            quantity,
            total,
        };
    });

    const handleToken = (token) => {
        const payload = {
            payment: { token, amount: totalInPaise },
            order: { amount: total, products: [] },
        };

        payload.order.products = cartItems.map(({ id, title, price }) => {
            const actualPrice = price.value - price.discount;
            const quantity = cart[id];

            return {
                productId: id,
                productName: title,
                price: actualPrice,
                quantity,
            };
        });

        dispatch(createOrder(payload))
            .then(({ orderId }) => {
                navigate(`${ORDERS}/${orderId}`);
            })
            .catch();
    };

    return (
        <div className={`${styles["container"]} flex-column`}>
            <div className={`${styles["items-container"]} flex-wrap`}>
                <SummaryTable summary={summary} />
            </div>
            <div
                className={`${styles["actions-container"]} flex-align-center flex-justify-space-between`}
            >
                <span>Total: {totalStr}</span>
                <StripeCheckout
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    name="eComm"
                    description="Enter 4242 4242 4242 4242 for card"
                    currency="INR"
                    email={userDetails.email}
                    amount={totalInPaise}
                    token={handleToken}
                >
                    <button
                        className={`${styles["pay-btn"]} btn-outlined green-btn`}
                        disabled={isCreatingOrder}
                    >
                        {!isCreatingOrder ? "Pay" : "Processing..."}
                    </button>
                </StripeCheckout>
            </div>
        </div>
    );
}

export default Checkout;
