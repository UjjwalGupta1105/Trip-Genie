import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import Header from "../elements/Header"
import Loading from '../../components/elements/Loading'
import img from "../../assets/user-img.jpeg"
import {useAlert} from 'react-alert'
import axios from 'axios'

const MyProfile=()=>{
    const [user,setUser]=useState()
    const alert=useAlert()
    const [loading,setLoading]=useState(true)
    
    const isAuthenticated=async()=>{
        try {
            const response=await axios.get("http://localhost:8000/me", { withCredentials: true})
                console.log(response.data)
                setUser(response.data)
                setLoading(false)
         } catch (error) {
                  console.log(error)
                 alert.error(error.response) 
         }
    }

    useEffect(()=>{
        isAuthenticated()
    },[])
    return(
        <>
{ 
      loading===true ?  <Loading/>
      :
      
         <>
         <Header/>
         <div className="myprofile-container">
                 <div className="myprofile-left">
                     <h2>My Profile</h2>
                     <img src={img} alt="user_img" />
                     <Link to="/me/update">Edit Profile</Link>
                 </div>
                 <div className="myprofile-right">
                     <div className="myprofile-name">
                         <h4>Full Name</h4>
                         <p>{user.name}</p>
                 </div>
                 <div className="myprofile-email">
                     <h4>Email</h4>
                     <p>{user.email}</p>
                 </div>
                 <div className="myprofile-myorder-button">
                     <Link to="/me/updatePassword">Update Password</Link>
                 </div>
                 <div className="myprofile-changepass-button">
                     <Link to="/my-trips">My Trips</Link>
                    </div>

                    
             </div>
         </div>
     </>
        
    }
        </>
        )}
       


export default MyProfile