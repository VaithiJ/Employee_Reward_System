import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import reg from "../../components/openPage/r5.svg"
import companyImage from "../openPage/comp1.png"
import g from "./g.svg"
import styles from "../openPage/openpage.module.css"

import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import { FaHome } from "react-icons/fa";


import "../../App.css";
import "./reg.css";

import Loginheader12 from "../header/comploginheader";

const API_URL = "http://localhost:8800";

export default function SignInPage() {
  const [comName, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const backgroundGradient = {
    background: "#FFFFFF",
    height: "100%",
    width: "100%",
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/logincomp`,
        {
          comName,
          password,
        },
        { withCredentials: true }
      );
      //  setMessage(response.data.message)

      //  console.log(response.data);

      // Redirect to admin page on successful login
      history.push("/real");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 404) {
        // User not found
        setErrorMessage("name not found");
      } else if (error.response && error.response.status === 400) {
        // Incorrect password
        setErrorMessage("Incorrect password");
      } else {
        // Other error
        setErrorMessage("An error occurred");
      }
      const alertMessage = errorMessage || "Invalid Credentials";
      alert(alertMessage);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${g})` }}>
   
  

        <div className="text-center m-5-auto" style={{marginTop:"-10px"}}>
        <p style={{fontSize:"36px",paddingTop:"30px", marginLeft:"60px" }}><b style={{fontFamily:"Secular One"}}>Securely Connect to Your Business - Login to Your Blockchain-Enabled Company Portal Now!</b></p>
                    <Link to="/"><FaHome style={{marginLeft:"-1250px", marginTop:"-230px", width:"110px", height:"40px",  color:"black"}}/></Link>

          <div style={{display:"flex", flexDirection:"row", marginTop:"-100px"}}>
        <img src={companyImage} style={{width:"500px", height:"550px", marginLeft:"70px", marginTop:"50px"}}/>
          <form onSubmit={handleLogin} style={{height:"500px",marginTop:"120px",marginLeft:"245px",marginRight:"50px",marginBottom:"100px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",borderRadius:"20px", backgroundColor:"transparent"}}>
            <h2 className={styles.txt} style={{marginLeft:"70px", marginTop:"30px", fontSize:"30px", fontFamily:"Secular One"}}>Login</h2>
            <p>
              <label>Company Name</label>
              <br />
              <input
                type="text"
                title="name"
                value={comName}
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
              </button> 
            </p>
            <footer>
              <p style={{fontFamily:"Secular One"}}>
                <Link to="/registercompany" style={{fontFamily:"Secular One"}}>
                  {" "}
                  First time? Create an account
                </Link>
                .
              </p>
              <p style={{fontFamily:"Secular One"}}>
                <Link to="/"style={{fontFamily:"Secular One"}}>Back to Homepage</Link>.
              </p>
            </footer>
          </form>
          </div>
          {message && <p>{message}</p>}
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
