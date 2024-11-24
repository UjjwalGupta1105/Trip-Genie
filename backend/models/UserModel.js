const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
// const crypto=require("crypto")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        trim:true,
        minLength:[4,"Name should Conatins more than 4 Characters"],
        maxLength:[30,"Name cannot exceed 30 Characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
       unique:true,
       validate:[validator.isEmail,"Please Enter a VAlid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password Should contains atleast 8 Characters...."],
    },
    trips:[{
        userSelection:{
            budget:{type:String},
            days:{type:String},
            people:{type:String},
            place:{
                label:{type:String}
            }
        },
        tripData:{
            type:mongoose.Schema.Types.Mixed
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
 userSchema.pre("save",async function(next){
    console.log(`The Password is ${this.password}`)
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
 })
 
 userSchema.methods.generateAuthToken=async function(req,res,next){
    try {
        console.log("Came")
        console.log(this._id)
        const token=jwt.sign({_id:this._id},"mynameisujjwalguptacurrentyingorkhpurinMMMUTecebranch",{
            //  expiresIn:new Date(Date.now()+5*24*60*60*1000)
        })
        console.log(this.token)
        this.tokens=this.tokens.concat({token:token})
        console.log(this.tokens)
        await this.save()
        return token;
        next()

    } catch (error) {
        console.log(error)
    }
 }
//  userSchema.methods.generatePasswordToken= function(){
//     try {
//         const resetToken=crypto.randomBytes(20).toString("hex")

//         this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
//         this.resetPasswordExpire=Date.now()+15*60*1000
//         return resetToken

//     } catch (error) {
//         console.log("Error In Generating Reset Password Token....")
//     }
//  }
const User=new mongoose.model("User",userSchema)
module.exports=User