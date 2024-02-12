import { useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";
import { Link, Navigate } from "react-router-dom";
import styles from "./bag.module.css";

export default function Bag(){
    const {isAuth} = useContext(AuthContext);
    const {bagItems, setBagItems} = useContext(CartContext);

    var totalMRP = 0;
    for(let i=0; i<bagItems.length; i++){
        totalMRP+=Number(bagItems[i].strike_price);
    }
    
    var discount = 0;
    for(let i=0; i<bagItems.length; i++){
        discount+=Number(bagItems[i].strike_price) - Number(bagItems[i].discounted_price);
    }

    var totalAmount = 0;
    for(let i=0; i<bagItems.length; i++){
        totalAmount+=Number(bagItems[i].discounted_price);
    }
    
    

    if(!isAuth){
        return <Navigate to="/login" />
    }

    const handleRemoveFromBag = (cloth) => {
        setBagItems(bagItems.filter((element) => element._id !== cloth._id));
        alert(`${cloth.title} has been removed from Bag`)
    }

    return (
        <div id={styles.bag}>
            <h1 className={styles.heading}><span className={styles.bold}>Bag</span> {bagItems.length} items</h1>
            <div className={styles.flex}>

            <div className={styles.bagCont}>
                {
                    bagItems?.map((element, id) => {
                        return (
                            <div className={styles.clothCard} key={id}>
                                <Link>
                                    <img src={element.images[0]} alt="cloth" />
                                </Link>
                                <h2>{element.title}</h2>
                                <p>Rs.{element.discounted_price}</p>
                                <div className={styles.buttonDiv}>
                                    <button onClick={() => handleRemoveFromBag(element)} className={styles.buttons}>Remove from Bag</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
                <div className={styles.priceDiv}>
                    <p>PRICE DETAILS</p>
                    <div>
                        <p>Total MRP</p>
                        <p>₹{totalMRP}</p>
                    </div>
                    <div>
                        <p>Total Discount</p>
                        <p id={styles.discount}>-₹{discount}</p>
                    </div>
                    <div>
                        <p>Total Amount</p>
                        <p id={styles.total}>₹{totalAmount}</p>
                    </div>
                    <button>PLACE ORDER</button>
                </div>
            </div>
        </div>
    );
}