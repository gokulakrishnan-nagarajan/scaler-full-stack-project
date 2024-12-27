import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProductsPage from "./pages/productsPage";
import ProductDetailsPage from "./pages/productDetailsPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";
import NotFound from "./pages/notFound";
import Header from "./components/header";
import { CART, CHECKOUT, HOME, PRODUCT } from "./constants/path";

import "./App.css";

function App() {
    return (
        <div className="App flex-column">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path={HOME} component={ProductsPage} exact />
                    <Route
                        path={`${PRODUCT}/:productId`}
                        component={ProductDetailsPage}
                        exact
                    />
                    <Route path={CART} component={CartPage} exact />
                    <Route path={CHECKOUT} component={CheckoutPage} exact />
                    <Route component={NotFound} exact />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
