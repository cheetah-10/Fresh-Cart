import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const passwordContextObject = createContext()


function PasswordContextProvider({ children }) {


    function sendResetCode(email) {
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
            "email": email
        }).then((res) => { console.log(res.data.message) })
            .catch((error) => { console.log(error) })
    }

    function verifyResetCode(resetCode) {
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            "resetCode": resetCode
        }).then((res) => { console.log(res.data.status) })
            .catch((error) => { console.log(error) })

    }
    function resetPassword(email, newPass) {
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            {
                "email": email,
                "newPassword": newPass
            }
        ).then((res) => { console.log(res.data.token)
            localStorage.setItem("tkn",res.data.token)
         })
            .catch((error) => { console.log(error) })


    }

    return (
        <passwordContextObject.Provider value={{ sendResetCode, verifyResetCode, resetPassword }}>
            {children}
        </passwordContextObject.Provider>);
}

export default PasswordContextProvider;



