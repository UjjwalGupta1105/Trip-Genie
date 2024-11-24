import {Link} from "react-router-dom"
import { getPlaceDetails } from "../../service/PhotoApi";
import {fetchImage} from "../../service/PhotoApi";
import { useEffect, useState } from "react";

const HotelCard=({hotel})=>{
    const [url,setUrl]=useState("")
    useEffect(()=>{
        hotel && placePhoto()
    },[hotel])

    const placePhoto=async()=>{
        const buisness_Id=await getPlaceDetails(`${hotel?.hotel_name}, ${hotel?.hotel_address}`)  
        console.log(buisness_Id) ;
        const imageUrl=await fetchImage(buisness_Id)
        setUrl(imageUrl);
        console.log(url)
    }


    return (<>
        <Link target="_blank" to={`https://www.google.com/maps/search/?api=1&query=` + hotel?.hotel_name +`,`+ hotel?.hotel_address } >
         <div className="hotelCont">
             <img src={url} alt="img" />
             <div>
                 <h6 className="cityName"><span style={{fontWeight:"650",fontSize:"20px"}}>{hotel.hotel_name}</span></h6>
                 <h6>🧳 {hotel.hotel_address}</h6>
                 <h6 >💰 <span style={{fontWeight:"650"}}>{hotel.price}</span></h6>
                 <h6>⭐ <span style={{fontWeight:"650"}}>{hotel.rating} Stars</span></h6>
             </div>
         </div>
        </Link>
        </>)
}

export default HotelCard