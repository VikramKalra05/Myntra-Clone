import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton, 
} from '@chakra-ui/react';
import  { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import profile from "./profile.jpg";
import wishlist from "./wishlist.png";
import bag from "./bag.png";
import { AuthContext } from "../../context/AuthContextProvider"

const Navbar = () => {
    const {isAuth} = useContext(AuthContext)
    const [searchText, setSearchText] = useState("");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [userSectionToggle, setUserSectionToggle] = useState(false)
    const [hidStatus, setHidStatus] = useState("hidden")

    function getWindowDimensions() {
        const { innerWidth: width } = window;
        return width;
    }

    const handleChange = async () => {
        await setUserSectionToggle(!userSectionToggle)
        if(!userSectionToggle){
            setHidStatus("visible")
        }else{
            setHidStatus("hidden")
        }
    }
    
    useEffect(() => {
        function handleResize() {
          setScreenWidth(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.navbar}>
            <div className={styles.linkSection}>
                {screenWidth < 1024 ? <Menu>     
                    {({ isOpen }) => (
                        <>
                        <MenuButton 
                            isActive={isOpen} 
                            as={IconButton} 
                            p="8px"
                            bg="#edf2f7"
                            border="0.5px solid gray"
                            borderRadius="5px"
                            variant='outline'
                            aria-label='Options'
                            icon={<HamburgerIcon />}></MenuButton>
                        <MenuList marginLeft="-100px">
                            <MenuItem><Link>MEN</Link></MenuItem>
                            <MenuItem><Link>WOMEN</Link></MenuItem>
                            <MenuItem><Link>KIDS</Link></MenuItem>
                            <MenuItem><Link>HOME & LIVING</Link></MenuItem>
                            <MenuItem><Link>BEAUTY</Link></MenuItem>
                            <MenuItem><Link>STUDIO</Link></MenuItem>
                        </MenuList>
                        </>
                    )}
                </Menu> : null}
                <Link to="/">
                    <img src="https://cdn.freelogovectors.net/wp-content/uploads/2023/01/myntra-logo-freelogovectors.net_.png" alt="Myntra" />
                </Link>
                {screenWidth > 1024 ? 
                    <div>
                        <Link to="/shop/men">MEN</Link>
                        <Link to="/shop/women">WOMEN</Link>
                        <Link to="/shop/kids">KIDS</Link>
                        <Link>HOME & LIVING</Link>
                        <Link>BEAUTY</Link>
                        <Link>STUDIO</Link>
                    </div> : null
                }
            </div>
            <div className={styles.userSection}>
                <div className={styles.search}>
                    <SearchIcon/>
                    {screenWidth < 767 ? null : 
                        <input type="text" placeholder="Search for products, brands and more" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    }
                </div>
                <div className={styles.userDiv}>
                    <div className={styles.userCont}>
                        <Link onMouseEnter={handleChange} onMouseLeave={handleChange}>
                            <img src={profile} alt="profile"/>
                            <p>Profile</p>
                        </Link>
                        <div className={styles.hidDiv} style={{
                            visibility: hidStatus   
                        }} onMouseLeave={handleChange}>
                            <p id={styles.hidHeading}>Welcome</p>
                            <p className={styles.hidP}>To access account and manage orders</p>
                            {isAuth ? null : <><Link to="/register" id={styles.hidBtn}>Signup</Link>
                            <Link to="/login" id={styles.hidBtn}>Login</Link></>}                            
                            <div className={styles.hidLine}></div>
                            <p className={styles.hidList}>Orders</p>
                            <Link to="/wishlist" className={styles.hidList} id={styles.wishHid}>Wishlist</Link>
                            <p className={styles.hidList}>Gift Cards</p>
                            <p className={styles.hidList}>Contact Us</p>
                            <p className={styles.hidList}>Myntra Insider</p>
                            <div className={styles.hidLine}></div>
                            <p className={styles.hidList}>Myntra Credit</p>
                            <p className={styles.hidList}>Coupons</p>
                            <p className={styles.hidList}>Saved Cards</p>
                            <p className={styles.hidList}>Saved VPA</p>
                            <p className={styles.hidList}>Saved Addresses</p>
                            {isAuth ? <Link to="/logout" className={styles.hidList} id={styles.wishHid}>Logout</Link> : null}
                        </div>
                    </div>
                    <Link to="/wishlist" id={styles.wishlist}>
                        <img src={wishlist} alt="wishlist" />
                        <p>Wishlist</p>
                    </Link>
                    <Link to="/bag">
                        <img src={bag} alt="Bag" />
                        <p>Bag</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
