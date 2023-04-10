import React, { useState, useEffect, useContext } from "react";
import "./task.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
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

  const fileListRef = ref(storage,'certificates');

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileName = fileUpload.name + uuidv4();
    const fileRef = ref(storage, `certificates/${fileName}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, { name: fileName, url: url }]);
      });
    });
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
        setTasks(
          response.data.tasks.filter((tasks) => tasks.status === "Approved")
        );
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

  return (
    <div className="container">
      <div className="main">
        <h1>Reward</h1>
        <div style={{ position: "relative", right: "550px", bottom: "70px" }}>
          {" "}
          <SidebarMenu />{" "}
        </div>
        <div className="summary">
          <div
            className="summary-card"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
              borderRadius: "5px",
              marginBottom: "20px",
              marginLeft: "-00px",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>
              Approved Employees
            </h2>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "10px 0 0 0",
              }}
            >
              {tasks.length}
            </p>
          </div>
          {/* <div className="summary-card" style={{ backgroundColor: "#fff", padding: "20px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)", borderRadius: "5px", marginBottom: "20px" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>Token Balance</h2>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "10px 0 0 0" }}>1000000</p>
  </div> */}
          <div
            className="summary-card"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)",
              borderRadius: "5px",
              marginBottom: "20px",
              marginRight: "-00px",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>
              {" "}
              Rewarded Employees
            </h2>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "10px 0 0 0",
              }}
            >
              {rewardedemp.length}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "1300px",
          }}
        >
          <h2>Tasks</h2>
          <div className="task-list" style={{ width: "1200px" }}>
            <div className="task-list">
              <div className="task-list-header">
                <div className="task-name" style={{ width: "5%" }}>
                  Task Name
                </div>
                <div className="task-name" style={{ width: "20%" }}>
                  {" "}
                  Name
                </div>
                <div className="task-name" style={{ width: "25%" }}>
                  Wallet Address
                </div>
                {/* <div className="task-assigned-to" style={{ width: '20%' }}>Assigned To</div> */}
                <div className="task-due-date" style={{ width: "20%" }}>
                  Due Date
                </div>
                <div className="task-progress" style={{ width: "10%" }}>
                  Rewards
                </div>

                <div
                  className="task-status"
                  style={{ width: "15%", paddingLeft: "30px" }}
                >
                  Actions
                </div>
              </div>
              {tasks.map((task) => (
                <div
                  className="task-list-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px",
                  }}
                >
                  <div className="task-name" style={{ width: "15%" }}>
                    {task.task}
                  </div>
                  <div className="task-assigned-to" style={{ width: "10%" }}>
                    {task.empName}
                  </div>
                  <div className="task-assigned-to" style={{ width: "30%" }}>
                    {task.empWalletAddress}
                  </div>
                  <div
                    className="task-due-date"
                    style={{ width: "20%", marginLeft: "80px" }}
                  >
                    {task.deadline}
                  </div>
                  <div
                    className="task-progress"
                    style={{ width: "-10%", marginLeft: "40px" }}
                  >
                    {task.rewards}
                  </div>

                  <div
                    className="task-status"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "auto",
                      width: "15%",
                    }}
                  >
                    {!task.approved ? (
                      <div>
                        <button
                          style={{
                            marginRight: "10px",
                            padding: "8px 16px",
                            background: "green",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => Rewarded(task)}
                        >
                          Reward
                        </button>
                        <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
                        <button
                          style={{
                            marginRight: "10px",
                            padding: "8px 16px",
                            background: "green",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "30px",
                          }}
                          onClick={uploadFile}
                        >
                          Upload Certificate
                        </button>
                      </div>
                    ) : (
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Rewarded
                      </div>
                    )}
                    {/* {!task.rejected ? (
            <div>
              <button style={{ 
                padding: '8px 16px', 
                background: 'red', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }} onClick={() => handleRejectTask(index)}>Reject</button>
            </div>
          ) : (
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Rejected</div>
          )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardTasks;
