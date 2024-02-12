import styles from "./home.module.css";
import { Link } from "react-router-dom";
import carnivalPromo from "./carnivalPromo.png";
import appPromo from "./appPromo.png";
import firstPurcahsePromo from "./1stPurchasePromo.png"
import sbc1 from "./images/1.png"
import sbc2 from "./images/2.png"
import sbc3 from "./images/3.png"
import sbc4 from "./images/4.png"
import sbc5 from "./images/5.png"
import sbc6 from "./images/6.png"
import sbc7 from "./images/7.png"
import sbc8 from "./images/8.png"
import sbc9 from "./images/9.png"
import sbc10 from "./images/10.png"
import sbc11 from "./images/11.png"
import sbc12 from "./images/12.png"

export default function Home(){
    return (
        <div className={styles.home} >
            <div className={styles.promoDiv}>
                <Link to="/shop/women">
                    <img src={firstPurcahsePromo} alt="1st Purchase Promo" id={styles.firstPurchasePromo} />
                </Link>
                <Link to="/shop/men">
                    <img src={carnivalPromo} alt="carnival promo" id={styles.carnivalPromo} />
                </Link>
            </div>
            <div className={styles.outerDiv}>
                <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/2/1/7fa88863-9515-4688-a21e-d33783c92fe01706788473061-Shop-by-category-----2.jpg" alt="shop by category" id={styles.shopByCategory} />
                <div className={styles.container}>
                    <img src={sbc1} alt="1" />
                    <img src={sbc2} alt="2" />
                    <img src={sbc3} alt="3" />
                    <img src={sbc4} alt="4" />
                    <img src={sbc5} alt="5" />
                    <img src={sbc6} alt="6" />
                    <img src={sbc7} alt="7" />
                    <img src={sbc8} alt="8" />
                    <img src={sbc9} alt="9" />
                    <img src={sbc10} alt="10" />
                    <img src={sbc11} alt="11" />
                    <img src={sbc12} alt="12" />
                    {/* <img src={sbc1} alt="1" /> */}
                </div>
            </div>
            <div>
                <Link>
                    <img src={appPromo} alt="Application Promo" id={styles.appPromo} />
                </Link>
            </div>
        </div>
    )
}