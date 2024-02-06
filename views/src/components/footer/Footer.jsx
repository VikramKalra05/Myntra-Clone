import styles from "./footer.module.css";
import original from "./original.jpg";
import facebook from "./facebook.png";
import twitter from "./twitter.png";
import youtube from "./youtube.png";
import instagram from "./instagram.png";

export default function Footer(){
    return (
        <div className={styles.footer}>
            <div className={styles.linkSection}>
                <div>
                    <h1>ONLINE SHOPPING</h1>
                    <p>Men</p>
                    <p>Women</p>
                    <p>Kids</p>
                    <p>Home & Living</p>
                    <p>Beauty</p>
                    <p>Gift Cards</p>
                    <p>Myntra Insider</p>
                </div>
                <div>
                    <h1>CUSTOMER POLICIES</h1>
                    <p>Contact Us</p>
                    <p>FAQ</p>
                    <p>T&C</p>
                    <p>Terms Of Use</p>
                    <p>Track Orders</p>
                    <p>Shipping</p>
                    <p>Cancellation</p>
                    <p>Returns</p>
                    <p>Privacy Policy</p>
                    <p>Grievance Officer</p>
                </div>
                <div >
                    <h1>EXPERIENCE MYNTRA APP ON MOBILE</h1>
                    <div className={styles.app}>
                        <img src="https://www.enervent.com/wp-content/uploads/2018/11/google-play-badge-logo-png-transparent.png" alt="google" />
                        <img src="https://www.zcs.org/wp-content/uploads/2023/08/Download-On-The-App-Store-PNG-Image.png" alt="apple" />
                    </div>
                    <h1>KEEP IN TOUCH</h1>
                    <div className={styles.socials}>
                        <img src={facebook} alt="facebook" />
                        <img src={twitter} alt="twitter" />
                        <img src={youtube} alt="youtube" />
                        <img src={instagram} alt="instagram" />
                    </div>
                </div>
                <div className={styles.guarantee}>
                    <div>
                        <img src={original} alt="orignal" />
                        <p><b>100% ORIGINAL</b> guarantee for all products at myntra.com</p>
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNjZ7vJwUkdvIh-XVdd6ZZOT7_FgykC5uK1w&usqp=CAU" alt="14day Return" />
                        <p><b>Return within 14days</b> of receiving your order</p>
                    </div>
                </div>
                <div>
                    <h1>USEFUL LINKS</h1>
                    <p>Blog</p>
                    <p>Careers</p>
                    <p>Site Map</p>
                    <p>Corporate Information</p>
                    <p>Whitehat</p>
                    <p>Cleartrip</p>
                </div>
            </div>
            <div className={styles.copyrightSection}>
                <p>In case of any concern, <span>Contact Us</span></p>
                <p>© 2024 www.myntra.com. All rights reserved.</p>
                <p>A Flipkart Company</p>
            </div>
        </div>
    )
}

