import React, { useState, useEffect, useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import styles from "./dash.module.css";
import {
  FaBars,
  FaUserPlus,
  FaTasks,
  FaGift,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { abi } from "../../artifacts/contracts/ERSC/erc.sol/ERC.json";
import { erc as address } from "../../output.json";

import SidebarMenu from "./side.js";
const {
  executeTransaction,
  queryData,
  log,
  EthereumContext,
} = require("react-solidity-xdc3");

function AdminDashBoard() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [Alltasks, setAllTasks] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const { provider, erc } = useContext(EthereumContext);
  console.log("sample", erc);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);

  const history = useHistory();
  // const [open, setOpen] = useState(false);
  const tokenn = jwt_decode(cookies.access_token);
  console.log(tokenn);
  const API_URL = "http://localhost:8800";
  // const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const togglePopup = () => {
    setOpen(true);
  };
  const [task, setTask] = useState([]);
  const handleLogout = () => {
    removeCookie("access_token");
  };
  const regCompany = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let companyaddress = tokenn.wallet.replace("xdc", "0x");
    let companyname = tokenn.name;

    let resp = await executeTransaction(erc, provider, "regCompany", [
      companyaddress,
      companyname,
    ]);
    log("Registered company", "hash", resp.txHash);
    setSubmitting(false);
  };

  const mint = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // let to = tokenn.wallet.replace("xdc", "0x");
    let to = "0xced4b32fa8745f1de58a96555803d9724c637af8";
    let amount = "20";
    console.log(amount);

    let resp = await executeTransaction(erc, provider, "mint", [to, amount]);
    log("mint ", "hash", resp.txHash);
    setSubmitting(false);
  };
  const sendReward = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // let to = tokenn.wallet.replace("xdc", "0x");
    let employeeaddress = "0xced4b32fa8745f1de58a96555803d9724c637af8";
    let amount = "1";
    console.log(amount);

    let resp = await executeTransaction(erc, provider, "sendReward", [
      employeeaddress,
      amount,
    ]);
    log("reward ", "hash", resp.txHash);
    setSubmitting(false);
  };

  const getCompanyEmployees = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    let companyaddress = tokenn.wallet.replace("xdc", "0x");
    // let companyaddress = "9fe6366315d0dfebd2fee73fdcc638806a1fc2c8";

    let respp = await queryData(erc, provider, "getCompanyEmployees", [
      companyaddress,
    ]);
    log("Registered company", "hash", respp);
    alert(respp);
    setSubmitting(false);
  };

  const isCompanyRegistered = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let companyaddress = tokenn.wallet.replace("xdc", "0x");
    let response1 = await queryData(erc, provider, "isCompanyRegistered", [
      companyaddress,
    ]);
    log("submitClaim", "hash", response1);
    setSubmitting(false);
  };

  const balanceOf = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    let account = tokenn.wallet.replace("xdc", "0x");
    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()} tokens`);

    setSubmitting(false);
  };

  useEffect(() => {
    const token = cookies.access_token;

    if (token) {
      const decoded = jwt_decode(token);
      if (!decoded.isAdmin) {
        alert("Your account will be verified soon.");
        window.location.replace("/logincomp");
        return;
      }
    } else {
      // Handle case where token is not present
    }

    axios
      .get(`${API_URL}/comemps`, { withCredentials: true })
      .then((response) => {
        setEmployees(response.data.details);
        console.log(response.data.details);
      })
      .catch((error) => {
        console.log(error);
      });
    // }, []);

    axios
      .get(`${API_URL}/gettasks`, { withCredentials: true })
      .then((response) => {
        setAllTasks(response.data.tasks);
        setTasks(
          response.data.tasks.filter(
            (tasks) =>
              tasks.status === "Pending" ||
              tasks.status === "Waiting For Approval"
          )
        );
        console.log(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (cookies.access_token && jwt_decode(cookies.access_token).isAdmin) {
    const filteredEmployees = employees.filter((employee) => {
      console.log(employee.isOnboarded);

      return (
        employee.comName === tokenn.name &&
        employee.Onboard === false && // Check if employee's company name matches tokenn's company name
        (employee.Name.toLowerCase().includes(search.toLowerCase()) || // Check if employee's name includes the search term
          employee.comId.toString().includes(search)) // Check if employee's company name includes the search term
      );
    });

    const OnboardedEmployees = filteredEmployees.length;

    const PendingApprovals = tasks.filter(
      (task) => task.status === "Waiting For Approval"
    ).length;
    const TaskIncentive = Alltasks.filter(
      (task) => task.status === "Approved"
    ).length;
    const Assignedtasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    const filteredTasks = tasks.filter((task) => {
      return (
        task.companyName === tokenn.name &&
        task.isPending === true &&
        // Check if employee's company name matches tokenn's company name
        (task.task.toLowerCase().includes(search.toLowerCase()) || // Check if employee's name includes the search term
          task.empName.toString().includes(search)) // Check if employee's company name includes the search term
      );
    });

    console.log("noice", employees);
    return (
      <div>
        <div className="row">
          {/* <div
          style={{
            borderRadius: "20px",
            boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
          }}
        > */}

          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div
              style={{
                height: "150px",
                display: "flex",
                flexDirection: "row",
                marginTop: "0px",
                marginLeft: "-350px",
                backgroundColor: "#00F1C3",
              }}
            >
              <div
                className={styles.span}
                style={{ marginLeft: "80px", backgroundColor: "#00F1C3" }}
              >
                <div
                  style={{
                    marginTop: "0px",
                    marginLeft: "-1000px",
                    backgroundColor: "#00F1C3",
                  }}
                >
                  <SidebarMenu />
                </div>
                <div
                  style={{
                    marginTop: "-60px",
                    marginLeft: "370px",
                    fontFamily: "Montserrat",
                    fontSize: "30px",
                    fontWeight: "1000",
                  }}
                >
                  {" "}
                  WELCOME {tokenn.name.toUpperCase()}'s ADMIN
                  <button
                    onClick={balanceOf}
                    className="btn btn-primary"
                    style={{
                      margin: "1rem",
                      marginLeft: "100px",
                      marginTop: "-0px",
                      borderRadius: "20px",
                      height: "60px",
                      backgroundColor: "red",
                    }}
                  >
                    <FaSignOutAlt /> Balance
                  </button>
                  {/* <Link to="/logincomp">
              <button
                onClick={handleLogout}
                className="btn btn-primary"
                style={{ margin: "1rem", marginLeft: "300px" }}
              >
                <FaSignOutAlt /> Log Out
              </button>
            </Link> */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "-600px",
                marginTop: "60px",
              }}
            >
              {/* <button
          onClick={getCompanyEmployees}
          className="btn btn-primary"
          style={{ margin: "1rem", marginLeft: "300px" }}
        >
          <FaSignOutAlt /> employees added by you
      </button> */}
              {/* <button
                onClick={regCompany}
                className="btn btn-primary"
                style={{ margin: "1rem", marginLeft: "100px" }}
              >
                <FaSignOutAlt /> Register in blockchain
              </button>
              <button
                onClick={isCompanyRegistered}
                className="btn btn-primary"
                style={{ margin: "1rem", marginLeft: "100px" }}
              >
                <FaSignOutAlt /> Is company registered?
              </button>
              <button
                onClick={sendReward}
                className="btn btn-primary"
                style={{ margin: "1rem", marginLeft: "100px" }}
              >
                <FaSignOutAlt /> Reward Employee
              </button>
              <button
                onClick={mint}
                className="btn btn-primary"
                style={{ margin: "1rem", marginLeft: "100px" }}
              >
                <FaSignOutAlt /> Reward
              </button> */}
            </div>

            <div
              className="row"
              style={{ marginTop: "40px", marginLeft: "-300px" }}
            >
              <div className="col-md-3">
                <div
                  className="card"
                  style={{
                    color: "white",
                    height: "150px",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
                    border: "0px",
                    backgroundColor: "#17A2B8",
                  }}
                >
                  <div className={styles.txt} style={{ marginTop: "20px" }}>
                    <h3>
                      <b
                        style={{
                          marginLeft: "90px",
                          marginTop: "680px",
                          fontSize: "70px",
                          marginLeft: "",
                        }}
                      >
                        {OnboardedEmployees}
                      </b>
                    </h3>
                    <FaUser
                      style={{
                        marginLeft: "200px",
                        marginTop: "-120px",
                        height: "70px",
                        width: "80px",
                        opacity: "0.5",
                      }}
                    />
                    <br />
                    <div style={{ marginTop: "-20px", marginLeft: "10px" }}>
                      Total Onboarded Employees
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="card"
                  style={{
                    color: "white",
                    height: "150px",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
                    border: "0px",
                    backgroundColor: "#28A745",
                  }}
                >
                  <div className={styles.txt} style={{ marginTop: "20px" }}>
                    <h3>
                      <b
                        style={{
                          marginLeft: "90px",
                          marginBottom: "100px",
                          marginLeft: "",
                          fontSize: "70px",
                        }}
                      >
                        {Assignedtasks}
                      </b>
                    </h3>
                    <FaHome
                      style={{
                        marginLeft: "200px",
                        marginTop: "-120px",
                        height: "70px",
                        width: "80px",
                        opacity: "0.5",
                      }}
                    />
                    <br />
                    <div style={{ marginTop: "-20px", marginLeft: "10px" }}>
                      Total Assigned Tasks
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="card"
                  style={{
                    color: "white",
                    height: "150px",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
                    border: "0px",
                    backgroundColor: "#FFC107",
                  }}
                >
                  <div className={styles.txt} style={{ marginTop: "20px" }}>
                    <h3>
                      <b
                        style={{
                          marginLeft: "90px",
                          marginBottom: "100px",
                          marginLeft: "-0px",
                          fontSize: "70px",
                        }}
                      >
                        {PendingApprovals}
                      </b>
                    </h3>
                    <FaHome
                      style={{
                        marginLeft: "200px",
                        marginTop: "-120px",
                        height: "70px",
                        width: "80px",
                        opacity: "0.5",
                      }}
                    />
                    <br />
                    <div style={{ marginTop: "-20px", marginLeft: "10px" }}>
                      Pending for Approval
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <a style={{ textDecoration: "none" }} href="/reward">
                  <div
                    className="card"
                    style={{
                      color: "white",
                      border: "0px",
                      backgroundColor: "#DC3545",
                      height: "150px",
                      marginLeft: "",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div className={styles.txt} style={{ marginTop: "20px" }}>
                      <h3>
                        <b
                          style={{
                            marginLeft: "0px",
                            marginTop: "30px",
                            marginBottom: "-100px",
                            fontSize: "70px",
                          }}
                        >
                          {TaskIncentive}
                        </b>
                      </h3>
                      <FaHome
                        style={{
                          marginLeft: "200px",
                          marginTop: "-120px",
                          height: "70px",
                          width: "80px",
                          opacity: "0.5",
                        }}
                      />
                      <br />
                      <div style={{ marginTop: "-20px", marginLeft: "10px" }}>
                        Pending For Task Incentive
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="row mt-">
              <div
                className="col-md-10 "
                style={{ marginTop: "50px", marginLeft: "-290px" }}
              >
                <div
                  className="card"
                  style={{
                    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3)",
                    // backgroundColor: "#CAFFF5",
                    marginBottom: "40px",
                  }}
                >
                  <h5
                    className="card-header font-weight-bold"
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      padding: "20px",
                      // backgroundColor: "#CAFFF5",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    Employees
                  </h5>
                  <div className={`${styles.cardBody}`}>
                    <div className={`${styles.inputGroup} mb-3`}>
                      <input
                        type="text"
                        className={`${styles.formControl} form-control`}
                        placeholder="Search by Name or Company ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div
                        className={`${styles.inputGroupAppend} input-group-append`}
                      ></div>
                    </div>
                    <div
                      className={`${styles.listGroup} list-group`}
                      id="employee-list"
                    >
                      <div
                        className="list-group"
                        style={{ maxHeight: "1350px", overflowY: "auto" }}
                      >
                        {employees.map((employee) => (
                          <div
                            key={employee.comId}
                            className="list-group-item"
                            style={{
                              backgroundColor: "#0000",
                              border: "0.1px solid black",
                            }}
                          >
                            <div className="d-flex justify-content"></div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6
                                  className="font-weight-bold mb-0"
                                  style={{
                                    fontFamily: "Montserrat",
                                    marginTop: "20px",
                                    fontWeight: "1000",
                                    position: "relative",
                                    right: "25px",
                                  }}
                                >
                                  {employee.Name}
                                </h6>
                                <small style={{ fontWeight: "1000" }}>
                                  {employee.comId}
                                </small>
                                <div>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "8px",
                                      height: "8px",
                                      background: employee.condition === "online" ? "green" : "red",
                                      borderRadius: "50%",
                                      position:"relative",
                                      left:"315px",
                                      bottom:"40px"
                                    }}
                                  ></span>

                                  <small
                                    style={{
                                      position: "relative",
                                      left: "320px",
                                      bottom: "39px",
                                      fontWeight: "bolder",
                                      fontSize: "1rem",

                                    }}
                                  >
                                    {" "}
                                    {employee.condition}{" "}
                                  </small>
                                </div>
                              </div>
                              <Link
                                to={`/assigntask/${employee.Name}/${tokenn.name}/${employee.Wallet}`}
                              >
                                <button
                                  className="btn btn-primary"
                                  onClick={togglePopup}
                                  style={{
                                    fontFamily: "Montserrat",
                                    marginTop: "7px",
                                    fontWeight: "1000",
                                  }}
                                >
                                  Assign Tasks
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-8"
                style={{
                  marginTop: "50px",
                  marginLeft: "-300px",
                  width: "1290px",
                  height: "629px",
                }}
              >
                <div
                  className="card"
                  style={{
                    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3)",
                    // backgroundColor: "#17A2B8",
                    marginBottom: "40px",
                    width: "845px",
                  }}
                >
                  <h5
                    className="card-header font-weight-bold"
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      padding: "20px",
                      // backgroundColor: "#17A2B8",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    Pending Tasks
                  </h5>
                  <div className={`${styles.cardBody}`}>
                    <div className={`${styles.inputGroup} mb-3`}>
                      <input
                        type="text"
                        className={`${styles.formControl} form-control`}
                        placeholder="Search by Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div
                        className={`${styles.inputGroupAppend} input-group-append`}
                      ></div>
                    </div>
                    <div
                      className={`${styles.listGroup} list-group`}
                      id="employee-list"
                    >
                      <div
                        className="list-group"
                        style={{ maxHeight: "1350px", overflowY: "auto" }}
                      >
                        {filteredTasks.map((task) => (
                          <div
                            key={task.task}
                            className="list-group-item"
                            style={{
                              // backgroundColor: "#DDDDD2",
                              border: "0.1px solid black",
                            }}
                          >
                            <div className="d-flex justify-content"></div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6
                                  className="font-weight-bold mb-0"
                                  style={{
                                    fontFamily: "Montserrat",
                                    marginTop: "20px",
                                    fontWeight: "1000",
                                  }}
                                >
                                  {task.empName}
                                </h6>
                                <small style={{ fontWeight: "1000" }}>
                                  {task.task}
                                </small>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <p
                                  style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    fontWeight: "1000",
                                  }}
                                >
                                  Status:
                                </p>
                                <p
                                  style={{
                                    display: "inline-block",
                                    color: "#ff0000",
                                    fontWeight: "1000",
                                  }}
                                >
                                  <b>{task.status}</b>{" "}
                                </p>
                              </div>
                              <button
                                className="btn btn-primary"
                                style={{
                                  fontFamily: "Montserrat",
                                  marginTop: "20px",
                                  fontWeight: "1000",
                                }}
                                onClick={() => {
                                  history.push(`/viewtask/${task._id}`);
                                }}
                              >
                                View Tasks
                              </button>
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
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default AdminDashBoard;
