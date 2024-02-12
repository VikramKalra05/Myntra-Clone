import { useContext, useState } from "react"
import styles from "./productGrid.module.css"
import { CartContext } from "../../context/CartContextProvider"
import { Link } from "react-router-dom";

export default function ProductGrid({cloth}){
    const {wishlist, setWishlist} = useContext(CartContext);

    const handleButton = () => {
        const exists = wishlist.some(item => item.id === cloth.id)
        var updatedCloth = {
            ...cloth,
            orderSize: cloth.size[0]
        }
        if(!exists){
            setWishlist([
                ...wishlist,
                updatedCloth
            ]);
            alert(`${cloth.title} has been added to your wishlist`);
        }else{
            alert("Item already exists in your wishlist");
        }
    };

    const getCategorySegment = (category) => {
        switch (category) {
            case "Mens":
                return "men";
            case "Womens":
                return "women";
            case "Child":
                return "kids";
            default:
                return "";
        }
    };

    return (
        <div className={styles.product}>
            <Link to={`/shop/${getCategorySegment(cloth.category)}/${cloth._id}`} className={styles.imageLink}>
                <img src={cloth.images[0]} alt="product image" />
            </Link>
            <div className={styles.details}>
                <h2>{cloth.brand}</h2>
                <h3>{cloth.title}</h3>
                <p><span className={styles.currentPrice}>Rs. {cloth.discounted_price}</span> <span className={styles.strikePrice}>Rs. {cloth.strike_price}</span> <span id={styles.discount}>{cloth.discount}</span></p>
                <button onClick={() => handleButton()}>ADD TO WISHLIST</button>
            </div>
        </div>
    )
}