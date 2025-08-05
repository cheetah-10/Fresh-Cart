import React, { useState , useEffect} from "react";
import style from './Notfound.module.css'
import img from '../../assets/error.svg'
export default function Notfound() {


    const [count,setCount]=useState()

    useEffect( ()=>{} ,[])

    return ( 
        <div>
            <img className="m-auto mt-9 pt-9" src={img} alt="error: can't find page" />
        </div>
     )
}

