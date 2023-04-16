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

  const uploadFile = async(taskkk) => {
    axios
        .put(
          `${API_URL}/updateetask/${taskkk._id}`,
          { certificates: "Certified" },
          { withCredentials: true }
        )
        .then(async (responsee) => {
          const updateFile = responsee.data.updatedTask;
          console.log(responsee.data.updateFile);
          setSubmitting(true);
        
    if (fileUpload == null) return;
    const fileName = fileUpload.name + generateHash(fileUpload.name);
    const hashName = fileName.slice(-64);


    console.log(hashName)
    const fileRef = ref(storage, `certificates/${fileName}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, { name: fileName, url: url }]);
      });
    });

    console.log(taskkk._id.slice(-5))

   


    
   
    setSubmitting(true);
    let filehash = hashName;
    let resp = await executeTransaction(erc,provider,"registerFile",[filehash, taskkk._id.slice(-5)]);
    log("Registered","hash", resp.txHash)
    if (fileUpload && fileUpload.type === "application/pdf") {
      // TODO: Upload the file
      console.log("File uploaded successfully.");
    } else {
      // Show an alert or a notification message
      alert("Please select a PDF file.");
    
    }
    let taskId = (taskkk._id).slice(-5);
    console.log(taskId);
    let response = await queryData(erc, provider, 'getFileHash', [taskId]);
    log("Returned hash", "hash", response);
    const fileListRef = ref(storage, 'certificates');
    listAll(fileListRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (itemRef.name.slice(-64) === response) {
            console.log(itemRef.fullPath);
            getDownloadURL(itemRef)
              .then((url) => {
                console.log(url);
                window.open(url, '_blank');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
      setSubmitting(false);
    })
  };
  
  

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

  const Rewarded = async (taskk) => {
    const confirmed = window.confirm("Reward this Employee?");

    if (confirmed) {
      axios
        .put(
          `${API_URL}/updatetask/${taskk._id}`,
          { status: "Rewarded" },
          { withCredentials: true }
        )
        .then(async (response) => {
          const updatedTask = response.data.updatedTask;
          console.log(response.data.updatedTask);
          setSubmitting(true);
          // let to = tokenn.wallet.replace("xdc", "0x");
          let employeeaddress = updatedTask.empWalletAddress.replace(
            "xdc",
            "0x"
          );
          console.log(employeeaddress);
          let amount = updatedTask.rewards;
          console.log(amount);

          let resp = await executeTransaction(erc, provider, "sendReward", [
            employeeaddress,
            amount,
          ]);
          log("Sending Reward to Employee ", "hash", resp.txHash);
          window.location.reload();

          setSubmitting(false);

          // update tasks state
          setTask(
            task.map((t) => {
              if (t._id === updatedTask._id) {
                return updatedTask;
                setTaskId(updatedTask._id)
              } else {
                return t;
              }
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
    <div style={{backgroundImage: `url(${ss})`, height:"1000px"}}>
    <div className="container" >
      <div className="main" >
        <h1 style={{fontFamily:"Algeria", fontSize:"50px"}}>REWARD EMPLOYEES</h1>
        <div style={{ position: "relative", right: "550px", bottom: "70px" , marginLeft:"-180px"}}>
          {" "}
          <SidebarMenu />{" "}
</div>

<div  style={{ 
  background: 'white', 
  padding: '20px', 
  borderRadius: '8px', 
  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",
  border: '1px solid #ccc',
  marginBottom: '20px',
  width:"1300px",
  backgroundImage: `url(${bg})`
 
  }}>
  <h2>Tasks</h2>
  <div className="task-list" style={{width:"1250px"}}>
  <div className="task-list">
    <div className="task-list-header">
    <div className="task-name" style={{marginLeft:"-30px"}} >UID</div>
      <div className="task-name" >Task Name</div>
      <div className="task-name" > Name</div>
      <div className="task-name" >Wallet Address</div>
      {/* <div className="task-assigned-to" style={{ width: '20%' }}>Assigned To</div> */}
      <div className="task-due-date" >Due Date</div>
      <div className="task-due-date" >Reward</div>

      <div className="task-progress">Actions</div>
      
      <div className="task-status" style={{ width: '15%', paddingLeft: "30px" }}>Rewards</div>
    </div>
    {tasks.map((task) => (
      <div className="task-list-item"  style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginTop: '10px', 
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
      }}>
        <div className="task-name" >{(task._id).slice(-5)}</div>
        <div className="task-name">{task.task}</div>
        <div className="task-assigned-to"> {task.empName}</div>
        <div className="task-assigned-to" >xdc...{task.empWalletAddress.slice(-5)}</div>
        <div className="task-due-date">{task.deadline}</div>
        <div className="task-progress" >{task.rewards}
        </div>
        {task.status==="Approved" ? (
        <div>
           <input
    style={{ opacity: submitting ? 0.5 : 1 , marginRight:"-30px"}}
    disabled={submitting}
    type="file"
    accept=".pdf"
    onChange={(e) => setFileUpload(e.target.files[0])}/>
              <button style={{ 
                marginRight: '-40px', 
                padding: '8px 16px', 
                background: submitting ?'red' : "green", 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' ,
                opacity: submitting ? 0.5 : 1
              }}
              onClick={()=>uploadFile(task)}> Upload Certificates</button> 
            </div>) : (
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Uploaded</div>
          )}
        
        <div className="task-status" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          
          width: '15%',
          marginRight:"-20px"
        }}>
          {task.status === "Approved" ? (
            <div>
              <button style={{ 
                marginRight: '10px', 
                padding: '8px 16px', 
                background: 'green', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
               onClick={() => Rewarded(task)}>Reward</button> 
            </div>
          ) : (
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Rewarded</div>
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
  );
};

export default RewardTasks;
