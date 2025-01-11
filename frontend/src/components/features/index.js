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
                {features.map((feature, index) => (
                    <li className={styles["list-item"]} key={index}>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Features;
