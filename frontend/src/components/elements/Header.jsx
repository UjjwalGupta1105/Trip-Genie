import axios from "axios"
import "../../App.css"
import img from "../../assets/Trvl-removebg-preview.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import UseOptions from "./UseOptions"

const Header=(props)=>{
    const [user,setUser]=useState()

    let response;
    const isAuthenticated=async()=>{
        try {
             response=await axios.get("http://localhost:8000/me",{ withCredentials: true })
            if(response){
               setUser(response)
               console.log( "user is-: " + response )
            }  
            else{
                setUser()
            }
        } catch (error) {
            setUser()
        }
    }

    useEffect(()=>{
        isAuthenticated()
    },[response,UseOptions])
    return(
        <>
            <div className={props.for == "header-home" ? "header-home" : "header" }>
                <div className="first">
                    <img src={img} alt="logo." />
                    <h2>Trip Genie</h2>
                </div>
                <div className="second">
                  { user ? <UseOptions/>
                 :
                 <Link to="/register">Signup/Login</Link>
                  } 
                  
                </div>
            </div>
        </>
    )
}

export default Header