import React from "react";
import { Link } from "react-router-dom";

import Cart from "../../components/cart";

function CartPage() {
    return (
        <div>
            <Link to="/">Go to products</Link>
            <Cart />
        </div>
    );
}

export default CartPage;
