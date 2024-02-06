import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton, 
} from '@chakra-ui/react';
import  { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    function getWindowDimensions() {
        const { innerWidth: width } = window;
        return width;
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
                            <MenuItem ><Link>MEN</Link></MenuItem>
                            <MenuItem><Link>WOMEN</Link></MenuItem>
                            <MenuItem><Link>KIDS</Link></MenuItem>
                            <MenuItem><Link>HOME & LIVING</Link></MenuItem>
                            <MenuItem><Link>BEAUTY</Link></MenuItem>
                            <MenuItem><Link>STUDIO</Link></MenuItem>
                        </MenuList>
                        </>
                    )}
                </Menu> : null}
                <Link>
                    <img src="https://cdn.freelogovectors.net/wp-content/uploads/2023/01/myntra-logo-freelogovectors.net_.png" alt="Myntra" />
                </Link>
                {screenWidth > 1024 ? 
                    <div>
                        <Link>MEN</Link>
                        <Link>WOMEN</Link>
                        <Link>KIDS</Link>
                        <Link>HOME & LIVING</Link>
                        <Link>BEAUTY</Link>
                        <Link>STUDIO</Link>
                    </div> : null
                }
            </div>
            <div className={styles.userSection}>
                <div className={styles.search}>
                    <img src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png" alt="search"/>
                    {screenWidth < 767 ? null : 
                        <input type="text" placeholder="Search for products, brands and more" />
                    }
                </div>
                <div className={styles.userDiv}>
                    <div>
                        <img src="data:image/jpeg;base64,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" alt="profile" />
                        <p>Profile</p>
                    </div>
                    <div>
                        <img src="data:image/png;base64,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" alt="wishlist" />
                        <p>Wishlist</p>
                    </div>
                    <div>
                        <img src="data:image/png;base64,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" alt="Bag" />
                        <p>Bag</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
