import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";

function ImageCarousel(props) {
    const { product } = props;
    const { title, images } = product || {};

    const [currentImgIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timeoutHandle = setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 2000);

        return () => {
            clearTimeout(timeoutHandle);
        };
    }, [currentImgIndex, images]);

    const onPrevImg = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
        );
    };

    const onNextImg = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className={`${styles["container"]} flex-align-center`}>
            <div
                className={`${styles["img-nav-prev"]} cursor-pointer`}
                onClick={onPrevImg}
            >
                {"<"}
            </div>
            <div className={styles["img-container"]}>
                <img
                    className={styles["img"]}
                    src={images[currentImgIndex]}
                    alt={title}
                />
            </div>
            <div
                className={`${styles["img-nav-next"]} cursor-pointer`}
                onClick={onNextImg}
            >
                {">"}
            </div>
        </div>
    );
}

export default ImageCarousel;
