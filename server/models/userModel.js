import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
    minLength:6

   },
   country:{
    type:String,
    required:false,
   },
   phone:{
    type:Number,
    required:false,
   }
},{timestamps:true})

export default mongoose.model('users',userSchema);