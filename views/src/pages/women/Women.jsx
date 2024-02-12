import { useContext, useEffect, useState } from "react";
import styles from "./women.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'
import getWomensClothes from "./getWomensClothes";
import ProductGrid from "../../components/productGrid/ProductGrid";

function Women(){
    const [womenClothes, setWomenClothes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState({});
    const {isAuth} = useContext(AuthContext);

    const getClothes = async () => {
        const result = await getWomensClothes(filter, sort);
        if(result.womens){
            let sortedClothes = [...result.womens]; 
            if (sort === "discount") {
                sortedClothes.sort((a, b) => b.discount - a.discount);
            } else if (sort === "lowToHigh") {
                sortedClothes.sort((a, b) => a.discounted_price - b.discounted_price); 
            } else if (sort === "highToLow") {
                sortedClothes.sort((a, b) => b.discounted_price - a.discounted_price);
            } else if (sort === "rating") {
                sortedClothes.sort((a, b) => b.rating - a.rating);
            }
            setWomenClothes(result.womens);    
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

    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    if(!isAuth){
        return <Navigate to="/login" />;
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
            <div className={styles.upperDiv}>
                <p>Home / Shop / <span>Women</span></p>
                <p><span>Women</span> - {womenClothes?.length} items</p>
                <div>
                    <h2>FILTERS</h2>
                    <div className={styles.sortDiv}>
                        <h2>Sort By : </h2>
                        <select name="sort" id="sort" title="sort" onChange={handleSortChange}>
                            <option value="">Recommended</option>
                            <option value="discount">Better Discount</option>
                            <option value="lowToHigh">Price : Low to High</option>
                            <option value="highToLow">Price : High to Low</option>
                            <option value="rating">Customer Rating</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles.lowerDiv}>
                <div className={styles.productCont}>
                    {womenClothes?.map((cloth, id) => {
                        return <ProductGrid key={id} cloth={cloth} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Women;