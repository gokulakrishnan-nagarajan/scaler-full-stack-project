import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
    CART,
    CHECKOUT,
    HOME,
    LOGIN,
    PRODUCT,
    REGISTER,
    WISHLIST,
} from "./constants/path";
import Header from "./components/header";
import Loader from "./components/loader";
import Notification from "./components/notification";
import ProtectedRoute from "./components/protectedRoute";

import "./App.css";

function App() {
    const ProductsPage = lazy(() => import("./pages/productsPage"));
    const ProductDetailsPage = lazy(() => import("./pages/productDetailsPage"));
    const CartPage = lazy(() => import("./pages/cartPage"));
    const CheckoutPage = lazy(() => import("./pages/checkoutPage"));
    const RegisterPage = lazy(() => import("./pages/registerPage"));
    const LoginPage = lazy(() => import("./pages/loginPage"));
    const WishlistPage = lazy(() => import("./pages/wishlistPage"));
    const NotFound = lazy(() => import("./pages/notFound"));

    return (
        <div className="App flex-column">
            <BrowserRouter>
                <Header />
                <Notification />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path={REGISTER} element={<RegisterPage />} />
                        <Route path={LOGIN} element={<LoginPage />} />
                        <Route
                            path={HOME}
                            element={
                                <ProtectedRoute>
                                    <ProductsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={`${PRODUCT}/:productId`}
                            element={
                                <ProtectedRoute>
                                    <ProductDetailsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={WISHLIST}
                            element={
                                <ProtectedRoute>
                                    <WishlistPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={CART}
                            element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={CHECKOUT}
                            element={
                                <ProtectedRoute>
                                    <CheckoutPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
