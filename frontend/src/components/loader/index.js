import React from "react";

import styles from "./index.module.scss";

function Loader() {
    return (
        <div className="flex-justify-center">
            <img
                className={styles.loader}
                alt="loading"
                src="https://i.gifer.com/ZKZg.gif"
            />
        </div>
    );
}

export default Loader;
