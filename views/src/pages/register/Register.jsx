import styles from "./register.module.css";
import promo from "./promo.png"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import submitUserDetails from "./submitUserDetails";

export default function Register(){
    const Navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        phone: "",
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
        if(!userDetails.phone || !userDetails.email || !userDetails.password){
            alert("Fill all the details");
            return;
        }
        let phone = Number(userDetails.phone) 
        
        if(!Number(phone) || userDetails.phone.length < 10){
            alert("Enter Valid phone number of 10 numbers");
            return;
        }

        const user = {
            phone: phone,
            email: userDetails.email,
            password: userDetails.password
        }

        const result = await submitUserDetails(user);

        if(result.user){
            alert("User has been registered in successfuly");
            Navigate("/login");
        }else{
            alert(result.msg);
        }
    }

    return (
        <div className={styles.outerDiv}>
            <div>
                <img src={promo} alt="promo" />
                <br />
                <h1>Signup</h1>
                <input 
                    type="number" 
                    placeholder="Phone Number" 
                    name="phone"
                    value={userDetails.phone}
                    onChange={(e) => handleChange(e)}
                />
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
                <p>By continuing, I agree to the <span>Terms of Use</span> & <span>Privacy Policy</span></p>
                <button onClick={handleSubmit}>CONTINUE</button>
                <p>Having trouble logging in? <Link>Get Help</Link></p>
            </div>
        </div>
    )
}