import React from "react";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";

import {
    DEFAULT_MAX_RATING,
    DEFAULT_RATING_SIZE,
} from "../../constants/rating";

import styles from "./index.module.scss";

function Rating(props) {
    const {
        rating,
        maxRating = DEFAULT_MAX_RATING,
        size = DEFAULT_RATING_SIZE,
        count,
    } = props;

    const getRatings = () => {
        const ratingsArr = new Array(maxRating).fill();

        const ratingsEle = ratingsArr.map((_, index) => {
            const className = `${styles["rating-star"]} ${
                index < rating ? styles["active"] : ""
            }`;

            return (
                <Icon
                    key={index}
                    className={className}
                    path={mdiStar}
                    size={size}
                />
            );
        });

        return ratingsEle;
    };

    return (
        <div className="flex-align-center flex-justify-center">
            <div>{getRatings()}</div>
            <div className={styles["rating-count"]}>({count})</div>
        </div>
    );
}

export default Rating;
