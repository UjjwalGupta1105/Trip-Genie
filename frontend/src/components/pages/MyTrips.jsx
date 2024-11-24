import axios from "axios";
import { useEffect,useState } from "react";
import Header from "../elements/Header";
import MyTripCard from "../elements/MyTripCard";

const MyTrips=()=>{
    const [data,setData]=useState()
    const [loading,setLoading]=useState(true);
    // const [hotels,setHotels]=useState()
    // const [places,setPlaces]=useState()

    useEffect(()=>{
        getTrips()
    },[])

    async function getTrips(){
        const response= await axios.get(`http://localhost:8000/my-Trips`,{ withCredentials: true}).catch((err)=>console.log(err));
        // setHotels( response.data.tripData.hotel_options);
        // setPlaces(response.data.tripData.itinerary)
        console.log(response.data);
        setData(response.data);
        setLoading(false);
    }
    return(
        <>
        <Header/>
        <div className="myTripsPage">
            <h1>My-Trips🧳✈️</h1>
            <div className="myTrips">
                {data && data.map((item)=>{
                   return <MyTripCard data={item}/> 
                })}
            </div>
        </div>
        </>
    )
}


export default MyTrips