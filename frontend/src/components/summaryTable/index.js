import React from "react";

import styles from "./index.module.scss";

function SummaryTable(props) {
    const { summary } = props;

    const renderRows = () => {
        return summary.map(
            ({ productId, productName, price, quantity, total }) => {
                return (
                    <tr key={productId}>
                        <td>{productName}</td>
                        <td>{price}</td>
                        <td>{quantity}</td>
                        <td>{total}</td>
                    </tr>
                );
            }
        );
    };

    return (
        <div className={`${styles["container"]}`}>
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
            </table>
        </div>
    );
}

export default SummaryTable;
