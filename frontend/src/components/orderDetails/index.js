import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    CURRENY_PUNCTUATION_MAP,
    DEFAULT_CURRENCY,
} from "../../constants/currency";
import { fetchOrderDetails } from "../../store/order";
import { formatAmount, formatDateTime } from "../../utils";
import Loader from "../loader";
import SummaryTable from "../summaryTable";

import styles from "./index.module.scss";

function OrderDetails() {
    const params = useParams();
    const dispatch = useDispatch();

    const { orderId } = params;
    const { details: orderDetails, isLoadingDetails } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(fetchOrderDetails(orderId));
    }, []);

    if (isLoadingDetails) {
        return <Loader />;
    }

    if (!orderDetails) {
        return <div className="p-24 text-align-center">Order not found !</div>;
    }

    const { createdAt, amount } = orderDetails;

    const formattedDateTime = formatDateTime(createdAt);
    const formattedAmount = formatAmount(amount);

    const summary = orderDetails.products.map(
        ({ productId, productName, price, quantity }) => {
            const currencyPunctuation =
                CURRENY_PUNCTUATION_MAP[DEFAULT_CURRENCY];
            const formattedPrice = price.toLocaleString(currencyPunctuation);
            const total = (price * quantity).toLocaleString(
                currencyPunctuation
            );

            return {
                productId,
                productName,
                price: formattedPrice,
                quantity,
                total,
            };
        }
    );

    return (
        <div className={`${styles["container"]} flex-column`}>
            <div
                className={`${styles["id-container"]} flex-align-center flex-justify-space-between`}
            >
                <div>
                    <span>Order : </span>
                    <span className={styles["order-id"]}>{orderId}</span>
                </div>
                <div>
                    <span>Placed on : </span>
                    <span className={styles["date-time"]}>
                        {formattedDateTime}
                    </span>
                </div>
            </div>
            <div
                className={`${styles["products-container"]} flex-justify-center flex-grow-1`}
            >
                <SummaryTable summary={summary} />
            </div>
            <div className={`${styles["amount-container"]} text-align-right`}>
                <span>Total : </span>
                <span className={styles["amount"]}>{formattedAmount}</span>
            </div>
        </div>
    );
}

export default OrderDetails;
