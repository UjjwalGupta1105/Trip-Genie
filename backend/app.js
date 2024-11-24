const express=require("express");
const app=express();
const connectdatabase=require("./server")
connectdatabase()
const cookieParser=require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))

const userRouter=require("./routers/userRouter")
app.use(userRouter) 

app.get("/",(req,res)=>{
    res.send("Backend")
})

app.listen(8000,()=>{
    console.log("Backend Started...")
})