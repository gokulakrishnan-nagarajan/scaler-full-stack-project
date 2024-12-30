import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/header";
import Loader from "./components/loader";
import { CART, CHECKOUT, HOME, PRODUCT } from "./constants/path";

import "./App.css";

function App() {
    const ProductsPage = lazy(() => import("./pages/productsPage"));
    const ProductDetailsPage = lazy(() => import("./pages/productDetailsPage"));
    const CartPage = lazy(() => import("./pages/cartPage"));
    const CheckoutPage = lazy(() => import("./pages/checkoutPage"));
    const NotFound = lazy(() => import("./pages/notFound"));

    return (
        <div className="App flex-column">
            <BrowserRouter>
                <Header />
                <Suspense fallback={<Loader />}>
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
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
