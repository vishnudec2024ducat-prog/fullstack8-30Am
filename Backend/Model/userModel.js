import mongoose from "mongoose";
import validator from "validator"
const userSchema =new mongoose.Schema({
  name: {
    type: String,
    required: [true,"bhai name ki to jarurat hoti hai n"],
    minlength:[5,"please ensure yorname atleast 5 character"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:[validator.isEmail,"please enter valid Email"]
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  mobileNo: {
    type: Number,
    required: true,
    min:10,
    
  },
  image:{
    type:String,

  },
  password:{
    type:String,
    required:true,
    minlength:[8,"atleast write 8 charcter"]
  },
  otp:{
    type:Number,
    
  },
  isVerify:{
    type:String,
    default:false
  }
});

export const User = mongoose.model("users",userSchema)