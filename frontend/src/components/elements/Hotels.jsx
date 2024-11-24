import HotelCard from "./HotelCard";

const Hotels=({hotels})=>{
    console.log(hotels )
    return(
    <div className="hotelSection">
        <h4>
            Hotel's Recommendations
        </h4>
        <div className="hotelsSet">
           { hotels && hotels.map((hotel)=>{
               return (
                <HotelCard hotel={hotel}/>
               )
            })}
        </div>
    </div>)
}

export default Hotels