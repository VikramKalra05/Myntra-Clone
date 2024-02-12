import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";


export default function Logout(){
    const token = localStorage.getItem("token");
    const {setAuth} = useContext(AuthContext);

    const handleLogout = async () => {
        
        try {
            const respone = await fetch("https://myntra-vzgy.onrender.com/user/logout", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            })
            const res = await respone.json();
            console.log(res);
            setAuth(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    if(token){
        handleLogout(); 
        localStorage.removeItem("token");
    }
    
    return (
        <div>
            <h1>You have logged out successfuly</h1>
            <Link to="/login">Login again</Link>
        </div>
    )
}