import { app } from "./app.js";
import { dbConnect } from "./config/db.js";
const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server start on port: ${port}`)
    dbConnect()
})