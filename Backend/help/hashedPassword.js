import bcrypt from "bcrypt"
const hashPasswordGen =async (password)=>{
      let hashPass = await  bcrypt.hash(password,10)
       return hashPass
}
export const decodePass = async(userPass,dbpassword)=>{
        let isMatch = await bcrypt.compare(userPass,dbpassword)
            return isMatch
}
export default hashPasswordGen