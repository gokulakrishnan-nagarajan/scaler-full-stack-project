import React, { useContext } from "react";

import CartContext from "../../context/cartContext/CartContext";

function AddToCart(props) {
    const { product } = props;

    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const increment = () => {
        addToCart(product);
    };

    const decrement = () => {
        removeFromCart(product);
    };

    if (!cart[product.id] || !cart[product.id].quantity) {
        return <button onClick={increment}>Add To Cart</button>;
    }

    return (
        <>
            <button onClick={decrement}>-</button>
            {cart[product.id].quantity}
            <button onClick={increment}>+</button>
        </>
    );
}

export default AddToCart;
