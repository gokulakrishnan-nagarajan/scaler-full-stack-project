import React from "react";

function AddToCart(props) {
    const { product, cart, addToCart, removeFromCart } = props;

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
