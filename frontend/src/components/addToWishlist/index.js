import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { updateWishlist } from "../../store/wishlist";

import styles from "./index.module.scss";

function AddToWishlist(props) {
    const { product } = props;
    const { id: productId } = product || {};

    const dispatch = useDispatch();

    const isInWishlist = useSelector((state) => {
        return state.wishlist.items[productId] || false;
    });

    const toggleWishlist = () => {
        const payload = { productId, flag: !isInWishlist };

        dispatch(updateWishlist(payload));
    };

    const Icon = isInWishlist ? FavoriteIcon : FavoriteBorderIcon;

    return (
        <Icon
            className={`${styles["wishlist-icon"]} cursor-pointer`}
            fontSize="small"
            onClick={toggleWishlist}
        />
    );
}

export default AddToWishlist;
