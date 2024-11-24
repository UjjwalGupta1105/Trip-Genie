import React , {useState} from 'react'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import axios from "axios"

const useOptions=()=>{

    const alert=useAlert()
    const [open,setOpen]=useState(false)
    const navigate=useNavigate()

    const logout=async()=>{
        try {
           const response=await axios.get("http://localhost:8000/logout",{ withCredentials: true })  
        } catch (error) {
                 console.log(error)
                alert.error(error.response) 
        }
    }


    const actions=[
        {icon :<ListAltIcon/> , name:"My_Trips",func:trips},
        {icon :<PersonIcon/> , name:"Profile",func:account},
        {icon :<LogoutIcon/> , name:"Logout",func:logoutUser}

    ]
    function trips(){
        navigate("/my-trips")
    }
    function account(){
        navigate("/account")
    }
    function logoutUser(){
         logout()
        navigate("/register")
        alert.success("LoggedOut Successfully...")
    }

    return(
        <>
        <Backdrop open={open}/>
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        icon={<PersonIcon/>}
        direction="down"
        className='speedDial'
>
         {actions.map((action) => (
             <SpeedDialAction
             key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen={window.innerWidth<=600?true:false}
              onClick={action.func}
            />
))}
     </SpeedDial>
        </>
    )
}

export default useOptions