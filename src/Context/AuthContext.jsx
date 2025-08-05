import { createContext, useEffect, useState } from "react";


export const AuthContextObject = createContext()


function AuthContextProvider({ children }) {

    const [token,setToken]= useState(null);
    //each refresh will make the token lose its value
    //to solve we will check localsorage with dealing with component life cycle -mounting phase(refresh for first time not rerender)-
    useEffect(()=>{
       const userToken= localStorage.getItem('tkn');
       if(userToken){
        setToken(userToken);
       }
    },[])
    //there is another solution, const [token,setToken]= useState(localStorage.getItem('tkn'));
    //useEffect is preffered cuz the socond solution doasnot work with some other states 

    return ( 
    <AuthContextObject.Provider value={{token:token,setToken}}>
    {children}
    </AuthContextObject.Provider> );
}

export default AuthContextProvider;



