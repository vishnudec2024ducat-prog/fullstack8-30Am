import mongoose from "mongoose";
export const dbConnect = async ()=>{
        try {
            await mongoose.connect(process.env.MONGO_DB_URL_ATLAS);
            console.log("database connected")
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
}