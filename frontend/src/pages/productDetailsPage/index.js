import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductDetails from "../../components/productDetails";
import { fetchProducts } from "../../store/products";
import { fetchCart } from "../../store/cart";
import { fetchWishlist } from "../../store/wishlist";
import Loader from "../../components/loader";

function ProductDetailsPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const { productId } = params;

    const product = useSelector((state) =>
        state.products.list.find((product) => product.id === productId)
    );
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

    if (!product) {
        return <div className="text-align-center">Product not found !</div>;
    }

    return <ProductDetails product={product} />;
}

export default ProductDetailsPage;
