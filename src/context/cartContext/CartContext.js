import { createContext } from "react";

const CartContext = createContext({
    cart: {},
    addToCart: () => {},
    removeFromCart: () => {},
});

export default CartContext;
