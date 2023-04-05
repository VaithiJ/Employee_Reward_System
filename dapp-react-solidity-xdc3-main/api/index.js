import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/employee/register.js";
import loginRoute from "./routes/employee/login.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import regComp from "./routes/company/registerComp.js";
import loginComp from "./routes/company/loginComp.js";
import addEmployee from "./routes/company/addemp.js"
import getEmp from "./routes/company/getEmp.js";
import emp from "./routes/company/getOne.js";
import comEmp from "./routes/company/comEmp.js"
import onboard from "./routes/company/onboard.js";
import assignTask from "./routes/company/assignTask.js";
import {  verifyUser } from "./utils/verifyToken.js";
import {verifyUserr} from "./utils/verifyUserToken.js"
import getTask from "./routes/company/getTasks.js";
import oneTask from "./routes/company/getTask.js";
import rewards from "./routes/company/reward.js"
import allrewards from "./routes/company/allrewards.js"
import updatetask from "./routes/employee/updatetask.js"
import status from "./routes/company/status.js"
import viewassigned from "./routes/employee/viewassigned.js"
import company from "./routes/admin/admin.js"
import verifycom from "./routes/admin/verifycomp.js"
const app = express()
dotenv.config();

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGOO);
        console.log("Connected to mongodb")
}       catch (error){
        throw error;
}
};

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongodb disconnected")
})

mongoose.connection.on("connected", ()=>{
    console.log("Mongodb connected")
})
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json())
app.use("/", userRoute)
app.use("/",loginRoute)
app.use("/", regComp)
app.use("/", loginComp)
app.use("/",regComp)
app.use("/", addEmployee)
app.use("/", getEmp)
app.use("/", emp)
app.use("/", comEmp)
app.use("/",onboard)
app.use("/", assignTask)
app.use("/", getTask)
app.use("/", oneTask)
app.use("/", allrewards)
app.use("/",rewards)
app.use("/",viewassigned)
app.use("/",updatetask)
app.use("/", company)
app.use("/", verifycom)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use((err,req,res,next)=>{
    const errstatus = err.status || 500;
    const errmsg = err.message || "Something went wrong";
    return res.status(errstatus).json({
        success : false,
        status : errstatus,
        message : errmsg,
        stack : err.stack,

    })
})
  
app.get("/", (req,res)=>{
    res.send("HI")
})


app.listen(8800,()=>{
    connect()
    console.log("Connected")
})
