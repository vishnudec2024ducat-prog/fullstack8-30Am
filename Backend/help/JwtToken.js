import jwt from "jsonwebtoken"
export const  tokenGenrator = (user)=>{
  let token =   jwt.sign({ id: user._id }, process.env.SECRET_KEY,{expiresIn:"1d"});
    return token
}