import React from "react";
import { useNavigate } from "react-router-dom";

import { ORDERS } from "../../constants/path";
import { formatAmount, formatDateTime } from "../../utils";

import styles from "./index.module.scss";

function OrderCard(props) {
    const { order } = props;
    const { orderId, createdAt, amount } = order;

    const formattedDateTime = formatDateTime(createdAt);
    const formattedAmount = formatAmount(amount);

    const navigate = useNavigate();

    const onOrderClick = (orderId) => () => {
        navigate(`${ORDERS}/${orderId}`);
    };

    return (
        <div
            className={`${styles["container"]} flex-column flex-gap-24 cursor-pointer`}
            onClick={onOrderClick(orderId)}
        >
            <div className="flex-align-center flex-justify-space-between flex-gap-24">
                <div>
                    <span>Order: </span>
                    <span className={styles["order-id"]}>{orderId}</span>
                </div>
                <div className={styles["date-time"]}>{formattedDateTime}</div>
            </div>
            <div>Amount: {formattedAmount}</div>
        </div>
    );
}

export default OrderCard;
