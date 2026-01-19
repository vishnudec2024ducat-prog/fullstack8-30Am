import jwt from "jsonwebtoken";
import { User } from "./userModel.js";
export const verifyTokenFun =async (req, res, next) => {
      console.log(req.headers)
    let tokenPath = req.headers.cookie
    if(!tokenPath){
      return res.status(401).json({
        status: "Fail",
        message: "There is no token",
      });
    }
  let token = tokenPath.split("=")[1];
   let isVerify =  jwt.verify(token, process.env.SECRET_KEY);
    let exist =     await User.findById(isVerify.id)
   if (exist){

        req.id=exist._id
    next()
   }else{
    res.status(400).json({
        status:"Fail",
        message:"user Not Valid"
    })
   }
};
