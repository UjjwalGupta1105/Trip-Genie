import img from "../../assets/bg.png"
import {Link} from "react-router-dom"
import { getPlaceDetails } from "../../service/PhotoApi";
import {fetchImage} from "../../service/PhotoApi";
import { useEffect, useState } from "react";

const PlaceCard=({place,selection})=>{
    const [url,setUrl]=useState("")
    useEffect(()=>{
        place && placePhoto()
    },[place])

    const placePhoto=async()=>{
        const buisness_Id=await getPlaceDetails(` ${place?.place_name}, ${selection?.place.label}`)  
        console.log(buisness_Id) ;
        const imageUrl=await fetchImage(buisness_Id)
        setUrl(imageUrl);
        console.log(url)
    }


    return(
        <Link target="_blank" to={`https://www.google.com/maps/search/?api=1&query=` + place?.place_name + `,` + selection?.place.label }>
        <div className="placeCard">
        <div className="imgName" >
                <img src={url} alt="img" />
            </div>
            <div className="placeDetails">
                <h2>{place.place_name}</h2>
                <p>{place.place_details}</p>
                <h6>Ticket Pricing:  <span style={{color:"green"}}>  {place.ticket_pricing}</span></h6>
                <h5><span style={{fontWeight:750}}>Travel: </span>{place.travel}</h5>
            </div>
        </div>
        </Link>
    )
}

export default PlaceCard