import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
dotenv.config();

const app=express();
app.use(express.json());

connectDB();
const PORT=process.env.PORT;


//API ROUTES
app.use('/api/v1/auth',authRoutes)



//listen server
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.DEV_MODE} on Port ${PORT}`.bgCyan.white)
})