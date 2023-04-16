import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RegisterHeader from "../header/registerheader";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import "../../App.css";
import employeeImage from "./employees.png";
import styles from "../openPage/openpage.module.css";
import reg from "../openPage/r5.svg";
import "./reg.css";
import g from "../admin/g.svg";
import empImg from "../../image/employee.jpg";
import "../../App.css";
import { FaHome } from "react-icons/fa";


const API_URL = "http://localhost:8800";

export default function SignInPage() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const backgroundGradient = {
    background: "#FFFFFF)",
    height: "10%",
    width: "100%",
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { name, password },
        { withCredentials: true }
      );
      history.push("/employeehome");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect password");
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <div style={{ backgroundImage: `url(${g})` }}>
      <div
        className={styles.image_cont}
        id="empp"
        style={{ marginLeft: "200px", marginRight: "100px" }}
      >      

        <div
          className="col-md-18 mx-auto my-auto text-left"
          style={{
            width: "100%",
          }}
        >
          
          <p style={{fontSize:"40px",paddingTop:"30px" }}><b style={{fontFamily:"Noto Serif"}}>Unlock Your Potential - Login to Your Employee Portal<br/> TODAY!!!</b></p></div>
          <div><Link to="/"><FaHome style={{marginLeft:"-1300px", marginTop:"-250px", width:"110px", height:"40px", color:"black"}}/></Link>
          <div style={{ display: "flex", flexDirection: "row" }}>
            
            <img
              src={employeeImage}
              style={{
                width: "400px",
                height: "450px",
                marginLeft: "-100px",
                marginTop: "50px",
              }}
            />

            <form
              style={{
                margin: "auto",
                borderRadius: "50px",
                marginRight: "150px",
                marginTop: "100px",
                marginBottom: "100px",
                boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
                backgroundColor: "transparent",
              }}
              onSubmit={handleLogin}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                Login
              </h2>
              <p>
                <label>Username</label>
                <br />
                <input
                  type="text"
                  title="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </p>
              <p>
                <label>Password</label>
                <Link to="/forget-password">
                  <label className="right-label">Forget password?</label>
                </Link>
                <br />
                <input
                  type="password"
                  title="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </p>
              <p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginLeft: "10px" }}
                >
                  Login
                </button>{" "}
              </p>

              {message && <p>{message}</p>}
              <footer>
                <p style={{ textAlign: "center" }}>
                  <Link to="/register"> First time? Create an account</Link>.
                </p>
                <p style={{ textAlign: "center" }}>
                  <Link to="/">Back to Homepage</Link>.
                </p>
              </footer>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
const HeaderStyle = {
  width: "100%",
  height: "150vh",

  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
