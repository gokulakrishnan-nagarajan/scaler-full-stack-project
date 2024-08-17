import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CartContext from "./context/cartContext/CartContext";
import ProductsPage from "./pages/productsPage";
import CartPage from "./pages/cartPage";
import NotFound from "./pages/notFound";

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
            <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={ProductsPage} exact />
                        <Route path="/cart" component={CartPage} exact />
                        <Route component={NotFound} exact />
                    </Switch>
                </BrowserRouter>
            </CartContext.Provider>
        </div>
    );
}

export default App;
