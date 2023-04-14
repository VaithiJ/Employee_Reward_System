import React, { useState, useEffect, useContext } from "react";
import { FaBell, FaUser, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import styles from "../admin/dash.module.css";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import SidebarMenu12 from "./side1";
import { Link } from "react-router-dom";
const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

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
  const [balanceToken, setBalanceToken] = useState();
  const [open, setOpen] = useState(false);
  const togglePopup = (task) => {
    setSelectedTasks(task);
    setOpen(true);
  };
  const balanceOf = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let account = toke.wallet.replace("xdc", "0x");
    console.log(account);

    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()}`);

    setSubmitting(false);
  };

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
              { completion: date },
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
  const [compemployees, setcompemployees] = useState([]);

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
        const userData = response.data.user.filter(
          (user) => user.name === toke.name
        );
        setEmployees(userData);
        console.log("mm", userData);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/comemps`, { withCredentials: true })
      .then((response) => {
        const empdata = response.data.details.filter(
          (details) => details.Name === toke.name
        );
        setcompemployees(empdata);
        console.log("compemployees", empdata);
      })
      .catch((error) => {
        console.log(error);
      });

    // here is the online profile update
    axios
      .put(
        `${API_URL}/condition/${toke.name}`,
        { condition: "online" },
        { withCredentials: true }
      )
      .then((response) => {
        const condition = response.data.UpdatedCondition;
        console.log(response.data.UpdatedCondition);
      });
  }, []);

  console.log("name stored in token", toke.name);

  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);
  console.log("sample", erc);

  const [showBox, setShowBox] = useState(false);

  const handleClick = () => {
    setShowBox(!showBox);
  };
  const handleClose = () => {
    setShowBox(false);
  };
  console.log(tasks);
  const status = tasks.status;
  const onboarded = employees && employees[0] && employees[0].isOnboarded;

  console.log("vanakam", onboarded);

  const getTextColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ED2B2A";
      case "Waiting For Approval":
        return "#F99417";
      case "Approved":
        return "#16FF00";
      case "Rewarded":
        return "#865DFF";
      default:
        return "black"; // Default color if status is not recognized
    }
  };

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
          <SidebarMenu12 />
        </div>
        <button
          onClick={balanceOf}
          className="btn btn-primary"
          style={{
            margin: "1rem",
            marginLeft: "-100px",
            position: "relative",
            top: 0,
            right: 40,
          }}
        >
          Check balance
        </button>

        <h1
          style={{
            color: "white",
            fontFamily: "Montserrat",
            textAlign:"center",
            position:"relative",
            right:"150px"
            
          }}
        >
          Employee Dashboard
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", left: "170px" }}>
            
            
          </div>
          <div>
            <FaBell
              onClick={handleClick}
              style={{
                color: "white",
                position: "relative",
                zIndex: 1,
                height: "35px",
                width: "35px",
                top: "4px",
              }}
            />
            {onboarded ? (
              <p
                style={{
                  color: "#FFFFFF",
                  position: "relative",
                  top: "-45px",
                  right: "-30px",
                  background: "#FF0000",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  textAlign: "center",
                }}
              ></p>
            ) : null}

            {showBox && (
              <div>
                {compemployees.map((comp) => (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                      padding: "16px",
                      position: "absolute",
                      top: "100px",
                      right: "0px",
                      zIndex: 2,
                    }}
                  >
                    <FaTimes
                      onClick={handleClose}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        cursor: "pointer",
                      }}
                    />
                    {onboarded ? (
                      <p
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow: "2px 2px 5px grey",
                          background: "#f2f2f2",
                        }}
                      >
                        You have been Onboarded by {comp.comName}
                      </p>
                    ) : null}
                    {pendingTasks !== "0" ? (
                      <p
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          borderRadius: "10px",
                          boxShadow: "2px 2px 5px grey",
                          background: "#f2f2f2",
                        }}
                      >
                        You have been assigned with {pendingTasks} tasks
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
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
          count={Approved}
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
            // marginLeft: "auto",
            position:"relative",
            right:"-50px"
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
                      <div style={{ textAlign: "left" }}>
                        <h6
                          className="font-weight-bold mb-0"
                          style={{
                            fontFamily: "Montserrat",
                            marginTop: "20px",
                          }}
                        >
                          <b>
                            {task.task.toUpperCase()}{" "}
                            {/* Convert task.task to uppercase */}
                          </b>
                        </h6>

                        <small>Deadline: {task.deadline}</small>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: "4px",
                          boxShadow: "0 3px 8px rgba(0,0,0,0.3)", // updated boxShadow with rgba for a more realistic effect
                          width: "auto",
                          height: "40px",
                          alignItems: "center",
                          textAlign: "center",
                          background:
                            "#FEFBE9", 
                            position:"relative",
                            top:"10px"
                        }}
                      >
                        <p
                          style={{
                            marginRight: "10px",
                            fontFamily: "Montserrat",
                            position: "relative",
                            top: "7px",
                            color: "#000000", // updated text color
                          }}
                        >
                          Status:
                        </p>
                        <p
                          style={{
                            marginBottom: "0",
                            color: getTextColor(task.status),
                            textAlign: "center",
                            fontFamily: "Montserrat",
                            fontWeight: "bold", // updated font weight for better readability
                            textTransform: "uppercase", // updated text transform to uppercase for a more stylish look
                          }}
                        >
                          {task.status}
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
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>You haven't joined the company yet!</h2>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
