import React, { useState, useEffect } from "react";
import "./task.css"
import Footercr from "../footer/footercr";
import { useCookies } from "react-cookie";
import Header from "../Headerr/Header";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Table } from "react-bootstrap";
import SidebarMenu12 from "./side1";
import jwt_decode from "jwt-decode";
import axios from "axios";

const ProfilePage = (props) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["employee_token",
  "name",]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [boxVisible, setBoxVisible] = useState(false);
  const API_URL = "http://localhost:8800";
  const handlePursuingClick = () => {
    if (progressWidth < 100) {
      setProgressWidth(progressWidth + 10);
    }
  };
  const handleLogout = () => {
    removeCookie("employee_token");
  };
  const handleBoxClick = () => {
    setBoxVisible(!boxVisible);
  };
 const setemployees=(data)=>{
  setEmployees(data)
  console.log('function',employees)
 }
  const toke = jwt_decode(cookies.employee_token);
  console.log(toke)
  useEffect(() => {
  axios
      .get(`${API_URL}/viewtask`, { withCredentials: true })
      .then((response) => {
        setTasks(
          response.data.tasks.filter((tasks) => tasks.empName === (toke.name) && tasks.status === "Rewarded" )
          
        );
        console.log(response.data.tasks);
      })
      // const red= response.data.tasks.filter((tasks) => tasks.empName == toke.name)
      // console.log(rd)
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
  console.log(tasks);
  useEffect(() => {
    axios
      .get(`${API_URL}/comemps`, { withCredentials: true })
      .then((response) => {
        setemployees(response.data.details.filter((details) => details.Name === toke.name));
       
      })
      .catch((error) => {
        console.log(error);
      });
    },[])
  return (
    <div style={{ height: "auto" }}>
      <header style={{ 
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center'
    }}>  <div style={{display:"flex",position:"relative",bottom:"10px"}}> <SidebarMenu12/></div>
      
      <h1 style={{ 
        margin: '0',
        fontSize: '35px',
        fontWeight: 'bold',
        color: '#0F6292',
        flex: 4,
        textAlign:"center",
        position:"relative",
        left:"30px"
        

      }}>
        Employee Profile</h1>
        
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s" alt="User Avatar" style={{ 
        borderRadius: '50%',
        marginRight: '20px',
        width:"50px",
        height:"50px"

      }} />
      <p style={{ 
        margin: '0',
        fontSize: '16px',
        color: '#777'
      }}>{toke.name}</p>
    </header>
      
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
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
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
          classname="red"
          style={{
            flexDirection: "column",
            position: "relative",
            top: "35px",
            left: "30px",
            flexDirection: "column",
          }}
        >
          <p style={{ display: "inline-block" }}>
            <b style={{ color: "#537FE7", display: "inline" }}>Name : </b> {toke.name}
          </p>

          <p>
            {" "}
            <b style={{ color: "#537FE7" }}> Wallet Address: </b> {toke.wallet}
          </p>
        </div>
        <div>
          <div
            onClick={handleBoxClick}
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
            Token History{" "}
            <IoIosArrowDropdownCircle style={{ fontSize: "30px" }} />
          </div>
        </div>
      </div>
      {boxVisible && (
        <div
          className="Acheivements"
          style={{
            marginLeft: "238px",
            position: "relative",
            top: "55px",
            borderRadius: "20px",
          }}
        >
          <div style={{ textAlign: "center", height: "40px" }}>
            <h6>
              <p
                style={{
                  fontSize: "1.4rem",
                  textAlign: "center",
                  position: "relative",
                  top: "10px",
                  left: "15px",
                }}
              >
                {" "}
                <b style={{ color: "#537FE7", padding: "40px" }}>
                  Token History
                </b>{" "}
              </p>
            </h6>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ color: "#537FE7", textAlign: "center" }}>
                  Company 
                </th>
                <th style={{ color: "#537FE7", textAlign: "center" }}>
                  Rewarded Tasks
                </th>
                <th style={{ color: "#537FE7", textAlign: "center" }}>Completion Date</th>
                {/* <th style={{ color: "#537FE7", textAlign: "center" }}>
                  Deadline
                </th> */}
                <th style={{ color: "#537FE7", textAlign: "center" }}>
                  Tokens Earned
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((token, index) => (
                <tr key={index}>
                  <td align="center">{token.companyName}</td>
                  <td align="center">{token.task}</td>
                  <td align="center">{token.deadline}</td>
                  {/* <td align="center">{token.rating}</td> */}
                  <td align="center">{token.rewards}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <div
        className="card1"
        style={{
          marginLeft: "238px",
          position: "relative",
          top: "50px",
          textAlign: "center",
          borderRadius: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h6>
            <b style={{ fontSize: "1.4rem", color: "#537FE7" }}>INFORMATION</b>
          </h6>{" "}
        </div>
        <hr className="mt-0 mb-4" />
        <div className="row pt-1">
          <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}} >
            <h6 style={{ color: "#537FE7", marginRight: "20px" }}>Name:</h6>
            <p className="text-muted  mb-6">{toke.name}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
            <h6 style={{ color: "#537FE7", marginRight: "20px"  }}>Email:</h6>
            <p className="text-muted mb-6">{toke.email}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
            <h6 style={{ color: "#537FE7", marginRight: "20px"  }}>Phone:</h6>
            <p className="text-muted  mb-6">{toke.mobile}</p>
          </div>

          <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
            <h6 style={{ color: "#537FE7", marginRight: "20px"  }}>Address:</h6>
            <p className="text-muted mb-0">{toke.address}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
            <h6 style={{ color: "#537FE7", marginRight: "20px"  }}>Wallet Address:</h6>
            <p className="text-muted  mb-6">{toke.wallet}</p>
          </div>
          <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
            <h6 style={{ color: "#537FE7", marginRight: "20px"  }}>ID:</h6>
            <p className="text-muted  mb-6">{toke.id}</p>
          </div>
        </div>
        <div style={{ marginTop: "80px" }}>
          <div style={{ textAlign: "center" }}>
            <h6>
              <b
                style={{
                  fontSize: "1.4rem",
                  color: "#537FE7",
                  textAlign: "center",
                }}
              >
                COMPANY
              </b>
            </h6>
          </div>
          <hr className="mt-0 mb-4" />
          {employees.map((emp)=>( <div className="row pt-1">
            <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
              <h6 style={{ color: "#537FE7",marginRight: "20px" }}>Company Name:</h6>
              <p className="text-muted mb-0">{emp.comName}</p>
            </div>
            <div className="col-6 mb-3 d-flex align-items-left" style={{position:"relative",left:"50px"}}>
              <h6 style={{ color: "#537FE7",marginRight: "20px" }}>EmployeeId:</h6>
              <p className="text-muted mb-0">{emp.comId}</p>
            </div>
            </div>))}
         
          </div>
       
      </div>

      <div></div>

      {/* <Footercr/> */}
    </div>
  );
};
export default ProfilePage;