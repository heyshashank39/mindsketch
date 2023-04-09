
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerController=async(req,res)=>{
    try {
    const {username,email,password}=req.body;
    const existingUser=await userModel.findOne({username});
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already Exist!"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const user=await new userModel({username,email,password:hashedPassword}).save();
    res.status(200).send({
        success:true,
        message:"User Registration Succesful !",
        user
    })
   } catch (error) {
     console.log(error);
   }
}


export const loginController=async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user=await userModel.findOne({username});
        if(!user){
           return res.status(400).send({
            success:false,
            message:"User not found",
           })
        }
        const isValidPass=await bcrypt.compare(password,user.password);
        if(!isValidPass){
          return res.status(400).send({
          success:false,
          message:"Password Incorrect"
          
        })
    }


    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.status(200).json({token,userID:user._id})
    
}
catch (error) {
        console.log(error);
    }
}



