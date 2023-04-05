import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import styles from "./dash.module.css";
import swal from "sweetalert";
// import { FaBars,FaUserPlus, FaTasks, FaGift } from "react-icons/fa";
import SidebarMenu from "./side.js";
import {
  FaBars,
  FaUserPlus,
  FaTasks,
  FaGift,
  FaHome,
  FaUser,
} from "react-icons/fa";

function AdminDashBoard() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [users, setusers] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLinkClick = () => {
    setShowMenu(false);
    toggleMenu();
    console.log(showMenu);
  };

  const tokenn = jwt_decode(cookies.access_token);
  const API_URL = "http://localhost:8800";

  useEffect(() => {
    axios
      .get(`${API_URL}/empdetails`, { withCredentials: true })
      .then((response) => {
        setEmployees(response.data.user);
        setusers(
          response.data.user.filter((user) => user.isOnboarded === false)
        );
        console.log("redd", response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("red", users);
  const filteredEmployees = employees.filter((employee) => {
    console.log(employee.isOnboarded);
    return (
      employee.isOnboarded === false &&
      (employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee._id.toString().includes(search))
    );
  });

  return (
    <div>
      <div className="row">
        <div style={{backgroundColor:"#00F1C3"}}>
        <div className="col-md-3">
          
          <div
            style={{ marginTop: "40px", marginLeft: "20px", display: "flex" }}
          >
            <SidebarMenu />
          </div>
        </div>
        <div
            className={styles.span}
            style={{
              fontSize: "2.9em",
              // fontFamily: "Roboto Condensed",
              marginLeft: "-70px",
              marginTop:"-50px"
            }}
          >
            WELCOME {tokenn.name.toUpperCase()}'s ADMIN
          </div>
          </div>
        <div className="col-md-9">
          
          <div
            className="row"
            style={{ marginTop: "40px", marginLeft: "-280px" }}
          >
           
            <div className="row justify-content-center">
              <div className="col-md-3" style={{marginLeft:"600px"}}>
                <div
                  className="card"
                  style={{
                    color: "white",
                    height: "150px",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)",
                    border: "0px",
                    backgroundColor: "#FFC107",
                    margin: "auto" /* centers horizontally */,
                    
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
                        {users.length}
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
                      Total Users
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-3"> */}
            {/* <div
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
                      20
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
                    Deleted
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          </div>
          <div className="row mt-">
            <div
              className="col-md-11 "
              style={{ marginTop: "50px", marginLeft: "225px" }}
            >
              <div
                className="card"
                style={{
                  boxShadow: "0px 0px 10px 15px rgba(0,0,0,0.3)",
                  backgroundColor: "#fff",
                }}
              >
                <h5
                  className="card-header font-weight-bold"
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontFamily: "Montserrat",
                    padding: "20px",
                  }}
                >
                  Employee Onboarding
                </h5>
                <div className={`${styles.cardBody}`}>
                  <div className={`${styles.inputGroup} mb-3`}>
                    <input
                      type="text"
                      className={`${styles.formControl} form-control`}
                      placeholder="Search by Name or Register ID"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <div
                      className={`${styles.inputGroupAppend} input-group-append`}
                    >
                      <button
                        className={`${styles.btn} btn-primary` }
                        type="button"
                      >
                        Search
                      </button>
                    </div> */}
                  </div>
                  <div
                    className={`${styles.listGroup} list-group`}
                    id="employee-list"
                  >
                    <div
                      className={styles.listGroup}
                      style={{ maxHeight: "1050px", overflowY: "auto" }}
                    >
                      {filteredEmployees.map((employee) => (
                        <div
                          key={employee._id}
                          className="list-group-item"
                          style={{
                            backgroundColor: "#fff",
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
                                  marginTop: "15px",
                                }}
                              >
                                {employee.name}
                              </h6>
                              <small>{employee._id}</small>
                            </div>
                            <Link to={`/empprofile/${employee._id}`}>
                              <button className="btn btn-primary">
                                View Profile
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashBoard;
