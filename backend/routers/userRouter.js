const express=require("express")
const router=express.Router()
const User=require("../models/UserModel")
router.use(express.json())
const cookieParser=require("cookie-parser")
router.use(cookieParser())
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const cors = require("cors")
router.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))
const authorizeRole=require("../middleware/auth")
const auth=require("../middleware/auth")

// const crypto=require("crypto")
// const sendEmail=require("../utils/sendEmail")

router.post("/register",async(req,res,next)=>{
   try{
      const {name,email,password}=req.body
      const user=await new User({
         name,
         email,
         password
      })
      console.log(user)
      const token=await user.generateAuthToken()
      console.log("token is -:" + token )
      const savedUser=await user.save()
      res.cookie("user_token",token,{
          expires:new Date(Date.now()+5*24*60*60*1000),
         secure: false ,
          httpOnly:true, 
      })
      console.log("saved token is -:"  + req.cookies.user_token )
      console.log(`"Main-:"` + savedUser)
      res.status(201).send(savedUser)
   }
   catch(error){
      res.status(400).send(error)
   }
})

router.get("/register",async(req,res,next)=>{
   try {
       const userData=await User.find({})
       res.send(userData)
   } catch(error){
       res.status(400).send(error)
   }
})

router.post("/login",async(req,res,next)=>{
   try {
    console.log("Tame....")
          const email=req.body.email
          const password=req.body.password 
    console.log(req.body)
          if(!email||!password){
          throw new error("Please Enter Email & Password....")
          }
          const user=await User.findOne({email:email})
          console.log(user)
          const isMatch =await bcrypt.compare(password,user.password)
          console.log( "isMaatch" + isMatch )

          console.log( "user is -: " + user)
          if(isMatch){
              const token=await user.generateAuthToken()
              res.cookie("user_token",token,{
                  expires:new Date(Date.now()+5*24*60*60*1000),
                  secure: false ,
                  httpOnly:true,

              })
              res.status(201).send(user)
          }
          else{
              throw new error("Please Enter Valid Email & Password....")
          }
      } 
      catch (error) {
          res.status(400).send(error)
      }
  })
  router.get("/logout",auth,async(req,res,next)=>{
   try {
     res.clearCookie("user_token")
     res.status(201).send("Successfully Logged-Out")
   } catch(error){
       res.status(400).send(error)
   }
})

router.get("/me",auth,async(req,res,next)=>{
      try {
        console.log("CameShame...101")
          const id=req.user._id;
          console.log(id)
          const user=await User.findById(id)
          console.log(user)
          res.status(200).send(user)
      } catch (error) {
          res.status(400).send(error)
      }
    })

router.post("/addTrip",auth,async(req,res,next)=>{
   try {
       const tripdata=req.body
       console.log( "tripoData-:" + tripdata )
       const user=req.user
       console.log( "usro"  + user )
       await user.trips.push( tripdata )
       console.log( "user_trips-:"  + user.trips )
       const updatedUser=await user.save()
       console.log( "updatedUsro" + updatedUser )
       const Trips=updatedUser.trips
       console.log( "currTrip-:" + Trips[Trips.length-1] )
       res.status(200).send(Trips[Trips.length-1])
   } catch(error){
       res.status(400).send(error)
   }
})
router.get("/my-trips",auth,async(req,res,next)=>{
    try {
        console.log("MYTRIPS....")
        const user=await User.findById(req.user.id)
        console.log(user)
        const trips= user.trips
        res.status(200).send(trips)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
 })
router.get("/view-Trip/:id",auth,async(req,res,next)=>{
    try {
        console.log("cammoo")
        const id=req.params.id
        const user=await User.findById(req.user.id)
        console.log( "id is-:" + id )
        const trip= user.trips.find((trip)=>{
            return trip._id==id
        })
        res.status(200).send(trip)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
  })


// router.post("/password/forgot",async(req,res)=>{
//    try {
//        const user=await User.findOne({email:req.body.email})
//        const resetToken=user.generatePasswordToken();

//        await user.save({validateBeforeSave:false})

//        const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
//        const message=`Your reset Token is-:\n\n ${resetPasswordUrl} \n\n If You have Not Requested For This then Ignore It.... `

//        // console.log(resetPasswordUrl)
//        console.log(message)

//        try {
//            await sendEmail({
//                email:user.email,
//                subject:`Ecommerse Password Recovery....`,
//                message,
//            })

//            res.status(200).send({
//                message:`Your Pasword is sended to ${user.email}.`
//            })
//        } catch (error) {
//            user.resetPasswordToken=undefined
//            user.resetPasswordExpire=undefined

//            await user.save({validateBeforeSave:false})
//        }

       
//    } catch (error) {
//        res.status(400).send({
//            message:"Your ResetPassword Request Could Not Be Processed at this moment...."
//        })
//    }
// })
// router.patch("/password/reset/:token",async(req,res)=>{
//    try {
//        console.log("camgola")
//        const resettoken=crypto.createHash("sha256").update(req.params.token).digest("hex")

//        const user=await User.findOne({resetPasswordToken:resettoken,resetPasswordExpire:{$gt:Date.now()}})
//        console.log(user)

//        if(req.body.password!=req.body.confirmPassword){
//            throw new error("Confirm Password and Password are NOT Same....")
//        }
//        user.password=req.body.password
//        user.resetPasswordToken=undefined
//        user.resetPasswordExpire=undefined
//        console.log("Dono")
//        await user.save()
//        res.status(200).json({
//            success:true
//        })

//    } catch (error) {
//        res.status(400).send(error)
//    }
// })
// router.post("/me/updatePassword",auth,async(req,res,next)=>{
//    try {
//        console.log("comeshah hola")
//        const user=await User.findById(req.user.id)
//        const isMatch =await bcrypt.compare(req.body.password,user.password)
//        console.log(isMatch)
       
//        if(!isMatch){
//            // res.status(400).write("Password is Incorrect....")
//        }
//        if(req.body.newPassword!=req.body.confirmNewPassword){
//            // res.status(400).write("Confirm Password and Password are NOT Same....")

//        }
//        user.password=req.body.newPassword
//        console.log(user)
//        await user.save()
//        console.log("gono")
//        res.status(201).json({
//            success:true
//        })
//    } catch (error) {
//        res.status(400).send(error)
//    }
// })
// router.patch("/me/update",auth,async(req,res,next)=>{
//    try {
//        console.log("CAMOLA")
//        console.log(req.user.id)
//       const updates={
//          name:req.body.name,
//          email:req.body.email
//       }
//       console.log(updates)

//       const user=await User.findByIdAndUpdate(req.user.id,updates,{new:true})
//       console.log(user)
//       res.status(201).json({
//        success:true
//       })
//    } catch (error) {
//     res.status(400).send(error)
//    }
// })




module.exports=router