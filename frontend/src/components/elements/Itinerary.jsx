import PlaceCard from "./PlaceCard"

const Itinerary=({places,selection})=>{
    console.log(places)
  return(
    <>
        <div className="placesSection">
            <h4>Place's to Visit</h4>
            <div className="placesSet">
                {Object.entries(places).map(ele => {
                  console.log(ele[1][0])
    return(
      <>
                    <div>
                      <h2>{ele[0]}-:</h2>
                      <div className="placeCont">
                        {ele[1].map((place)=>{
                          return(
                             <div>
                                <h3>{place.time}</h3>
                                <div>
                                  <PlaceCard place={place} selection={selection} />
                                </div>
                             </div>
                          )
                         
                        })}
                      </div>
                    </div>
      </>
    )
})}
            </div>
        </div>
    </>
  )
}

export default Itinerary