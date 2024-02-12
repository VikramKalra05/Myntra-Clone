import styles from "./login.module.css";
import promo from "./promo.png"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import submitUserDetails from "./submitUserDetails";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Login(){
    const {setAuth} = useContext(AuthContext);
    const Navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUserDetails({
            ...userDetails,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        if(!userDetails.email || !userDetails.password){
            alert("Fill all the details");
            return;
        }

        const result = await submitUserDetails(userDetails);

        if(result.token){
            localStorage.setItem("token", result.token);
            alert("User has been logged in successfuly");
            setAuth(true)
            Navigate("/");
        }else{
            alert(result.msg);
        }
    }

    return (
        <div className={styles.outerDiv}>
            <div>
                <img src={promo} alt="promo" />
                <br />
                <h1>Login</h1>
                <input 
                    type="email" 
                    placeholder="Email"
                    name="email" 
                    value={userDetails.email}
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    value={userDetails.password}
                    onChange={(e) => handleChange(e)}
                />
                <button onClick={handleSubmit}>CONTINUE</button>
                <p>Having trouble logging in? <Link>Get Help</Link></p>
            </div>
        </div>
    )
}