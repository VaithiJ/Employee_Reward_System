import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import mongoose from "mongoose";
import userRoute from "./routes/employee/register.js";
import loginRoute from "./routes/employee/login.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
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
import completionDate from "./routes/company/CompletionDate.js"
import Updateprofile from "./routes/employee/updateprofile.js"
import Updatedcondition from "./routes/employee/condition.js"
import Certify from "./routes/company/certify.js"
import updateprofileee from "./routes/company/updateprofileee.js"
import award from "./routes/company/awaaard.js"
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const app = express()
dotenv.config();
// const upload = multer({ dest: 'EmployeeRewardSystem/certificates/' })
// const s3 = new AWS.S3({
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     region: 'ap-south-1'
//   });
//   const certUpload = upload.fields([{ name: 'certificates', maxCount: 1 }])
//   app.post('/uploadingCertificate', certUpload, function (req, res, next) {
//     const file = req.files['certificates'][0];
  
//     // set S3 key (filename) to a unique value based on timestamp
//     const s3Key = Date.now().toString() + '-' + file.originalname;
  
//     // create parameters object for S3 upload
//     const params = {
//       Bucket: '',
//       Key: s3Key,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: 'public-read' // set ACL to public-read to allow public access to the file
//     };
  
//     // upload file to S3
//     s3.upload(params, function (err, data) {
//       if (err) {
//         console.log('Error uploading to S3:', err);
//         return res.status(500).json({ message: 'Error uploading to S3' });
//       }
  
//       console.log('Successfully uploaded to S3:', data.Location);
//       return res.status(200).json({ message: 'File uploaded successfully' });
//     });
//   });
  
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
  
  const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        key: function (req, file, cb) {
            const employeeName = req.body.empName;
            cb(null, `EmployeeRewards/TaskCertificates/${employeeName}/` + file.originalname); // use EmployeeRewards folder + original filename as the key in S3
        }
    })
});

const uploadd = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, 'EmployeeRewards/PerformanceCertificates/' + file.originalname); // use EmployeeRewards folder + original filename as the key in S3
        }
    })
});

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
app.use(cors({ origin: "http://192.168.26.107:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json())
app.use("/", userRoute)
app.use("/",loginRoute)
app.use("/", regComp)
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
app.use("/", completionDate)
app.use("/",Updateprofile)
app.use("/", Updatedcondition)
app.use("/", Certify)
app.use("/", award)
app.use("/", updateprofileee)
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://192.168.26.107:3000"); 
    
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
app.use("/" , loginComp)

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
  
// app.post('/uploadingCertificate', upload.single('certificates'), function (req, res, next) {
    // app.post('/uploadingCertificate', upload.fields([{name:'certificates', maxCount:1}]), async function (req, res) {
    // res.send('File uploaded successfully');
    // if (req.file && req.file.buffer) {
    //     const hash = crypto.createHash('sha256').update(req.files.buffer);
    //     console.log(hash)
    //     // do something with the hash
    //   } else {
    //     console.log("hola amigo")
    //         }
    // var Certificates = req.files['certificates'][0];

    // const hash = crypto.createHash('sha256').update(Certificates.buffer);
    // console.log(hash)

// });






// app.post('/uploadingCertificate', upload.fields([{name:'certificates', maxCount:1}]), async function (req, res) {
//     const file = req.files['certificates'][0];
//     console.log(file)
//     const fileContents = fs.readFileSync(file.path);

//     console.log(fileContents)
//     const fileBuffer = file.buffer;
//     const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
//     console.log('Hash of uploaded file:', hash);
//     res.send('File uploaded successfully');
// });

app.post('/uploadingCertificate', upload.single('certificates'), async function (req, res) {
    const file = req.file;
    console.log('Uploaded file:', file);
  
    // Read the contents of the uploaded file from the S3 bucket
    const params = { Bucket: file.bucket, Key: file.key };
    const fileObject = await s3.getObject(params).promise();
    const fileContents = fileObject.Body;
  
    // Compute the SHA256 hash of the file contents
    const hash = crypto.createHash('sha256').update(fileContents).digest('hex');
    console.log('Hash of uploaded file:', hash);
  
    res.send({uploadStatus:"success", FileHash:hash});
  });

  app.post('/uploadCertificate', uploadd.single('PerformanceCertificates'), async function (req, res) {
    const file = req.file;
    console.log('Uploaded file:', file);
  
    // Read the contents of the uploaded file from the S3 bucket
    const params = { Bucket: file.bucket, Key: file.key };
    const fileObject = await s3.getObject(params).promise();
    const fileContents = fileObject.Body;
  
    // Compute the SHA256 hash of the file contents
    const hash = crypto.createHash('sha256').update(fileContents).digest('hex');
    console.log('Hash of uploaded file:', hash);
  
    res.send({uploadStatus:"success", FileHash:hash});
  });



// app.post('/uploadingCertificate', upload.fields([{name:'certificates', maxCount:1}]), async function (req, res) {
//     try{
//     // const file = req.files['certificates'][0];
//     const buffer = fs.readFileSync(req.files['certificates'][0].location);
//     console.log(buffer)

   
    // const hash = crypto.createHash('sha256').update(buffer);
    // const fileHash = hash.digest('hex');
    
    // console.log(fileHash);
//     } catch(error){
//         console.log(error)
//     }
    
//     res.send('File uploaded successfully');
//   });

app.get("/", (req,res)=>{
    res.send("HI")
})


app.listen(8800,()=>{
    connect()
    console.log("Connected")
})
