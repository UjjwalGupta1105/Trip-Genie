

const PeopleElement=(props)=>{
    let icon;
    let des;

    switch (props.people){

        case "Solo":
            icon="🚀"
            des="A sole traveles in exploration"
            break;

        case "Couple":
             icon="🥂"
             des="Two traveles in tadeem"
            break;


        case "Family":
           icon="🏠"
           des="A group of loving adv"
            break;

        case "Friends":
             icon="⛵"
             des="A bunch of thrill-seekers"
            break;

    } 
    
        
    return(
        <>
            <div className={`PeopleElement
               ${props.person==props.people && "bgChange"}` } id={props.people}  onClick={props.onClick} >
              <h1>{icon}</h1>
              <h4>{props.people}</h4>
              <p>{des}</p>
            </div>
        </>
    )
}

export default PeopleElement;