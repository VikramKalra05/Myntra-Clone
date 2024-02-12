import { useContext, useEffect, useState } from "react";
import styles from "./kids.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'
import getKidsClothes from "./getKidsClothes";
import ProductGrid from "../../components/productGrid/ProductGrid";

function Kids(){
    const [kidsClothes, setKidsClothes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState("");
    const {isAuth} = useContext(AuthContext);

    const getClothes = async () => {
        const result = await getKidsClothes(filter, sort);
        if(result.kids){
            let sortedClothes = [...result.kids]; 
            if (sort === "discount") {
                sortedClothes.sort((a, b) => b.discount - a.discount);
            } else if (sort === "lowToHigh") {
                sortedClothes.sort((a, b) => a.discounted_price - b.discounted_price); 
            } else if (sort === "highToLow") {
                sortedClothes.sort((a, b) => b.discounted_price - a.discounted_price);
            } else if (sort === "rating") {
                sortedClothes.sort((a, b) => b.rating - a.rating);
            }
            setKidsClothes(result.kids);    
            setLoading(false);        
        }else{
            alert(result.msg);
        }
    }

    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        if(isAuth){
            getClothes();
        }
    })


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
                <p>Home / Shop / <span>Kids</span></p>
                <p><span>Kids</span> - {kidsClothes?.length} items</p>
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
                    {kidsClothes?.map((cloth, id) => {
                        return <ProductGrid key={id} cloth={cloth} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Kids;