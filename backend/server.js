import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./api/routes/user.route.js";
import gigRoute from "./api/routes/gig.route.js";
import orderRoute from "./api/routes/order.route.js";
import conversationRoute from "./api/routes/conversation.route.js";
import messageRoute from "./api/routes/message.route.js";
import reviewRoute from "./api/routes/review.route.js";
import authRoute from "./api/routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO);
    console.log("Databse Connected")
    }catch(error){
        console.log(error);
    }
}

app.use(cors({origin: "http://localhost:5173", credentials: true})); // Enable CORS for requests from localhost:5173 with credentials
app.use(express.json()); // to parse JSON bodies from incoming requests
app.use(cookieParser()); // to parse cookies from incoming requests

app.use("/api/auth", authRoute); //localhost:8800/api/auth - to access auth routes
app.use("/api/users", userRoute); //localhost:8800/api/users - to access user routes
app.use("/api/gigs", gigRoute); //localhost:8800/api/gigs - to access gig routes
app.use("/api/orders", orderRoute); //localhost:8800/api/orders - to access order routes
app.use("/api/conversations", conversationRoute); //localhost:8800/api/conversations - to access conversation routes
app.use("/api/messages", messageRoute); //localhost:8800/api/messages - to access message routes
app.use("/api/reviews", reviewRoute); //localhost:8800/api/reviews - to access review routes

    app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
    })

app.listen(8800, ()=>{
    connect()
    console.log("Backend Server is running")
})