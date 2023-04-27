import React, { useState, useEffect } from "react";
import "./CreateModal.css";
import jwt_decode from "jwt-decode";
import "./css.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
import bg from "./grid3.png";
import stack from "./lay.svg";
import "./real.css";

const CreateModal = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const tokenn = jwt_decode(cookies.access_token);

  const API_URL = "http://localhost:8800";
  const empName = props.match.params.empName;
  const taskk = props.match.params.id;
  console.log(empName);

  const compName = tokenn.name;
  const [task, setTask] = useState(" ");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [rewards, setRewards] = useState(0);
  const reward = async () => {
    const response = await axios.post(
      `${API_URL}/reward/${empName}/${task.task}/${task.deadline}/${task.rewards}`,
      {},
      { withCredentials: true }
    );

    console.log(response.data);
    alert("You have approved the task. Now you can reward the employee");
  };
  const status = task.status;
  const Approval = (taskk) => {
    const confirmed = window.confirm("Do you want to approve this task?");
    if (confirmed) {
      axios
        .put(
          `${API_URL}/updatetask/${taskk._id}`,
          { status: "Approved" },
          { withCredentials: true }
        )
        .then((response) => {
          const updatedTask = response.data.updatedTask;
          console.log(response.data.updatedTask);
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


  const Rejected = (taskk) => {
    // const confirmed = window.confirm("Do you want to Reject this task?");
    // if (confirmed) {
      axios
        .put(
          `${API_URL}/updatetaskkk/${taskk._id}`,
          { status: "Pending"},
          { withCredentials: true }
        )
        .then((response) => {
          const updatedTask = response.data.updatedTask;
          console.log("vanakam da ",response.data.updatedTask);
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
    // }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/gettask/${taskk}`, { withCredentials: true })
      // make a GET request to the server
      .then((response) => {
        //console.log(response.data.user);
        setTask(response.data.task);
        console.log("mm", task);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [empName]);

  return (
    <div style={{ backgroundImage: `url(${stack})`, height: "800px" }}>
      <div className="me">
        <div
          className="modal-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <header
            style={{
              backgroundColor: "#69C5FA",
              padding: "1.5rem 0",
              height: "100px",
              color: "#F2F2F2",
              width: "100%",
            }}
          >
            <div
              className="sidejs"
              style={{ position: "relative", bottom: "20px", right: "600px" }}
            >
              <SidebarMenu />
            </div>
            <h2
              className="heading"
              style={{
                fontFamily: "Secular One",
                fontSize: "2.5rem",
                marginBottom: "1.5rem",
                color: "black",
                textAlign: "center",
                textTransform: "uppercase",
                position: "relative",
                bottom: "60px",
              }}
            >
              VIEW TASK
            </h2>
          </header>

          <div
            className="mer5"
            style={{
              backgroundImage: `url(${bg})`,
              height: "900px",
              boxShadow: "-3px 5px 28px 1px rgba(0,0,0,0.74) inset",
              backgroundColor: "#BFF1EE",
              display: "flex",
              flexDirection: "column",
              marginTop: "60px",
              height: "500px",
              width: "1000px",
            }}
          >
            <br />

            <br />
            <div className="Productdet">
              <div style={{ fontFamily: "Secular One" }}> Employee Name : </div>
              <div style={{ fontWeight: "1000", fontFamily: "Secular One" }}>
                {task.empName}
              </div>

              <div style={{ fontFamily: "Secular One" }}>Category : </div>
              <div style={{ fontWeight: "1000", fontFamily: "Secular One" }}>
                {task.task}
              </div>

              <div style={{ fontFamily: "Secular One" }}>Task Name : </div>
              <div style={{ fontWeight: "1000", fontFamily: "Secular One" }}>
                {task.taskName}
              </div>

              <div style={{ fontFamily: "Secular One" }}>
                Task Description:{" "}
              </div>
              <div style={{ fontWeight: "1000", fontFamily: "Secular One" }}>
                {" "}
                {task.taskDescription}
              </div>

              <div style={{ fontFamily: "Secular One" }}>Deadline : </div>
              <div style={{ fontWeight: "1000", fontFamily: "Secular One" }}>
                {task.deadline}
              </div>

              <div style={{ fontFamily: "Secular One" }}>
                Completion Date :{" "}
              </div>
              <div style={{ fontWeight: "1000", fontFamily: "Secular One" }}>
                {task.completion}
              </div>

              <div style={{ fontFamily: "Secular One" }}>
                <p style={{ fontFamily: "Secular One" }}>Status:</p>
              </div>
              <div>
                {" "}
                <p
                  style={{
                    color: task.status === "Completed" ? "green" : "red",
                    fontWeight: "1000",
                    fontFamily: "Secular One",
                  }}
                >
                  {task.status}
                </p>
              </div>
            </div>
            {status === "Waiting For Approval" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "30px",
                }}
              >
                <Link to={`/real`}>
                  <button
                    className="btttn"
                    style={{
                      backgroundColor: "#00FA57",
                      color: "#F2F2F2",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",

                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 1.0)",
                      marginTop: "240px",
                      marginLeft: "20px",
                      fontFamily: "Secular One",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#330078";
                      // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                      e.target.style.boxShadow = " 1px 0px 19px 5px #ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#00FA57";
                      e.target.style.border = "none";
                      e.target.style.boxShadow = "none";
                    }}
                    onClick={() => {
                      reward();
                      Approval(task);
                    }}
                  >
                    Approve
                  </button>
                </Link>
                <Link to={`/real`}>
                <button
                  className="btttn2"
                  style={{
                    backgroundColor: "#E53E3E",
                    color: "#F2F2F2",
                    borderRadius: "5px",
                    padding: "0.5rem 2rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0,1.0)",
                    marginTop: "240px",
                    marginLeft: "140px",
                    marginRight: "5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#330078";
                    e.target.style.boxShadow = "1px 0px 19px 5px #ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#E53E3E";
                    e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0,1.0)";
                  }}
                  onClick={Rejected(task)}>
                  Reject
                </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        {/* <br />
    <br />
    
    <br />
  
    <br />
    <br />
    <br />
    <br />
    <br /> */}
        {/* <div className="head2" style={{ fontFamily: "Axiforma" }}>
      Copyright &copy; 2023 | Asset Warranty
    </div> */}
      </div>
    </div>
  );
};

export default CreateModal;
