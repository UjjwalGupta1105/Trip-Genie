import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const BudgetElement=(props)=>{
    let icon;
    switch (props.level){

        case "Low":
            icon="💵"
            
            break;

        case "Medium":
             icon="💰"
            break;


        case "High":
           icon="💸"
            break;

    }     
    return(
        <>
            <div className={`BudgetElement 
                 ${props.budget==props.level && "bgChange" }`} id={props.level} onClick={props.onClick}>
               <h1>{icon}</h1>
                <h4>{props.level}</h4>
                <p>{props.range}</p>
            </div>
        </>
    )
}

export default BudgetElement;