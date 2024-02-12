import { Routes, Route } from "react-router-dom"
import Register from "../pages/register/Register"
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Men from "../pages/men/Men";
import Women from "../pages/women/Women";
import Kids from "../pages/kids/Kids";
import ProductPage from "../pages/productPage/productPage";
import Wishlist from "../pages/wishlist/Wishlist";
import Bag from "../pages/bag/Bag";
import Logout from "../pages/logout/Logout";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/shop/men" element={<Men />}></Route> 
            <Route path="/shop/women" element={<Women />}></Route> 
            <Route path="/shop/kids" element={<Kids />}></Route> 
            <Route path="/shop/men/:id" element={<ProductPage />}></Route> 
            <Route path="/shop/women/:id" element={<ProductPage />}></Route> 
            <Route path="/shop/kids/:id" element={<ProductPage />}></Route> 
            <Route path="/wishlist" element={<Wishlist />}></Route> 
            <Route path="/bag" element={<Bag />}></Route> 
        </Routes>
    )
}

export default AllRoutes;

