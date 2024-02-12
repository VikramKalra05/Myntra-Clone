import { useContext, useEffect, useState } from "react";
import styles from "./men.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'
import getMensClothes from "./getMensClothes";
import ProductGrid from "../../components/productGrid/ProductGrid";

function Men(){
    const [menClothes, setMenClothes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState("");
    const {isAuth} = useContext(AuthContext);

    const getClothes = async () => {
        const result = await getMensClothes(filter, sort);
        if(result.mens){
            let sortedClothes = [...result.mens]; 
            if (sort === "discount") {
                sortedClothes.sort((a, b) => b.discount - a.discount);
            } else if (sort === "lowToHigh") {
                sortedClothes.sort((a, b) => a.discounted_price - b.discounted_price); 
            } else if (sort === "highToLow") {
                sortedClothes.sort((a, b) => b.discounted_price - a.discounted_price);
            } else if (sort === "rating") {
                sortedClothes.sort((a, b) => b.rating - a.rating);
            }
            setMenClothes(sortedClothes);    
            setLoading(false);      
        }else{
            alert(result.msg);
        }
    }

    useEffect(() => {
        if(isAuth){
            getClothes();
        }
    }, [isAuth, sort])


    if(!isAuth){
        return <Navigate to="/login" />;
    }

    const handleSortChange = (e) => {
        setSort(e.target.value);
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
                <p>Home / Shop / <span>Men</span></p>
                <p><span>Men</span> - {menClothes?.length} items</p>
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
            <div className={styles.lowerDiv} >
                <div className={styles.productCont}>
                    {menClothes?.map((cloth, id) => {
                        return <ProductGrid key={id} cloth={cloth} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Men;