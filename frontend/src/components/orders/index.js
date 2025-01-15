import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../../store/order";
import Loader from "../loader";

import styles from "./index.module.scss";
import OrderCard from "../orderCard";

function Orders() {
    const dispatch = useDispatch();

    const { items: orders, isLoading: isLoadingOrders } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    if (isLoadingOrders) {
        return <Loader />;
    }

    if (!orders.length) {
        return <div className="p-24 text-align-center">No order found !</div>;
    }

    const renderOrders = () => {
        return orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
        ));
    };

    return (
        <div
            className={`${styles["container"]} flex-column flex-align-center p-24`}
        >
            {renderOrders()}
        </div>
    );
}

export default Orders;
