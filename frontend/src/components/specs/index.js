import React from "react";

import styles from "./index.module.scss";

function Specs(props) {
    const { specs } = props;

    if (!specs.length) {
        return;
    }

    return (
        <div>
            <div className={styles["title"]}>Specifications</div>
            <ul>
                {specs.map((spec, index) => (
                    <li className={styles["list-item"]} key={index}>
                        {spec.name} - {spec.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Specs;
