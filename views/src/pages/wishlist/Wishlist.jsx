import React, { useContext, useEffect } from "react";
import styles from "./wishlist.module.css"
import { CartContext } from "../../context/CartContextProvider"; 
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Wishlist(){
    const {isAuth} = useContext(AuthContext);
    const {wishlist, setWishlist, bagItems, setBagItems} = useContext(CartContext);

    const handleMoveToBag = (cloth) => {
        setBagItems([
            ...bagItems,
            cloth
        ])
        setWishlist(wishlist.filter((element) => element._id !== cloth._id))
        alert(`${cloth.title} has been moved to bag`)
    }
    
    const handleRemoveWishlistItem = (cloth) => {
        setWishlist(wishlist.filter((element) => element._id !== cloth._id))
        alert(`${cloth.title} has been removed from wishlist`)
    }

    if(!isAuth){
        return <Navigate to="/login" />
    }
    
    return (
        <div id={styles.wishlist}>
            <h1 className={styles.heading}><span className={styles.bold}>My Wishlist</span> {wishlist.length} items</h1>
            <div className={styles.wishlistCont}>
                {
                    wishlist?.map((element, id) => {
                        return (
                            <div className={styles.clothCard} key={id}>
                                <Link>
                                    <img src={element.images[0]} alt="cloth" />
                                </Link>
                                <h2>{element.title}</h2>
                                <p>Rs.{element.discounted_price}</p>
                                <div className={styles.buttonDiv}>
                                    <button onClick={() => handleMoveToBag(element)} className={styles.buttons}>Move to Bag</button>
                                    <button onClick={() => handleRemoveWishlistItem(element)} className={styles.buttons}>Remove from wishlist</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}