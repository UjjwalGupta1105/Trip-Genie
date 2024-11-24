const mongoose=require("mongoose")

const connectdatabase=()=>{

   mongoose.connect(`mongodb://localhost:27017/TripGenie`)
.then(()=>{
    console.log("DataBase Connected Successfully")
}).catch((err)=>{
    console.log(err)
})
 
}

module.exports=connectdatabase;