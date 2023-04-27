import React, { useState, useEffect, useContext } from "react";
import "./task.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { FaSignOutAlt , FaSquare} from "react-icons/fa";

import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
import crypto from "crypto";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip,ComposedChart   } from 'recharts';
import bg from "./grid3.png"
import ss from "./ss.svg"
import { BigNumber } from "ethers";
import "./reg.css"


import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase.js";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref as dbRef, set } from "firebase/database";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

const RewardTasks = (props) => {
  const [tasks, setTasks] = useState([]);
  const [hash, setHash] = useState("");
  const [rewardedemp, setrewardedemp] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [taskId, setTaskId] = useState(null);

  const fileListRef = ref(storage,'certificates');
  function generateHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
  window.onload = function() {
    alert("\n• Connect the wallet address of Admin and check it before using\n• Make sure you have unique name for each certificate which is to be uploaded\n• Once uploaded file to blockchain, cannot reupload another certiicate, so be careful\n• Make sure you have enough balance of tokens before rewarding ");
  }
  

  const uploadFile = async (taskkk) => {
    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
const confirmUniqueName = window.confirm("Does the certificate have a unique name?");
const confirmNoChanges = window.confirm("Once uploaded, cannot be changed. Proceed?");

if (confirmAdminWallet && confirmUniqueName && confirmNoChanges ) {

  // axios
  //     .put(
  //       `${API_URL}/updateetask/${taskkk._id}`,
  //       { certificates: "Certified" },
  //       { withCredentials: true }
  //     )
      // .then(async (responsee) => {
      //   const updateFile = responsee.data.updatedTask;
      //   console.log(responsee.data.updateFile);
      //   setSubmitting(true);
        
  //  e.preventDefault();
  if (!fileUpload) return;

  try {
    setSubmitting(true);
console.log("FIles",fileUpload)
    const formData =  new FormData();
     formData.append('certificates', fileUpload);
console.log("Formdata", formData.entries())
    const response = await axios.post(`${API_URL}/uploadingCertificate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "req":"Access-Control-Allow-Origin"
      }, withCredentials:true
    });
    setHash(response.data.FileHash);

    console.log('File uploaded successfully!', response.data.FileHash);
    console.log(hash)
    setSubmitting(false);
  } catch (error) {
    console.error('Error uploading file!', error);
    setSubmitting(false);
  }
        // if (fileUpload == null) return;
        // const fileName = fileUpload.name + generateHash(fileUpload.name);
        // const hashName = fileName.slice(-64);
  
        // console.log(hashName);
        // const fileRef = ref(storage, `certificates/${fileName}`);
        // uploadBytes(fileRef, fileUpload).then((snapshot) => {
        //   getDownloadURL(snapshot.ref).then((url) => {
        //     setFileList((prev) => [...prev, { name: fileName, url: url }]);
        //   });
        // });
  
        // console.log(taskkk._id.slice(-5));
         setSubmitting(true);
         let taskId = ((taskkk._id).slice(-5));
        let filehash = hash;
        let resp = await executeTransaction(erc, provider, "registerFile", [
          filehash,
          taskId
        ]);
        log("Registered", "hash", resp.txHash);
        if (fileUpload && fileUpload.type === "application/pdf") {
          // TODO: Upload the file
          console.log("File uploaded successfully.");
        } else {
          // Show an alert or a notification message
          alert("Please select a PDF file.");
        }
       
        console.log(taskId);
        let response = await queryData(erc, provider, "getFileHash", [taskId]);
        log("Returned hash", "hash", response);
        // const fileListRef = ref(storage, "certificates");
        // listAll(fileListRef)
        //   .then((res) => {
        //     res.items.forEach((itemRef) => {
        //       if (itemRef.name.slice(-64) === response) {
        //         console.log(itemRef.fullPath);
        //         getDownloadURL(itemRef)
        //           .then((url) => {
        //             console.log(url);
        //             window.open(url, "_blank");
        //           })
        //           .catch((error) => {
        //             console.log(error);
        //           });
        //       }
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
  
        // Reload page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
  
        setSubmitting(false);
      // })
      // .catch((error) => {
      //   console.log(error);
        // Reload page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      // });
  };
} 

const handleSubmit = async (e, taskkk) => {
  e.preventDefault();
  if (!fileUpload) return;

  try {
    setSubmitting(true);
console.log("FIles",fileUpload)
    const formData =  new FormData();
     formData.append('certificates', fileUpload);
console.log("Formdata", formData.entries())
    const response = await axios.post(`${API_URL}/uploadingCertificate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "req":"Access-Control-Allow-Origin"
      }, withCredentials:true
    });

    console.log('File uploaded successfully!', response.data.FileHash);
    setSubmitting(false);
  } catch (error) {
    console.error('Error uploading file!', error);
    setSubmitting(false);
  }
};

  // useEffect(() => {
  //   window.addEventListener("error", handleWindowError);
  //   return () => {
  //     window.removeEventListener("error", handleWindowError);
  //   };
  // }, []);

  // const handleWindowError = (event) => {
  //   if (event.error?.message?.includes("invalid BigNumber string")) {
  //     window.location.reload();
  //   }
  // };
  function checkInspectConsoleForBigNumberError() {
    setInterval(() => {
      const errors = Array.from(window.console.errors || []);
      console.log('Errors:', errors);
      const bigNumberError = errors.find(error => error.message.includes("invalid BigNumber string"));
      if (bigNumberError) {
        console.error("BigNumber error occurred:", bigNumberError);
        window.location.href = window.location.href;
        console.log('Page reloaded.');
      }
    }, 1000);
  }
  
  

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, { name: item.name, url: url }]);
        });
      });
    });
  }, []);
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);
  console.log("sample", erc);



  const tokenn = jwt_decode(cookies.access_token);

  const API_URL = "http://localhost:8800";
  // const empName = props.match.params.empName;
  // const taskk = props.match.params.task;
  // console.log(empName);

  
  const compName = tokenn.name;
  
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/gettasks`, { withCredentials: true })
      .then((response) => {
        const re=  response.data.tasks.filter((tasks) => tasks.status === "Approved" || tasks.status === "Rewarded")
       setTasks(re.filter((task) => task.companyName===tokenn.name ))
        setrewardedemp(
          response.data.tasks.filter((tasks) => tasks.status === "Rewarded")
        );
        console.log(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const balanceOf = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let account = tokenn.wallet.replace("xdc", "0x");
    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()} tokens`);

    setSubmitting(false);
  };
  const Rewarded = async (taskk) => {
    const confirmed = window.confirm("Reward this Employee?");

    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
    const confirmUniqueName = window.confirm("Do you have enough balance to reward?");
    const confirmNoChanges = window.confirm("Once rewarded, cannot be changed. Proceed?");
    let updatedTask = await axios.put(
      `${API_URL}/updatetask/${taskk._id}`,
      { status: "Rewarded" },
      { withCredentials: true }
    ).then(response => response.data.updatedTask);
  
    console.log(updatedTask);
    if (confirmAdminWallet && confirmNoChanges && confirmUniqueName) {
      try {
        // Call the executeTransaction function first
        let resp = await executeTransaction(erc, provider, "sendReward", [
          taskk.empWalletAddress.replace("xdc", "0x"),
          taskk.rewards
        ]);
    
        // Wait for the transactionHash event to be emitted before proceeding
        await new Promise(resolve => {
          provider.once(resp.txHash, resolve);
        });
    
        // Force reload the page after 5 seconds
        setTimeout(() => {
          window.location.reload();
        }, 5000);
    
      } catch (error) {
        console.log("Failed successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // handle the error here, e.g. show an error message to the user
      } finally {
        setSubmitting(false);
      }
    
      // Update tasks state
      if (updatedTask) {
        setTask(
          task.map((t) => {
            if (t._id === updatedTask._id) {
              setTaskId(updatedTask._id);
              return updatedTask;
            } else {
              return t;
            }
          })
        );
      }
    }
  }
  
  
  const handleApproveTask = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], approved: true };
    setTasks(updatedTasks);
    alert("Task has been approved");
    console.log(tasks);
    const respo = await axios.get(`${API_URL}/status/${tasks.EmpName}`, {
      withCredentials: true,
    });
    console.log(respo.data);

    //  const delete = await axios.get()
  };

  const data = [
    { name: 'Approved Employees', value: tasks.length },
    { name: 'Rewarded Employees', value: rewardedemp.length },
  
  ];
  const COLORS = ['red', '#F3DA06'];
  return (
    <div style={{backgroundColor:"#E3E3E3", height:"800px"}}>
    <div className="containerr" >
      <div className="main" >
        <h1 className="headerrr" style={{fontFamily:"Secular One", fontSize:"40px", marginTop:"10px", marginLeft:"00px"}}>REWARD EMPLOYEES</h1>
        <div style={{ position: "relative", right: "550px", bottom: "70px" , marginLeft:"-120px", marginTop:"-10px"}}>
          {" "}
          <SidebarMenu />{" "}
          <button
                  onClick={balanceOf}
                  className="btn btn-primary"
                  style={{
                    margin: "1rem",
                    marginLeft: "1950px",
                    marginTop: "-40px",
                    borderRadius: "10px",
                    height: "45px",
                    backgroundColor: "#1196B0",
                    width: "110px",
                    fontFamily:"Secular One",
                 }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#330078";
                    // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                    e.target.style.boxShadow = " 1px 0px 19px 5px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#1196B0";
                    e.target.style.border = "none";
                    e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0,1.0)";
                  }}
                >
                  <FaSignOutAlt /> Balance
                </button>
</div>

<div className="container" style={{ 
  
  background: "white", 
  padding: '0px 20px', 
  borderRadius: '0px', 
  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.3) inset",
  border: '1px solid #ccc',
  marginBottom: '20px',
  width:"1400px"}}>
  <h2 className="containerrr" style={{fontFamily:"Secular One",marginTop:"20px"}}>TASKS</h2>
  <div className="task-list-container" style={{ height: '500px', overflowY: 'auto',marginTop:"-100px",  }}>
    <div className="task-list" style={{ width: "1100px" ,fontFamily:"Secular One",}}>
      <div className="task-list" style={{fontFamily:"Secular One"}}>
        <div className="task-list-header" style={{fontFamily:"Secular One",backgroundColor:"#D1D1D1"}}>
          <div className="task-name" style={{fontFamily:"Secular One", marginLeft:"-60px" }}>UID</div>
          <div className="task-name" style={{ fontFamily:"Secular One",marginLeft:"-70px" }}>TASK NAME</div>
          <div className="task-namee" style={{fontFamily:"Secular One",}}>NAME</div>
          <div className="task-wallet" style={{fontFamily:"Secular One",width:"-20"}}>WALLET ADDRESS</div>
          {/* <div className="task-assigned-to" style={{ width: '20%' }}>Assigned To</div> */}
          <div className="task-due-date" style={{fontFamily:"Secular One",}}>DUE DATE</div>
          <div className="task-due-date" style={{fontFamily:"Secular One",marginRight:"80px"}}>REWARD</div>
          <div className="task-progress" style={{fontFamily:"Secular One",}}>ACTIONS</div>
          <div className="task-status" style={{ width: '15%', paddingLeft: "30px",fontFamily:"Secular One", }}>REWARDS</div>
        </div>
        {tasks.map((task) => (
          <div
            className="task-list-item"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginTop: '10px', 
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
              backgroundColor:"white"
            }}
          >
            <div className="task-nameee" style={{fontFamily:"Secular One",}}>{(task._id).slice(-5)}</div>
            <div className="task-name" style={{fontFamily:"Secular One",}}>{task.task}</div>
            <div className="task-assigned-too" style={{fontFamily:"Secular One",}}>{task.empName}</div>
            <div className="task-assigned-to" style={{fontFamily:"Secular One",}}>xdc...{task.empWalletAddress.slice(-5)}</div>
            <div className="task-due-date" style={{fontFamily:"Secular One",}}>{task.deadline}</div>
            <div className="task-progress" style={{fontFamily:"Secular One",marginRight:"80px"}}>{task.rewards}</div>
            {task.certificates==="false" ? (
              <div>
                <input
                  style={{ opacity: submitting ? 0.5 : 1, marginRight:"-80px" }}
                  disabled={submitting}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                  name="certificates"
                />
                <button
                  style={{ 
                    marginRight: '-90px', 
                    padding: '8px 16px', 
                    background: submitting ?'red' : "green", 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    opacity: submitting ? 0.5 : 1,
                    fontFamily:"Secular One",
                    marginLeft:"30px"
                  }}
                  onClick={uploadFile}
                >
                  Upload Certificates
                </button> 
                </div>
            ) : (
              <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily:"Secular One",marginRight:"60px" }}>Uploaded</div>
            )}
            <div
              className="task-status"
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                paddingLeft: '30px',
                }}
                >
                {task.status === "Rewarded" ? (
                <div style={{ color: 'green', fontWeight: 'bold', fontFamily:"Secular One",  fontSize:"20px"}}>Rewarded</div>
                ) : (
                <button
                style={{
                padding: '8px 16px',
                background: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: submitting ? 0.5 : 1,
                fontFamily:"Secular One",
                marginRight:"-40px"
                }}
                disabled={submitting}
                onClick={() => Rewarded(task)}
                >
                Reward
                </button>
                )}
                </div>
                </div>
                ))}
                </div>
                </div>
                
                  </div>
                </div>

      </div>
    </div>
    </div>
  );
};

export default RewardTasks;
