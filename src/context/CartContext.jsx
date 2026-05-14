import { createcontextc, useState, useEffect } from "react";

export const CartContext = createcontextc();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const savedcart =
        JSON.parse(localStorage.getItem("cart"));
    

        if (savedcart) {
            setCart(savedcart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product) {
        setCart([...cart, product]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
