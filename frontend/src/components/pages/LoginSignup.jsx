import React , {useState,useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// import Footer from "./Footer"
import Header from "../elements/Header"
// import Loading from '../layout/Loading'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';



const LoginSignup=()=>{
    // const {loading,error,isAuthenticated}=useSelector((state)=>state.user)
    const alert=useAlert()
    const navigate=useNavigate()
    // const dispatch=useDispatch()

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPass,setLoginPass]=useState("")

    const loginTab=useRef(null)
    const signupTab=useRef(null)
    const switcherTab=useRef(null)


    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })

    const loginSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/login`,{
            "email":loginEmail,
            "password":loginPass
        },
        { withCredentials: true}
    )    
        console.log(response)
        if(response){
            navigate("/create-trip")
        }
        }
         catch (error) {
                console.log(error.response)
                alert.error(error.response)
        }
        
        
    }
    const signupSubmit=async(e)=>{
       e.preventDefault()
       try {
        const response = await axios.post(`http://localhost:8000/register`,{
        "email":user.email,
        "password":user.password,
        "name": user.name,
       },
       { withCredentials: true}
    )
    
    
         console.log(response)
         navigate("/create-trip")
       } catch (error) {
                console.log(error)
                alert.error(error.message)
       }
       
    }

    const registerDataChange=(e)=>{
            setUser({...user,[e.target.name]:e.target.value})

    }

    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            signupTab.current.classList.remove("shiftToNeutral")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab==="signup"){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            signupTab.current.classList.add("shiftToNeutral")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    return(
        <>
        {
            <>
            <Header/>
        <div className="login-signup-page">

            <div className="login-signup-container">
                <div className="login-signup-box">
                    <div className="login-signup-switch">
                        <p onClick={(e)=>switchTabs(e,"login")}>Login</p>
                        <p onClick={(e)=>switchTabs(e,"signup")}>Signup</p>
                    </div>
                    <button  className='shiftToNeutral' ref={switcherTab}></button>
                </div>

                <form  className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="login-Email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                    </div>
                    <div className="login-Pass">
                        <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Password'  className='form-inputs' required value={loginPass} onChange={(e)=>setLoginPass(e.target.value)} />
                    </div>
                    <div className='Forgot-Pass'><Link to="/password/forgot">Forgot Password ?</Link></div>
                    
                    <input type="submit" value="Login" className='login-Button'/>
                </form>

            <form action="" className="signinForm"  ref={signupTab} encType="multipart/form-data" onSubmit={signupSubmit} >
                <div className="signup-name">
                    <div><MailOutlineIcon/></div>
                    <input type="text" placeholder='Name'  className='form-inputs' name="name" required value={user.name} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-email">
                    <div><MailOutlineIcon/></div>
                        <input type="email" placeholder='Email' className='form-inputs' name="email" required value={user.email} onChange={(e)=>registerDataChange(e)} />
                </div>
                <div className="signup-pass">
                        <div><LockOpenIcon/></div>
                        <input type="password" placeholder='Password'  className='form-inputs' name="password" required value={user.password} onChange={(e)=>registerDataChange(e)}/>
                </div>
                <input type="submit" value="Signup" className='signup-Button' />
                </form>
            </div>
        </div>    

            </>
        }
        </>
    )
}
export default LoginSignup 