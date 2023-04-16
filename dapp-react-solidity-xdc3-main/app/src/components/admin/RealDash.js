import React, { useState, useEffect, useContext } from "react";
import { FaSignOutAlt, FaSquare } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
} from "recharts";

import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import styles from "./dash.module.css";
import bg from "./lay.svg";
import "./real.css";
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
  // const dataa = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  // const dataa = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  // const getIntroOfPage = (label) => {
  //   if (label === 'Page A') {
  //     return "Page A is about men's clothing";
  //   }
  //   if (label === 'Page B') {
  //     return "Page B is about women's dress";
  //   }
  //   if (label === 'Page C') {
  //     return "Page C is about women's bag";
  //   }
  //   if (label === 'Page D') {
  //     return 'Page D is about household goods';
  //   }
  //   if (label === 'Page E') {
  //     return 'Page E is about food';
  //   }
  //   if (label === 'Page F') {
  //     return 'Page F is about baby food';
  //   }
  //   return '';
  // };

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload[0].value}`}</p>
  //         <p className="intro">{getIntroOfPage(label)}</p>
  //         <p className="desc">Anything you want can be displayed here.</p>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

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
    const rewardedTasks = Alltasks.filter(
      (task) => task.status === "Rewarded"
    ).length;
    const PendingApprovals = tasks.filter(
      (task) => task.status === "Waiting For Approval"
    ).length;
    const TaskIncentive = Alltasks.filter(
      (task) => task.status === "Approved"
    ).length;
    const Assignedtasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;
    const data = [
      { name: "Waiting for approval", value: PendingApprovals },
      { name: "Assigned Tasks", value: Assignedtasks },
      { name: "Rewarded Tasks", value: rewardedTasks },
      { name: "Total Tasks", value: Alltasks.length },
    ];
    const COLORS = ["red", "#F3DA06", "black", "green"];

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
        <div style={{ backgroundColor: "#F9F8F8" }}>
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
                  height: "100px",
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "0px",
                  marginLeft: "-350px",
                  backgroundColor: "#00F1C3",
                  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",
                }}
              >
                {/* <div
                className={styles.span}
                style={{ marginLeft: "80px", backgroundColor: "#00F1C3" }}
              >
                <div
                  style={{
                    marginTop: "0px",
                    marginLeft: "-900px",
                    backgroundColor: "#00F1C3",
                  }}
                > */}
                <div style={{ marginTop: "10px", marginLeft: "60px" }}>
                  <SidebarMenu />
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "60px",
                    fontFamily: "Algeria",
                    fontSize: "30px",
                  }}
                >
                  <b
                    style={{
                      fontFamily: "Algeria",
                      fontWeight: "1000",
                      fontSize: "40px",
                    }}
                  >
                    {tokenn.name.toUpperCase()}
                  </b>
                </div>
                <button
                  onClick={balanceOf}
                  className="btn btn-primary"
                  style={{
                    margin: "1rem",
                    marginLeft: "500px",
                    marginTop: "30px",
                    borderRadius: "20px",
                    height: "50px",
                    backgroundColor: "#1196B0",
                    width: "130px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0,1.0) inset",
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "-600px",
                  marginTop: "60px",
                }}
              ></div>

              <div
                className="row"
                style={{ marginTop: "0px", marginLeft: "-330px" }}
              >
                <div className="col-md-4">
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",
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
                <div className="col-md-4">
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",
                      border: "0px",
                      backgroundColor: "#F3DA06",
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
                        Assigned Tasks
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",
                      border: "0px",
                      backgroundColor: "red",
                      width:"380px"
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
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ul
                  style={{
                    marginTop: "-300px",
                    fontSize: "30px",
                    marginLeft: "-180px",
                    fontFamily: "Montserrat",
                    fontWeight: "1000",
                  }}
                >
                  TASKS
                </ul>
                <div style={{ marginRight: "-70px" }}>
                  <p style={{ marginLeft: "-10px", fontFamily: "Algeria", fontWeight:"1000" }}>
                    TOTAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "green", color: "green" }}
                    />
                  </p>
                  <p style={{ marginLeft: "-10px", fontFamily: "Algeria",fontWeight:"1000" }}>
                    ASSIGNED :{" "}
                    <FaSquare
                      style={{ color: "#F3DA06", backgroundColor: "#F3DA06" }}
                    />
                  </p>
                  <p style={{ marginLeft: "-10px", fontWeight:"1000",fontFamily: "Algeria" }}>
                    APPROVAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "red", color: "red" }}
                    />
                  </p>

                  <p style={{ marginLeft: "-10px", fontWeight:"1000",fontFamily: "Algeria" }}>
                    REWARDED :{" "}
                    <FaSquare
                      style={{ backgroundColor: "black", color: "black" }}
                    />
                  </p>
                </div>

                <PieChart
                  style={{
                    width: "430px",
                    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",
                    marginLeft: "-310px",
                  }}
                  width={800}
                  height={400}
                >
                  <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    style={{ color: "black" }}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>

                {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataa}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
     
    */}
              </div>

              <div className="row mt-">
                <div
                  className="col-md-10 "
                  style={{
                    marginTop: "-400px",
                    marginLeft: "130px",
                    height: "200px",
                  }}
                >
                  <div
                    className="card"
                    style={{
                      boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
                      // backgroundColor: "#CAFFF5",
                      marginBottom: "40px",
                      height: "400px",
                    }}
                  >
                    <h5
                      className="card-header font-weight-bold"
                      style={{
                        textAlign: "center",
                        fontFamily: "Algeria",
                        padding: "20px",
                        // backgroundColor: "#CAFFF5",
                        color: "black",
                        fontWeight: "1000",
                        fontSize: "20px",
                      }}
                    >
                      EMPLOYEES
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
                          style={{ maxHeight: "220px", overflowY: "auto" }}
                        >
                          {filteredEmployees.map((employee) => (
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
                                      fontFamily: "Algeria",
                                      marginTop: "20px",
                                      fontWeight: "1000",
                                      position: "relative",
                                      right: "25px",
                                      marginLeft: "0px",
                                      fontSize: "18px",
                                      height: "10px",
                                    }}
                                  >
                                    {employee.Name.toUpperCase()}
                                    <b style={{ fontSize: "16px" }}>
                                      ({employee.comId})
                                    </b>
                                  </h6>
                                  {/* <small style={{ fontWeight: "1000"}}>
                                  <div style={{marginTop:"10px"}}>
                                  {employee.comId}</div>
                                </small> */}
                                  <div>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: "8px",
                                        height: "8px",
                                        background:
                                          employee.condition === "online"
                                            ? "green"
                                            : "red",
                                        borderRadius: "50%",
                                        position: "relative",
                                        left: "315px",
                                        bottom: "40px",
                                        marginLeft: "180px",
                                        marginTop: "30px",
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
                                      fontFamily: "Algeria",
                                      marginTop: "-10px",
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
                    marginLeft: "-320px",
                    width: "1290px",
                    height: "560px",
                  }}
                >
                  <div
                    className="card"
                    style={{
                      boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
                      // backgroundColor: "#17A2B8",
                      marginBottom: "40px",
                      width: "845px",
                      height:"400px"
                    }}
                  >
                    <h5
                      className="card-header font-weight-bold"
                      style={{
                        textAlign: "center",
                        fontFamily: "Algeria",
                        padding: "20px",
                        // backgroundColor: "#17A2B8",
                        color: "black",
                        fontWeight: "1000",
                        fontSize: "20px",
                      }}
                    >
                      ASSIGNED TASKS
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
                          style={{ maxHeight: "220px", overflowY: "auto" }}
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
                                      fontFamily: "Algeria",
                                      marginTop: "20px",
                                      fontWeight: "1000",
                                      fontSize: "18px",
                                    }}
                                  >
                                    {task.empName.toUpperCase()}
                                  </h6>
                                  <small
                                    style={{
                                      fontWeight: "1000",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    {task.task}
                                  </small>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                  <p
                                    style={{
                                      display: "inline-block",
                                      marginRight: "10px",
                                      fontWeight: "1000",
                                      marginLeft: "200px",
                                      marginTop: "30px",
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
                                    fontFamily: "Algeria",
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                <ul
                  style={{
                    marginTop: "-300px",
                    fontSize: "30px",
                    marginLeft: "-0px",
                    fontFamily: "Montserrat",
                    fontWeight: "1000",
                  }}
                >
                  TASKS
                </ul>
                <div style={{ marginRight: "-0px" }}>
                  <p style={{ marginLeft: "-10px", fontFamily: "Algeria", fontWeight:"1000" }}>
                    TOTAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "green", color: "green" }}
                    />
                  </p>
                  <p style={{ marginLeft: "-10px", fontFamily: "Algeria",fontWeight:"1000" }}>
                    ASSIGNED :{" "}
                    <FaSquare
                      style={{ color: "#F3DA06", backgroundColor: "#F3DA06" }}
                    />
                  </p>
                  <p style={{ marginLeft: "-10px", fontWeight:"1000",fontFamily: "Algeria" }}>
                    APPROVAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "red", color: "red" }}
                    />
                  </p>

                  <p style={{ marginLeft: "-10px", fontWeight:"1000",fontFamily: "Algeria" }}>
                    REWARDED :{" "}
                    <FaSquare
                      style={{ backgroundColor: "black", color: "black" }}
                    />
                  </p>
                </div>
                  
                  <PieChart style={{width:"430px",boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3) inset",marginLeft:"860px", marginTop:"-440px"}} width={800} height={400} >
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          style={{color:"black"}}
        >   
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        
        </Pie> 
        <Tooltip/>
      </PieChart>
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
