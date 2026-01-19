import { cloudinaryImageUpload } from "../config/cloundinaryHelp.js";
import { User } from "../Model/userModel.js"

export const profile = async (req,res)=>{
  
    res.send("mera name pata nhi kya hai")
}

export const getAllUser = async (req,res)=>{
    try {
        let users = await User.find();
        res.status(200).json({
          status: "success",
          users,
        });
    } catch (error) {
        res.status(400).json({
          status: "Fail",
          message:`Error: ${error.message}`
        });
    }
}

export const deleteUser = async(req,res)=>{
  try {
      const {id} = req.params
    let deltedUser =   await User.findByIdAndDelete(id)
    if(!deleteUser){
      res.status(401).json({
        status:"Fail",
        message:"id not fount"
      })
    }
    res.status(200).json({
      status: "Success",
      message: "user deleted successfully",
      data:deltedUser
    });
  } catch (error) {
    console.log(error)
  }
}

export const getSingleUser = async (req,res)=>{
  try {
    const {id}=req.params
    let user = await User.findById(id)
     res.status(200).json({
       status: "success",
       user,
     });
  } catch (error) {
     res.status(400).json({
       status: "Fail",
       message: `Error: ${error.message}`,
     });
  }
}

export const updateUser = async (req,res)=>{
  try {
  let image = ""
      if(req.file){
       image = await cloudinaryImageUpload(req.file.path);
        
      }
   
    const { id } = req.params;
    console.log(req.body)
    let user = await User.findByIdAndUpdate(id, {...req.body,image}, {
      new: true,
      select: "-password",
    });
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: `Error: ${error.message}`,
    });
    console.log(error)
  }
}