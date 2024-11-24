import img from "../../assets/bg.png"
import SendIcon from '@mui/icons-material/Send';
import { getPlaceDetails } from "../../service/PhotoApi";
import {fetchImage} from "../../service/PhotoApi";
import { useEffect, useState } from "react";

const InfoSection=({selection})=>{
    const [url,setUrl]=useState("")
    useEffect(()=>{
        selection && placePhoto()
    },[selection])
    
    const placePhoto=async()=>{
        const buisness_Id=await getPlaceDetails(selection.place.label)  
        console.log(buisness_Id) ;
        const imageUrl=await fetchImage(buisness_Id)
        setUrl(imageUrl);
        console.log(url)
    }

    return(
        <>
            <div className="InfoSection">
                <div>
                    <img src={url} alt="img" />
                </div>
                <div>
                    <h4>{selection.place.label}</h4>
                </div>
                <div className="boxes-section">
                    <p>📆 <span style={{fontWeight:"550"}}>{selection.days} </span>Day</p>
                    <p>💰<span style={{fontWeight:"550"}}>{selection.budget} </span> Budget</p>
                    <p>🥂 Travelling People's : <span style={{fontWeight:"550"}}>{selection.people}</span></p>

                    <button style={{position:"absolute" , right:"10px"}}>
                        <SendIcon/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default InfoSection