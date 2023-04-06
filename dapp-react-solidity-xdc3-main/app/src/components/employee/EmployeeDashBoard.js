import React, { useState, useEffect , useContext} from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import styles from "../admin/dash.module.css";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import SidebarMenu12 from "./side1";
import { Link } from "react-router-dom";
const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');

const Card = (props) => {
  
  
  return (
    <div
      style={{
        backgroundColor: props.style.backgroundColor,
        color: "white",
        padding: "40px",
        fontSize: "20px",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 5.0)",
        margin: "20px",
        width: "500px",
      }}
    >
      <FontAwesomeIcon
        icon={faFileText}
        size="4x"
        style={{ marginBottom: "20px", marginLeft: "20px", opacity: "0.75" }}
      />
      <div>
        <h3 style={{ marginBottom: "10px", fontSize: "60px" }}>
          {props.count}
        </h3>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

const EmployeeDashboard = (props) => {
  
  const[balanceToken, setBalanceToken] = useState();
  const [open, setOpen] = useState(false);
  const togglePopup = (task) => {
    setSelectedTasks(task);
    setOpen(true);
  };
  const balanceOf = async (event) => {
  
  
    event.preventDefault();
    setSubmitting(true);
    
    let account = toke.wallet.replace("xdc", "0x");
    console.log(account)
    
    let balance = await erc.balanceOf(account);
    
    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()}`);
    
    setSubmitting(false);
  }
  
  const MarkasCompleted = (taskk) => {
    const confirmed = window.confirm(
      "Clicking on mark as completed notifies the admin. Are you sure you want to continue?"
    );
    if (confirmed) {
      const date = new Date().toLocaleDateString("en-GB"); // get current date in dd/mm/yy format
      axios
        .put(
          `${API_URL}/updatetask/${taskk._id}`,
          { status: "Waiting For Approval" },
          { withCredentials: true }
        )
        .then(() => {
          axios
            .put(
              `${API_URL}/completion/${taskk._id}`,
              { completion : date },
              { withCredentials: true }
            )
            .then((response) => {
              window.location.reload();
              const updatedTask = response.data.updatedTask;
              console.log(response.data.updatedTask);
              // update tasks state
              setTasks(
                tasks.map((t) => {
                  if (t._id === updatedTask._id) {
                    window.location.reload();
                    return updatedTask;
                  } else {
                    window.location.reload();
                    return t;
                  }
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const Approved = tasks.filter((task) => task.status === "Approved").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const Rewarded = tasks.filter((task) => task.status === "Rewarded").length;
  const Alltasks = tasks.length;

  const toke = jwt_decode(cookies.employee_token);
  // console.log(toke)
  const API_URL = "http://localhost:8800";
  useEffect(() => {
    // console.log("fshjkl")
    // setSubmitting(true);
    // const balanceOf = async (event) => {
    
    // let account = toke.wallet.replace("xdc","0x");
    // console.log(account)
    // let balance =  erc.balanceOf(account);
    
    // console.log(`Account balance: ${balance.toString()}`);
    // setBalanceToken(balance.toString());
    
    // setSubmitting(false);
    // }
   
    // setSubmitting(true);
    
    //  let account = toke.wallet.replace("xdc","0x");
    // let response1 =  queryData(erc, provider, 'balanceOf', [account]);
    // log("submitClaim", "hash", response1)
    //  console.log(`Account balance: ${response1.toString()}`);
    // setSubmitting(false); 
    // setBalanceToken(response1)
    
    axios
      .get(`${API_URL}/viewtask`, { withCredentials: true })
      .then((response) => {
        setTasks(
          response.data.tasks.filter((tasks) => tasks.empName == toke.name)
        );
        console.log(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`${API_URL}/empdetails`, { withCredentials: true })
      .then((response) => {
        const userData = response.data.user.filter((user) => user.name === toke.name);
        setEmployees(userData);
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    

  const [submitting, setSubmitting] = useState(false);
const { provider, erc } = useContext(EthereumContext);
console.log("sample", erc)



  console.log(tasks);
  const status = tasks.status;
  const onboarded = employees && employees[0] && employees[0].isOnboarded;

  console.log("vanakam", onboarded);
 
  return (
    <div>
      <header
        style={{
          backgroundColor: "navy",
          padding: "30px",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", bottom: "10px" }}>
          <SidebarMenu12 />{" "}
        </div>
        <button
      onClick={balanceOf}
      className="btn btn-primary"
      style={{ margin: "1rem", marginLeft: "-100px" }}
    >
       Check balance
    </button>
        <h1 style={{ color: "white", marginLeft:"00px", fontFamily:"Montserrat"}}>Employee Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <span style={{ color: "white", marginRight: "20px" }}>
              {toke.name.toUpperCase()}
            </span>
            <a href="/userprofile">
              <FaUser style={{ color: "orange", marginRight: "200px" }} />{" "}
            </a>
          </div>
          <FaBell style={{ color: "white" }} />
        </div>
      </header>

      <main
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
          alignItems: "center",
          fontStyle: "kanit",
        }}
      >
         {/* <button
                onClick={balanceOf}
                className="btn btn-primary"
                style={{ margin: "1rem", marginLeft: "100px" }}
              >
                 Check balance
              </button> */}
        <Card
          style={{
            backgroundColor: "#17A2B8",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
          }}
          title="Rewarded"
          count={Rewarded}
        />

        <Card
          style={{
            backgroundColor: "#32CD32",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
          }}
          title="Pending"
          count={pendingTasks}
        />

        <Card
          style={{
            backgroundColor: "orange",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
          }}
          title="Approved"
          count={balanceToken}
        />

        <Card
          style={{
            backgroundColor: "#d21f3c",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
          }}
          title="All Tasks"
          count={Alltasks}
        />
      </main>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <div
          style={{
            padding: "20px",
            position: "relative",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <span onClick={() => setOpen(false)}> X </span>
          </div>
          {selectedTasks && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                {selectedTasks.task}
              </div>
              <div style={{ fontSize: "16px", marginBottom: "20px" }}>
                {selectedTasks.taskDescription}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontSize: "14px", marginRight: "10px" }}>
                  Deadline:
                </div>
                <div style={{ fontSize: "14px" }}>{selectedTasks.deadline}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    // marginLeft:"150px"
                  }}
                  onClick={() => MarkasCompleted(selectedTasks)}
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>

      {onboarded ? (
        <div
          className="card"
          style={{
            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3)",
            marginBottom: "40px",
            width: "845px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h5
            className="card-header font-weight-bold"
            style={{
              textAlign: "center",
              fontFamily: "Montserrat",
              padding: "20px",
              color: "black",
            }}
          >
            Pending Tasks
          </h5>
          <div className={`${styles.cardBody}`}>
            <div
              className={`${styles.listGroup} list-group`}
              id="employee-list"
            >
              <div
                className="list-group"
                style={{ maxHeight: "1350px", overflowY: "auto" }}
              >
                {tasks.map((task) => (
                  <div
                    key={task.task}
                    className="list-group-item"
                    style={{
                      border: "0.1px solid black",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6
                          className="font-weight-bold mb-0"
                          style={{
                            fontFamily: "Montserrat",
                            marginTop: "20px",
                          }}
                        >
                          {task.task}
                        </h6>
                        <small>{task.deadline}</small>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                        >
                          Status:
                        </p>
                        <p
                          style={{ display: "inline-block", color: "#ff0000" }}
                        >
                          <b>{task.status}</b>
                        </p>
                      </div>

                      {task.status === "Pending" ? (
                        <button
                          onClick={() => {
                            togglePopup(task);
                          }}
                          className="btn btn-primary"
                          style={{
                            fontFamily: "Montserrat",
                            marginTop: "20px",
                          }}
                        >
                          View Tasks
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) :  (
        <div style={{textAlign:"center"}}>
          <h2>You haven't joined the company yet!</h2>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
