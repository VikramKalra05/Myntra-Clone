import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({children}){
    const [bagItems, setBagItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    return (
        <CartContext.Provider value={{bagItems, setBagItems, wishlist, setWishlist}}>
            {children}
        </CartContext.Provider>
    )
}
