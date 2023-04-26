import React, { useState, useEffect , useContext} from "react";
import dotenv from "dotenv";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import SidebarMenu from "./side";
import { AccountCircle, GitHub, Language, Twitter } from "@material-ui/icons";
import { AiOutlineUserAdd } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import "./real.css"
import Footercr from "../footer/footercr";
import LogoutHeader from "../header/logoutheader";
import {storage} from "../../firebase.js"
import {v4 as uuidv4} from "uuid";
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage";
dotenv.config()

const nodemailer = require('nodemailer');
 const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');
const ProfilePage = (props) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [red, setred] = useState([]);
  const[m,setm]=useState("")
  // const [comName, setComName] = useState(" ");
  // const [comId, setComId] = useState(" ");
  const [employee, setEmployee] = useState([]);
  const API_URL = "http://3.110.107.87:8800";
  const employeeId = props.match.params._id;
  const employeeName = employee.name;
  const employeeAddress = employee.address;
  const employeeMobile = employee.mobile;
  const employeeEmail = employee.email;
  const employeeWallet = employee.wallet;
  const profile11= employee.profile;
  console.log("aksjdakjsdkasdjasd", employeeMobile);
    const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);
  console.log("sample", erc)
  // console.log("sdfgjhfsdghfdsghd",respo.data);
  // console.log("sdfgjhfsdghfdsghd",respo.data);
  window.onload = function() {
    alert("\n• Please connect your company wallet address ");
  }
  // console.log("comName:",comName);
  // console.log("comId:",comId);
  console.log("employee id:", employeeId);
  console.log("name: ", employeeName);
  console.log("address: ", employeeAddress);
  console.log("email: ", employeeEmail);
  console.log("mobile: ", employeeMobile);
  console.log("wallet: ", employeeWallet);
  console.log("profile: ", profile11);
  // console.log(response.data);
  const [same, setSame] = useState(false);
  const sameAdd = () => {
    // console.log(tokenn.wallet.replace("xdc", "0x"));
    const ls = localStorage.getItem("WalletAddress");
    const sl = ls.toLowerCase();
    console.log(sl);
    if (tokenn.wallet.replace("xdc","0x") === sl) {
      setSame(true);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      sameAdd();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
    
  const tokenn = jwt_decode(cookies.access_token);
  const comName = tokenn.name;
  const comId = tokenn.name.substr(0, 3).toUpperCase() + employeeId.substr(-6);
    const getAllEmployees = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    
    let employeeaddress = employee.wallet.replace("xdc", "0x");
    let response1 = await queryData(erc, provider, 'getAllEmployees',[employeeaddress]);
    log("submitClaim", "hash", response1)
    setSubmitting(false);
  }
  const regEmployee = async () => {
    sameAdd()
    if(same == true){
    try {
      const response = await axios.post(
        `${API_URL}/addemployee/${employeeId}/${employeeName}/${employeeAddress}/${employeeMobile}/${employeeEmail}/${employeeWallet}/${profile11}`,
        {
          comName,
          comId,
        },
        { withCredentials: true }
      );
      setSubmitting(true);
  
      const respo = await axios.get(`${API_URL}/onboard/${employeeId}`, {
        withCredentials: true,
      });
      console.log("asasdasdasdasdsaasdasssssssssssss", respo);
      
      let employeeaddress = employee.wallet.replace("xdc", "0x");
      let employeename = employee.name;
      console.log("name", employeename);
      let resp = await executeTransaction(erc, provider, "regEmployee", [
        employeeaddress,employeename
        
      ]);
      log("Registered Employee", "hash", resp.txHash);
      setSubmitting(false);
    } catch (error) {
      if (error.response) {
        console.error("Error response: ", error.response.data);
      } else if (error.request) {
        console.error("Error request: ", error.request);
      } else {
        console.error("Error message: ", error.message);
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }else{
    alert(`This is not ${comName}'s wallet address`)

  }
}
  
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(employeeName)
        const response = await axios.put(`${API_URL}/updateprofile/${employeeName}`);
        const red = response.data.updatedprofile;
        setred(red);
  
        const storageRef = ref(storage, `UserProfile/${employeeName}`);
        const listResult = await listAll(storageRef);
  
        const itemRef = listResult.items.find((ref) => ref.name === red.profile);
        if (itemRef) {
          const url = await getDownloadURL(itemRef);
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProfile();
  }, [employeeName]);
  
  useEffect(() => {
    axios
      .get(`${API_URL}/empprofile/${employeeId}`, { withCredentials: true })

      // make a GET request to the server
      .then((response) => {
        //console.log(response.data.user);
        setEmployee(response.data.user);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);
  const onboarded = employee.isOnboarded;
  console.log("vanthura", onboarded);
  // console.log("heyy",employee)
  return (
    <div  style={{ height: "auto" }}>
      <header
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <div style={{ display: "flex", position: "relative", bottom: "10px" }}>
          {" "}
          <SidebarMenu />
        </div>
        <h1
          style={{
            margin: "0",
            marginLeft:"-120px",
            fontSize: "35px",
            fontWeight: "bold",
            color: "#0F6292",
            flex: 4,
            textAlign: "center",
            position: "relative",
            left: "30px",
            fontFamily:"Secular One"
          }}
        >
          EMPLOYEE PROFILE
        </h1>
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s"
          alt="User Avatar"
          style={{
            borderRadius: "50%",
            marginRight: "20px",
            width: "50px",
            height: "50px",
          }}
        /> */}
        
      </header>
      <div style={{backgroundColor:"#F9F8F8"}}>
      <div
        className="card"
        style={{
          width: "900px",
          height: "140px",
          flexDirection: "row",
          background: "#FFFFFF",
          margintop: "100px",
          position: "relative",
          top: "30px",
          left: "240px",
        }}
      >
        <img
          src={avatarUrl ||"https://img.freepik.com/free-icon/user_318-159711.jpg"}
          alt="Avatar"
          style={{
            border: "3px solid #ccc",
            boxShadow: "0px 0px 10px #ccc",
            borderRadius: "50%",
            marginLeft: "5%",
            width: "120px",
            height: "120px",
            position: "relative",
            top: "10px",
          }}
        />

        <div
          className="red"
          style={{
            flexDirection: "column",
            position: "relative",
            top: "35px",
            left: "30px",
            flexDirection: "column",
          }}
        >
          <p style={{ display: "inline-block",fontFamily:"Secular One", marginLeft:"-0px" }}>
            <b style={{ color: "#537FE7", display: "inline",fontFamily:"Secular One" }}>Name : </b>{" "}
            {employee.name}
          </p>

          <p style={{fontFamily:"Secular One"}}>
            {" "}
            <b style={{ color: "#537FE7",fontFamily:"Secular One" }}> Wallet Address: </b>{" "}
            {employee.wallet}
          </p>
        </div>
        {/* <div className="butad">
          <div
          
            style={{
              position: "absolute",
              bottom: "10px",
              right: "-10px",
              height: "20%",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ":hover": {
                transform: "scale(1.2)",
                background: "#FFFFFF",
              },
            }}
          >
            {onboarded ? null : (
              <CardActions>
                <Link to={"/real"}>
                  <Button
                  
                    onClick={regEmployee}
                    variant="contained"
                    color="primary"
                    style={{
                      margin: "1rem",
                      position: "relative",
                      bottom: "50px",
                      width: "150px",
                      right: "30px",
                      marginTop:"-40px",
                      marginLeft:"00px",
                     
                    }}
                  >
                    <AiOutlineUserAdd
                      style={{
                        width: "30px",
                        height: "30px",
                        position: "relative",
                        right: "20px",
                      }}
                    />{" "}
                    <a>
                      {" "}
                      <b> Add </b>{" "}
                    </a>
                  </Button>
                </Link>
                <div style={{marginBottom:"-40px", marginLeft:"-10px"}}>
                <Button
                  onClick={getAllEmployees}
                    variant="contained"
                    color="primary"
                    style={{marginTop:"10px",marginBottom:"0px", margin: "1rem",position:"relative",bottom:"50px",width:"150px",right:"30px", marginLeft:"-170px"}}
                  >
                     <AiOutlineUserAdd style={{width:"30px",height:"30px",position:"relative",right:"20px"}}/> <a> <b> Get </b>  </a>
                  </Button>
                  </div>
              </CardActions>


            )}
          </div>
        </div> */}
      </div>
      <div
        className="card1"
        style={{
          marginLeft: "238px",
          position: "relative",
          top: "50px",
          textAlign: "center",
          borderRadius: "20px",
          height:"300px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h6>
            <b style={{ fontSize: "1.4rem", color: "#537FE7",fontFamily:"Secular One"    }}>INFORMATION</b>
          </h6>{" "}
        </div>
        <hr className="mt-0 mb-4" />
        <div className="row pt-1">
          <div
            className="col-6 mb-3 d-flex align-items-left"
            style={{ position: "relative", left: "50px" }}
          >
            <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily:"Secular One" }}>Name:</h6>
            <p className="text-muted  mb-6" style={{fontFamily:"Secular One"}}>{employee.name}</p>
          </div>
          <div
            className="col-6 mb-3 d-flex align-items-left"
            style={{ position: "relative", left: "50px" }}
          >
            <h6 style={{ color: "#537FE7", marginRight: "20px" ,fontFamily:"Secular One"}}>Email:</h6>
            <p className="text-muted mb-6" style={{fontFamily:"Secular One" }}>{employee.email}</p>
          </div>
          <div
            className="col-6 mb-3 d-flex align-items-left"
            style={{ position: "relative", left: "50px",fontFamily:"Secular One" }}
          >
            <h6 style={{ color: "#537FE7", marginRight: "20px",fontFamily:"Secular One" }}>Phone:</h6>
            <p className="text-muted  mb-6" style={{fontFamily:"Secular One"}}>{employee.mobile}</p>
          </div>

          <div
            className="col-6 mb-3 d-flex align-items-left"
            style={{ position: "relative", left: "50px" }}
          >
            <h6 style={{ color: "#537FE7", marginRight: "20px",fontFamily:"Secular One" }}>Address:</h6>
            <p className="text-muted mb-0" style={{fontFamily:"Secular One"}}>{employee.address}</p>
          </div>
          <div
            className="col-6 mb-3 d-flex align-items-left"
            style={{ position: "relative", left: "50px" , marginLeft:"-20px"}}
          >
            <h6  className="walad" style={{ color: "#537FE7", marginRight: "100px",fontFamily:"Secular One" }}>
              Wallet Address:
            </h6>
            <p className="walad" style={{color:"#6C7592",fontFamily:"Secular One", marginLeft:"-100px"}}>{employee.wallet}</p>
          </div>
          <div
            className="col-6 mb-3 d-flex align-items-left"
            style={{ position: "relative", left: "50px", marginLeft:"20px" }}
          >
            <h6 style={{ color: "#537FE7", marginRight: "20px", fontFamily:"Secular One" }}>ID:</h6>
            <p className="text-muted  mb-6" style={{fontFamily:"Secular One"}}>{employee._id}</p>
          </div>
        </div>
        {/* <div style={{ marginTop: "80px" }}>
          <div style={{ textAlign: "center" }}>
            <h6>
              <b
                style={{
                  fontSize: "1.4rem",
                  color: "#537FE7",
                  textAlign: "center",
                  fontFamily:"Secular One"
                }}
              >
                COMPANY
              </b>
            </h6>
          </div>
          <hr className="mt-0 mb-4" />
          <div className="row pt-1">
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px",fontFamily:"Secular One" }}>
                Company Name:
              </h6>
              <p className="text-muted mb-0"> </p>
            </div>
            <div
              className="col-6 mb-3 d-flex align-items-left"
              style={{ position: "relative", left: "50px" }}
            >
              <h6 style={{ color: "#537FE7", marginRight: "20px" ,fontFamily:"Secular One"}}>
                EmployeeId:
              </h6>
              <p className="text-muted mb-0"></p>
            </div>
          </div>
        </div> */}
        
        </div>
        <div className="butad">
          <div
          
            style={{
              position: "absolute",
              bottom: "10px",
              right: "-10px",
              height: "20%",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ":hover": {
                transform: "scale(10)",
                background: "#330078",
              },
            }}
          >
            {onboarded ? null : (
              <CardActions>
                {/* <Link to={"/real"}> */}
                  <Button
                  
                    onClick={regEmployee}
                    variant="contained"
                    color="primary"
                    style={{
                      margin: "1rem",
                      position: "relative",
                      bottom: "50px",
                      width: "240px",
                      right: "30px",
                      height:"60px",
                      marginTop:"150px",
                      marginLeft:"-630px",
                    }}
                  >
                    <AiOutlineUserAdd
                      style={{
                        width: "30px",
                        height: "30px",
                        position: "relative",
                        right: "20px",
                      }}
                    />{" "}
                    <a>
                      {" "}
                      <b> Add Employee </b>{" "}
                    </a>
                  </Button>
                {/* </Link> */}
                {/* <div style={{marginBottom:"-40px", marginLeft:"-10px"}}>
                <Button
                  onClick={getAllEmployees}
                    variant="contained"
                    color="primary"
                    style={{marginTop:"10px",marginBottom:"0px", margin: "1rem",position:"relative",bottom:"50px",width:"150px",right:"30px", marginLeft:"-170px"}}
                  >
                     <AiOutlineUserAdd style={{width:"30px",height:"30px",position:"relative",right:"20px"}}/> <a> <b> Get </b>  </a>
                  </Button>
                  </div> */}
              </CardActions>


            )}
          </div>
        </div>
        
      </div>

      <div></div>

      {/* <Footercr/> */}
    </div>
  );
};

export default ProfilePage;

