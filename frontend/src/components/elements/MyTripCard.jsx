import { getPlaceDetails } from "../../service/PhotoApi";
import {fetchImage} from "../../service/PhotoApi";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const MyTripCard=({data})=>{
    console.log(data)
    const [url,setUrl]=useState("")
    const [tripId,setTripId]=useState("")
    useEffect(()=>{
        data && placePhoto()
    },[data])

    const placePhoto=async()=>{
        const buisness_Id=await getPlaceDetails(`${data?.userSelection.place.label}`)  
        console.log(buisness_Id) ;
        const imageUrl=await fetchImage(buisness_Id)
        setUrl(imageUrl);
        console.log(url)
        setTripId(data?._id);
    }

    return(
        <Link to={`/view-trip/${tripId}`}>
            <div className="myTripCard">
                <img src={url} alt="img" />
                <div>
                    <h2>{data.userSelection.place.label}</h2>
                    <div className="myTripdetails">
                        <p className="budget">Budget:<span>{data.userSelection.budget}💰</span></p>
                        <p className="days">Days: <span>{data.userSelection.days} 📆</span></p>
                        <p className="people">People: <span>{data.userSelection.people}🚀</span></p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MyTripCard