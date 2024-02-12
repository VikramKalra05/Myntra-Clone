import { useContext, useEffect, useState } from "react";
import styles from "./productPage.module.css";
import { Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider"
import getCloth from "./getCloth";
import { StarIcon } from "@chakra-ui/icons";
import { CartContext } from "../../context/CartContextProvider";

export default function ProductPage(){
    const {isAuth} = useContext(AuthContext);
    const [cloth, setCloth] = useState({});
    const url = useLocation().pathname;
    const [loading, setLoading] = useState(true);
    const {wishlist, setWishlist, bagItems, setBagItems} = useContext(CartContext);

    const handleWishlistButton = () => {
        const exists = wishlist.some(item => item.id === cloth.id);
        var updatedCloth = cloth;
        if(!cloth?.orderSize){
            updatedCloth = {
                ...cloth,
                orderSize: cloth.size[0]
            }
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

    const handleBagButton = () => {
        const exists = bagItems.some(item => item.id === cloth.id)
        var updatedCloth = cloth;
        if(!cloth?.orderSize){
            updatedCloth = {
                ...cloth,
                orderSize: cloth.size[0]
            }
        }
        if(!exists){
            setBagItems([
                ...bagItems,
                updatedCloth
            ]);
            alert(`${cloth.title} has been added to your Bag`);
        }else{
            alert("Item already exists in your Bag");
        }
    };

    const type = url.split("/")[2];
    const id = url.split("/")[3];

    const getClothes = async () => {
        const result = await getCloth(id, type);
        if(result.mens){
            setCloth(result.mens);    
            setLoading(false);        
        }else if(result.womens){
            setCloth(result.womens);    
            setLoading(false);        
        }else if(result.kids){
            setCloth(result.kids);    
            setLoading(false);        
        }else{
            alert(result.msg);
        }
    }

    useEffect(() => {
        if(isAuth){
            getClothes();
        }
    })

    const handleSize = (size) => {
        setCloth({
            ...cloth,
            orderSize: size
        })
    }

    if(loading){
        return (
            <div className={styles.spinner}>
                <Spinner padding='20px' speed="0.75s" color="#ff2459" thickness="4px"/>
            </div>
        )
    }

    return (
        <div className={styles.main}>
            <div className={styles.imgCont}>
                {cloth?.images.reverse().map((element, id) => {
                    return (
                        <div key={id}>
                            <img src={element} alt={cloth.title} key={id}/>
                        </div>
                    )
                })}
            </div>
            <div classname={styles.detailsDiv}>
                <h2 className={styles.brand}>{cloth?.brand}</h2>
                <h4 className={styles.title}>{cloth?.title}</h4>
                <div className={styles.ratingDiv}>
                    <p id={styles.rating}>{cloth?.rating} <span><StarIcon color="#14958f"/></span></p>
                    <div className={styles.verticalLine}></div>
                    <p id={styles.ratingCount}>{cloth?.rating_count} Ratings</p>
                </div>
                <div className={styles.horizontalLine}></div>
                <h3><span className={styles.price}>₹{cloth?.discounted_price}</span>  <span className={styles.mrp}>MRP <span className={styles.strikePrice}>₹{cloth?.strike_price}</span></span> <span className={styles.discount}>{cloth?.discount}</span></h3>
                <p className={styles.taxText}>inclusive of all taxes</p>
                <div className={styles.sizeDiv}>
                    <h2 className={styles.sizeH2}>SELECT SIZE</h2>
                    <div className={styles.sizeCont}>
                        {cloth?.size.map((size, id) => {
                            return (
                                <button 
                                className={styles.sizeBtn}
                                key={id}
                                onClick={() => handleSize(size)}
                                >
                                    {size}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.cartBtn}>
                    <button className={styles.bagBtn} onClick={() => handleBagButton()}>ADD TO BAG</button>
                    <button className={styles.wishlistBtn} onClick={() => handleWishlistButton()}>WISHLIST</button>
                </div>
            </div>
        </div>
    )
}