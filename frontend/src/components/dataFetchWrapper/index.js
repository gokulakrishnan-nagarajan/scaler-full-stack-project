import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/products";
import { fetchCart } from "../../store/cart";
import { fetchWishlist } from "../../store/wishlist";
import Loader from "../loader";

function DataFetchWrapper(props) {
    const { children } = props;

    const dispatch = useDispatch();

    const { list: products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products || []
    );
    const { items: cart, isLoading: isCartLoading } = useSelector(
        (state) => state.cart || {}
    );
    const { items: wishlist, isLoading: isWishlistLoading } = useSelector(
        (state) => state.wishlist || {}
    );

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }

        if (!Object.keys(cart).length) {
            dispatch(fetchCart());
        }

        if (!Object.keys(wishlist).length) {
            dispatch(fetchWishlist());
        }
    }, []);

    if (isProductsLoading || isCartLoading || isWishlistLoading) {
        return <Loader />;
    }

    return children;
}

export default DataFetchWrapper;
