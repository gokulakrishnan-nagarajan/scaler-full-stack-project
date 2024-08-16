import React, { useState } from "react";

import Products from "./components/products";

import "./App.css";

function App() {
    const [cart, setCart] = useState({});

    const addToCart = (product) => {
        const newCart = { ...cart };

        if (!newCart[product.id]) {
            newCart[product.id] = {
                ...product,
                quantity: 0,
            };
        }

        newCart[product.id].quantity++;

        setCart(newCart);
    };

    const removeFromCart = (product) => {
        const newCart = { ...cart };

        if (!newCart[product.id]) {
            return;
        }

        newCart[product.id].quantity--;

        if (newCart[product.id].quantity === 0) {
            delete newCart[product.id];
        }

        setCart(newCart);
    };

    return (
        <div className="App">
            <Products
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
            />
        </div>
    );
}

export default App;
