import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [isAuth, setAuth] = useState(false);
    
    const checkToken = () => {
        const token = localStorage.getItem("token")
        if(token){
            setAuth(true)
        }else{
            setAuth(false)
        }
    }

    useEffect(() => {
        checkToken();
    }, [])
    
        return (
        <AuthContext.Provider value={{isAuth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
