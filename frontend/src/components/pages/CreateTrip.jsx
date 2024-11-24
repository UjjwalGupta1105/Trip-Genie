import BudgetElement from "../elements/BudgetElement";
import PeopleElement from "../elements/PeopleElement";
import Header from "../elements/Header";
import {useEffect, useState,useRef} from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Toaster, toast } from 'sonner';
import { AI_PROMPT } from "../../constants/options";
import {chatSession} from "../../service/AiModal"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import Loading from "../elements/Loading";

const CreateTrip=()=>{
    const navigate=useNavigate()

    const [place,setPlace]=useState("");
    const [days,setDays]=useState("");
    const [formData,setFormData]=useState({
        days:"",
        budget:"",
        people:"",
        place:{label:""}
    })
    const [user,setUser]=useState()
    const [loading,setLoading]=useState(false)

    let response;
    let isAuthorized=async()=>{
         response=await axios.get("/me",{ withCredentials: true}).catch((err)=>"Add your Account first....");
        if(response){
            setUser(response)
            return true;
        }
        else{
            setUser()
            return false;
        }
    }
    

    useEffect(()=>{
        isAuthorized()
    },[response])

    let getData=async(place)=>{
        const url = `https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=${place}&radius=500`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '0bfa8143bfmsh7706ec74771d596p1667bbjsn1e8fd1583db3',
		'x-rapidapi-host': 'place-autocomplete1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    console.log(result.predictions);
      return{
        options:result.predictions.map((e)=>{
        return {label:e.description}
    })
      }
} catch (error) {
	console.error(error);
}
    }

const loadOptions=(place)=>{
  return  getData(place)
}

const handelInputChange=(name,value)=>{
  setFormData({...formData,[name]:value})
}

 const generateTrip=async()=>{
    isAuthorized()
    console.log("user is-:" + user)
    if(!user){
        navigate("/register")
        return
    }

    if(!formData.days || !formData.budget || !formData.people || !formData.place.label ){
        toast.error('Please fill all the details...')
    }
    else{
        toast.success('Generating your Trip...')
        setLoading(true)

        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formData.place.label)
        .replaceAll('{totalDays}',formData.days)
        .replace('{traveler}',formData.people )
        .replace('{budget}',formData.budget)

        console.log(FINAL_PROMPT)

        const result=await chatSession.sendMessage(FINAL_PROMPT)
        console.log(result.response.text())

        const userSelection=formData
        const Data=result.response.text()
        const tripData=JSON.parse(Data)


            const response= await axios.post("http://localhost:8000/addTrip",{userSelection,tripData},{ withCredentials: true})
            console.log(response.data)
            const trip=response.data
            const tripId=trip._id
            setLoading(false)
            navigate(`/view-trip/${tripId}`)
    }
 }

 useEffect(()=>{
    console.log(formData)
 },[formData])

    return(
        <>
         <Toaster/>
         {loading ? <Loading/>
         :
        <>
         <Header for="header"/>
        <div className="CreateTripPage">
            <div className="headings">
                <h2>Tell Us Your Prefrences🧳✈️</h2>
                <p>Just provide some basic information , and our trip planner will generate a customized Itinerary based on your Prefrences...</p>
            </div>

        <div className="Inputs">

            <div>
                <h4>What is your choice of Destination ?</h4>
                 <div className="PlaceInput">

                 <AsyncPaginate
                    placeholder="Search for the Destination..."
                    debounceTimeout={600}
                    value={place}
                    onChange={(e)=>{setPlace(e) ; handelInputChange("place",e)}}
                    loadOptions={loadOptions}
                 />
                 </div>
                
              
            </div>
            <div>
                <h4>How many days of trip you are Planning ?</h4>
                <input type="text" name="days" value={days} placeholder="ex-: 4" onChange={(e)=> {setDays(e.target.value) ; handelInputChange("days",e.target.value)} }/>
            </div>
        </div>

        <div className="BudgetArea">    
                <h6>Tell us about your Budget ? </h6>
                <p>****This Budget is exclusively for your Stay,Activities & Dining purposes...***</p>
                <div className="BudgetElementSet">
                    <BudgetElement level="Low" range="Stay conscious of costs" onClick={()=>  handelInputChange("budget","Low") }  budget={formData.budget} />
                    <BudgetElement level="Medium" range=" Keep cost on the average side"  onClick={()=>handelInputChange("budget","Medium") } budget={formData.budget}/>
                    <BudgetElement level="High" range=" Don't worry about cost "  onClick={()=>handelInputChange("budget","High")} budget={formData.budget}/>
                </div>
        </div>
        <div className="PeopleArea">    
                <h6>Who do you Plan on travelling with you on your next adventure ? </h6>
                <p>****Helps Us to get more efficient Results...***</p>
                <div className="PeopleElementSet">
                    <PeopleElement people="Solo" onClick={()=> handelInputChange("people","Solo") } person={formData.people}/>
                    <PeopleElement people="Couple" onClick={()=> handelInputChange("people","Couple")}  person={formData.people}/>
                    <PeopleElement people="Family" onClick={()=> handelInputChange("people","Family")} person={formData.people}/>
                    <PeopleElement people="Friends" onClick={()=>handelInputChange("people","Friends") } person={formData.people}/>
                </div>
        </div>

        <button onClick={generateTrip}>Generate Trip</button>
        </div>
        </>
         }
         
     </>  
    )
}

export default CreateTrip;