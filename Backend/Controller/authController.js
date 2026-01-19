import { cloudinaryImageUpload } from "../config/cloundinaryHelp.js";
import { emailGenrator } from "../config/EmailGenrate.js";
import hashPasswordGen, { decodePass } from "../help/hashedPassword.js";
import { tokenGenrator } from "../help/JwtToken.js";
import { User } from "../Model/userModel.js";

export const signUp = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    const { name, age, email, address, mobileNo, password } = req.body;
    let image = ""
    if(req.file){
     image = await cloudinaryImageUpload(req.file.path);
      
    }
    if (!name || !age || !email || !address || !mobileNo || !image || !password) {
      return res.status(401).json({
        status: "Fail",
        message: `Error: All fields are required`,
      });
    }
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        status: "Fail",
        message: "email already Exist",
      });
    }
   const hashPass =await  hashPasswordGen(password)
      let otp = Math.floor(Math.random() * 1000000);
      await emailGenrator(otp,email)
    let user = await User.create({
      name,
      age,
      email,
      address,
      mobileNo,
      password:hashPass,
      image,
      otp
    });
    if (user) {
      let token = tokenGenrator(user)
      console.log(token)
     res.cookie("token", token, {
       httpOnly: true,
       sameSite: "lax",
       secure: false, // localhost ke liye false hi rahega
     });
      res.status(201).json({
        status: "Success",
        data: user.select("-otp"),
        message: "user ragister successfully",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "Fail",
      message: `Error: ${error.message}`,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
       status: "Fail",
       message:"All fields are required"
       });
  }
  let existUser = await User.findOne({email})
  if(!existUser){
     return res.status(401).json({
       status: "Fail",
       message: "User Not Found",
     });
  }

  let matchPass = await decodePass(password,existUser.password)
  if(!matchPass){
     return res.status(400).json({
       status: "Fail",
       message: "email or password is incorrect",
     });
  }
  let token = tokenGenrator(existUser)
  res.cookie("token",token)
   return res.status(201).json({
     status: "Success",
     message: "Login successfully",
   });
};
export const signOut = async (req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({
      status: "Success",
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: `Error: ${error.message}`,
    });
  }
}
export const otpVerify = async (req,res)=>{
  const {otp} = req.body
 let user =  await User.findOne({otp})
 if (!user){
    return res.status(400).json({
      status: "Fail",
      message: "otp not verify",
    });
 }
user.isVerify=true
user.otp = undefined
await user.save()
res.status(200).json({
  status:"Success",
  message:"Otp Verify"
})
}


export const isCurrent=async (req,res)=>{
  try {
    
  let user =   await User.findById(req.id).select("-password").select("-otp")
    res.status(200).json({
      status: "Success",
      user,
    });
  } catch (error) {
    res.status(401).json({
      status: "Fail",
      message: `Error: ${error.message}`
    });
  }

}