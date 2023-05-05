import React, { useState, useEffect, useContext } from "react";
import { FaSignOutAlt, FaSquare } from "react-icons/fa";
import AdminButton from "./AdminButton.js";
import { AiFillStar } from "react-icons/ai";
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
import { momentLocalizer } from "react-widgets";
import moment from "moment";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
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
// import {Calendar} from "react-calendar"
import SidebarMenu from "./side.js";
import { isSameDay } from "date-fns";
import del from "../Platform admin/tokkk.png";
const {
  executeTransaction,
  queryData,
  log,
  EthereumContext,
} = require("react-solidity-xdc3");

function RealDash(connect) {
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
  // const localizer = momentLocalizer(moment);
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
  function isCurrentDate(date, currentDate) {
    return isSameDay(date, currentDate);
  }
  const [dateState, setDateState] = React.useState(new Date());
  const [markedDates,setMarkedDates]= React.useState([]);
  // const [markedDates, setMarkedDates] = React.useState([
  //   '01/01/2023',
  //   '14/02/2023',
  //   '17/04/2023'
  // ]);

  const changeDate = (date) => setDateState(date);

  const [showModal, setShowModal] = React.useState(false);
  // const [modalContent, setModalContent] = React.useState("");

  const [selectedTasks, setSelectedTasks] = React.useState(null);

  const handleClick = (tasks) => {
    setShowModal(true);
    setSelectedTasks(tasks);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const tasks = markedDates.filter(
        (task) => task.deadline === formattedDate
      );
      if (tasks.length > 0) {
        return (
          <AiFillStar
            onClick={() => handleClick(tasks)}
            style={{
              position: "relative",
              height: "15px",
              width: "15px",
              bottom: "13px",
              color: "#FF6000",
            }}
          />
        );
      }
    }
  };
  // ction tileContent({ date, view }) {
  //   if (view === 'month' && markedDates.some(d => isSameDay(d, date))) {
  //     return (
  //       <div className="marker">
  //         <BsFillStarFill style={{color:"yellow",width:"12px",height:"12px"}}/>
  //       </div>
  //     );
  //   }
  // }

  // function isSameDay(a, b) {
  //   return a.getFullYear() === b.getFullYear() &&
  //     a.getMonth() === b.getMonth() &&
  //     a.getDate() === b.getDate();
  // }

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
    Swal.fire({
      iconHtml: `<img src=${del} style="height: 100px; width: 100px;">`,

      title: "Account Balance",

      text: `${balance.toString()}`,

      confirmButtonColor: "#9A1B56",
    });

    setSubmitting(false);
  };

  useEffect(() => {
    const token = cookies.access_token;
    localStorage.setItem("WalletAddress", tokenn.wallet.replace("xdc", "0x"));

    if (token) {
      const decoded = jwt_decode(token);
      if (!decoded.isAdmin) {
        Swal.fire({
          icon: "error",

          title: "Account not verified!",

          text: "Your account will be verified soon",

          confirmButtonColor: "#9A1B56",
        });
        history.push("/logincomp");
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
        const ree= response.data.tasks.filter((tasks)=> tasks.deadline)
        console.log(ree)
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
  const currentDate = new Date();
  console.log("Iniki date enanda", currentDate);
  const re = Alltasks.filter((task) => task.companyName === tokenn.name).length;
  console.log("ell tasks um ", re);
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

    const OnboardedEmployees = employees.length;
    const rewardedTasks = Alltasks.filter(
      (task) => task.status === "Rewarded" && task.compName === tokenn.name
    ).length;
    const PendingApprovals = tasks.filter(
      (task) =>
        task.status === "Waiting For Approval" &&
        task.companyName === tokenn.name
    ).length;
    const TaskIncentive = Alltasks.filter(
      (task) => task.status === "Approved" && task.companyName === tokenn.name
    ).length;
    const Assignedtasks = tasks.filter(
      (task) => task.status === "Pending" && task.companyName === tokenn.name
    ).length;
    const everytasks = tasks.filter(
      (task) =>
        task.status === "Pending" ||
        (task.status === "Approved" && task.companyName === tokenn.name)
    ).length;
    const data = [
      { name: "Waiting for approval", value: PendingApprovals },
      { name: "Assigned Tasks", value: Assignedtasks },
      { name: "Rewarded Tasks", value: rewardedTasks },
      { name: "Total Tasks", value: re },
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
                className="hea"
                style={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "0px",
                  marginLeft: "-350px",
                  backgroundColor: "white",
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
                <div
                  className="sidee"
                  style={{ marginTop: "10px", marginLeft: "20px" }}
                >
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
                    className="del"
                    style={{
                      fontFamily: "Secular One",
                      fontWeight: "1000",
                      fontSize: "40px",
                      marginLeft: "-40px",
                    }}
                  >
                    {tokenn.name.toUpperCase()}
                  </b>
                </div>
                <button
                  onClick={balanceOf}
                  className="buy"
                  style={{
                    // margin: "1rem",
                    marginLeft: "700px",
                    marginTop: "30px",
                    borderRadius: "10px",
                    height: "45px",

                    backgroundColor: "#1196B0",
                    width: "120px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#330078";
                    // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#1196B0";
                  }}
                >
                  <div
                    style={{
                      marginTop: "-5px",
                      fontSize: "18px",
                      fontFamily: "Secular One",
                    }}
                  >
                    Balance
                  </div>
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
                style={{ marginTop: "0px", marginLeft: "-340px" }}
              >
                <div className="col-md-4">
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
                      border: "0px",
                      backgroundColor: "white",
                      width: "430px",
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
                            fontFamily: "Secular One",
                            color: "#1196B0",
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
                          color: "#1196B0",
                        }}
                      />
                      <br />
                      <div
                        style={{
                          marginTop: "-20px",
                          color: "#1196B0",
                          marginLeft: "10px",
                          fontFamily: "Secular One",
                        }}
                      >
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
                      boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
                      border: "0px",
                      backgroundColor: "white",
                      width: "420px",
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
                            fontFamily: "Secular One",
                            color: "#F3DA06",
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
                          color: "#F3DA06",
                        }}
                      />
                      <br />
                      <div
                        style={{
                          color: "#F3DA06",
                          marginTop: "-20px",
                          marginLeft: "10px",
                          fontFamily: "Secular One",
                        }}
                      >
                        Assigned Tasks
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4" style={{ marginLeft: "-20px" }}>
                  <div
                    className="card"
                    style={{
                      color: "white",
                      height: "150px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.3) inset",
                      border: "0px",
                      backgroundColor: "white",
                      width: "410px",
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
                            fontFamily: "Secular One",
                            color: "red",
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
                          color: "red",
                        }}
                      />
                      <br />
                      <div
                        style={{
                          color: "red",
                          marginTop: "-20px",
                          marginLeft: "10px",
                          fontFamily: "Secular One",
                        }}
                      >
                        Pending for Approval
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="piee"
                style={{ display: "flex", alignItems: "center" }}
              >
                <ul
                  style={{
                    marginTop: "-300px",
                    fontSize: "20px",
                    marginLeft: "-170px",
                    fontFamily: "Montserrat",
                    fontWeight: "1000",
                    fontFamily: "Secular One",
                  }}
                >
                  TASKS
                </ul>
                <div className="piee" style={{ marginRight: "-50px" }}>
                  <p
                    style={{
                      marginLeft: "-10px",
                      fontFamily: "Algeria",
                      fontWeight: "1000",
                    }}
                  >
                    TOTAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "green", color: "green" }}
                    />
                  </p>
                  <p
                    style={{
                      marginLeft: "-10px",
                      fontFamily: "Algeria",
                      fontWeight: "1000",
                    }}
                  >
                    ASSIGNED :{" "}
                    <FaSquare
                      style={{ color: "#F3DA06", backgroundColor: "#F3DA06" }}
                    />
                  </p>
                  <p
                    style={{
                      marginLeft: "-10px",
                      fontWeight: "1000",
                      fontFamily: "Algeria",
                    }}
                  >
                    APPROVAL :{" "}
                    <FaSquare
                      style={{ backgroundColor: "red", color: "red" }}
                    />
                  </p>

                  <p
                    style={{
                      marginLeft: "-10px",
                      fontWeight: "1000",
                      fontFamily: "Algeria",
                    }}
                  >
                    REWARDED :{" "}
                    <FaSquare
                      style={{ backgroundColor: "black", color: "black" }}
                    />
                  </p>
                </div>

                <PieChart
                  className="pie"
                  style={{
                    width: "430px",
                    boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.3) inset",
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
              </div>

              <div className="roww">
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
                      boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.3) inset",
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
                        padding: "10px",
                        // backgroundColor: "#CAFFF5",
                        color: "black",
                        fontWeight: "1000",
                        fontSize: "20px",
                        fontFamily: "Secular One",
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
                          style={{
                            padding: "5px",
                            maxHeight: "220px",
                            overflowY: "auto",
                          }}
                        >
                          {filteredEmployees.map((employee) => (
                            <div
                              key={employee.comId}
                              className="list-group-item"
                              style={{
                                padding: "2px",
                                backgroundColor: "#0000",
                                border: "0.1px dotted black",
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
                                      fontSize: "16px",
                                      height: "10px",
                                      fontFamily: "Secular One",
                                    }}
                                  >
                                    {employee.Name.toUpperCase()}
                                    <b
                                      style={{
                                        fontWeight: "800",
                                        fontSize: "14px",
                                        fontFamily: "Secular One",
                                      }}
                                    >
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
                                        left: "200px",
                                        bottom: "40px",
                                        marginLeft: "180px",
                                        marginTop: "30px",
                                      }}
                                    ></span>

                                    <small
                                      style={{
                                        position: "relative",
                                        left: "200px",
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
                                  to={`/awardpage/${employee.Name}/${tokenn.name}/${employee.Wallet}`}
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={togglePopup}
                                    style={{
                                      fontFamily: "Algeria",
                                      marginTop: "-10px",
                                      fontWeight: "000",
                                      fontFamily: "Secular One",
                                      position: "relative",
                                      left: "110px",
                                      color: "blue",
                                      backgroundColor: "white",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = "blue";
                                      e.target.style.color = "white";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = "white";
                                      e.target.style.color = "blue";
                                    }}
                                  >
                                    Award
                                  </button>
                                </Link>
                                <Link
                                  to={`/assigntask/${employee.Name}/${tokenn.name}/${employee.Wallet}`}
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={togglePopup}
                                    style={{
                                      fontFamily: "Algeria",
                                      marginTop: "-10px",
                                      fontFamily: "Secular One",
                                      color: "blue",
                                      backgroundColor: "white",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.background = "blue";
                                      e.target.style.color = "white";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.background = "white";
                                      e.target.style.color = "blue";
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
                    marginTop: "230px",
                    marginLeft: "-320px",
                    width: "1290px",
                    height: "560px",
                  }}
                >
                  {" "}
                  <div className="modal-container">
                    {showModal && selectedTasks && (
                      <div className="card222">
                        <b
                          style={{
                            position: "relative",
                            bottom: "100px",
                            left: "150px",
                            fontSize: "1.4rem",
                          }}
                          onClick={handleClose}
                        >
                          X
                        </b>
                        {selectedTasks.map((task) => (
                          <div
                            key={task.task}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              border: "1px solid black",
                              padding: "5px",
                              margin: "5px 0",
                            }}
                          >
                            <p style={{ margin: "0 10px" }}>{task.empName}</p>

                            <p style={{ margin: "0 10px" }}>{task.task}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <Calendar
                      className="my-calendar"
                      value={dateState}
                      onChange={changeDate}
                      tileContent={tileContent}
                    />
                  </div>
                  <div
                    className="cardd"
                    style={{
                      boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.3) inset",
                      // backgroundColor: "#17A2B8",
                      marginBottom: "40px",
                      width: "845px",
                      height: "400px",
                      marginLeft: "450px",
                      marginTop: "-430px",
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
                        fontFamily: "Secular One",
                        paddingBottom: "1px",
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
                          style={{
                            padding: "2px",
                            maxHeight: "220px",
                            overflowY: "auto",
                          }}
                        >
                          {filteredTasks.map((task) => (
                            <div
                              key={task.task}
                              className="list-group-item"
                              style={{
                                // backgroundColor: "#DDDDD2",
                                border: "0.1px dotted black",
                                padding: "2px",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-left">
                                <div>
                                  <h6
                                    className="font-weight-bold mb-0"
                                    style={{
                                      fontFamily: "Algeria",
                                      marginTop: "20px",
                                      fontWeight: "1000",
                                      fontSize: "16px",
                                      fontFamily: "Secular One",
                                    }}
                                  >
                                    {task.empName.toUpperCase()}
                                  </h6>
                                  <small
                                    style={{
                                      fontWeight: "1000",
                                      // marginLeft: "20px",
                                      fontFamily: "Secular One",
                                      fontSize: "14px",
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
                                    color: "blue",
                                    backgroundColor: "white",
                                  }}
                                  onClick={() => {
                                    history.push(`/viewtask/${task._id}`);
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = "blue";
                                    e.target.style.color = "white";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = "white";
                                    e.target.style.color = "blue";
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
                  <div className="calender-employee">
                    <div
                      style={{
                        position: "relative",
                        top: "20px",
                        width: "500px",
                        paddingRight: "50px",
                        position: "relative",
                        left: "50px",
                        top: "60px",
                      }}
                    >
                      <>
                        {/* <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p> */}
                      </>
                      {/* <Calendar
        style={{
          height: '400px',
          backgroundColor: 'white',
          position: 'relative',
          top: '150px',
          fontFamily: 'Montserrat',
          fontSize: '16px',
          color: 'black',
          fontWeight: 'bold',
          lineHeight: '1.5',
        }}
        value={currentDate}
        tileClassName={({ date }) =>
          isCurrentDate(date, currentDate) ? 'current-date' : ''
        }
        tileContent={tileContent}
      /> */}
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
export default RealDash;
