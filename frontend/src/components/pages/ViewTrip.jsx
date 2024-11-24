import { useParams } from "react-router-dom";
import InfoSection from "../elements/InfoSection"
import { useEffect,useState } from "react"
import axios from "axios"
import Header from "../elements/Header"
import Loading from "../elements/Loading";
import Hotels from "../elements/Hotels";
import Itinerary from "../elements/Itinerary";



const ViewTrip=()=>{ 
    const {tripId}=useParams()
    const [data,setData]=useState({})
    const [loading,setLoading]=useState(true);
    const [hotels,setHotels]=useState()
    const [places,setPlaces]=useState()

    useEffect(()=>{
        getTrip()
    },[tripId])


    console.log("id is-:"  + tripId )


    async function getTrip(){
        const response= await axios.get(`http://localhost:8000/view-Trip/${tripId}`,{ withCredentials: true}).catch((err)=>console.log(err));
        setHotels( response.data.tripData.hotel_options);
        setPlaces(response.data.tripData.itinerary)
        console.log(response.data.tripData);
        setData(response.data);
        setLoading(false);
    }

   

    return(
        <>
        {
            loading===true ? <Loading/> 
            :
            <div className="ViewTripPage">
            <Header/>
            <InfoSection selection={data.userSelection} />
            {hotels && <Hotels hotels={hotels} />}
            {places && <Itinerary places={places} selection={data.userSelection} />}
           </div> 

        }
        </>
    )
}


export default ViewTrip