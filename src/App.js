import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProductsPage from "./pages/productsPage";
import CartPage from "./pages/cartPage";
import NotFound from "./pages/notFound";

import "./App.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={ProductsPage} exact />
                    <Route path="/cart" component={CartPage} exact />
                    <Route component={NotFound} exact />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
