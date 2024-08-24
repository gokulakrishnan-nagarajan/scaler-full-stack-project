import React from "react";

import styles from "./index.module.scss";

function Features(props) {
    const { features } = props;

    if (!features.length) {
        return;
    }

    return (
        <div>
            <div className={styles["title"]}>Features</div>
            <ul>
                {features.map((feature) => (
                    <li>{feature}</li>
                ))}
            </ul>
        </div>
    );
}

export default Features;
