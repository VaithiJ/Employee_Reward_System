import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../url.js"


import { useHistory } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import NavBar from "../Headerr/Header.js";
import "../../App.css";
import "../admin/reg.css"


// const API_URL = "http://localhost:8800";

export default function OwnerLogin() {
  const [comName, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const backgroundGradient = {
    background: "#FFFFFF",
    height: "100%",
    width: "100%",
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `/logincomp`,
        {
          comName,
          password,
        },
        { withCredentials: true }
      );
      //  setMessage(response.data.message)

      //  console.log(response.data);

      // Redirect to admin page on successful login


      // Swal.fire({

      //    icon: 'success',

      //   title: 'Login successful!',

      //    text: 'You are now logged in.',

      //    confirmButtonColor:"#9A1B56"

      //    })
      window.location.href = '/real'
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
    <div style={{ height: "20px" }}>
      <div  >
        <div className="text-center m-5-auto" style={{ marginTop: "-10px" }}>
          <p
            className="sec"
            style={{ fontSize: "36px", paddingTop: "30px", marginLeft: "60px" }}
          >
            <b style={{ fontFamily: "Secular One" }}></b>
          </p>
          <NavBar/>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "-100px" }}
          >
            {/* <img
              className="cmplg"
              src={companyImage}
              style={{
                width: "450px",
                height: "500px",
                marginLeft: "170px",
                marginTop: "30px",
              }}
            /> */}
            {/* <p
              style={{
                borderRadius: "10px",
                fontFamily: "Secular One",
                paddingTop: "20px",
                padding: "20px",
                marginTop: "450px",
                marginLeft: "-480px",
                height: "150px",
                fontSize: "18px"
              }}
            >
              Securely Connect to Your Business  <br />
              Login to Your Blockchain-Enabled <b style={{ fontFamily: "Secular One", color: "red" }}>Company</b> Portal Now!
            </p> */}
            <form className="formm1" onSubmit={handleLogin}>
  <h2 className="style-0">Sign in </h2>
  <h2 className="head">Stay updated on your professional world </h2>
  <div className="input-container22">
    <input
      type="text"
      title="name"
      className="input-container22-input"
      value={comName}
      onChange={(e) => setname(e.target.value)}
      placeholder="Company Name"
      required
    />
  </div>
  <div className="input-container23">
    <br />
    <div className="input-container23">
      <input
        type={showPassword ? 'text' : 'password'}
        title="Password"
        className="input-container22-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {showPassword ? (
        <AiOutlineEyeInvisible
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <AiOutlineEye
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  </div>
  <div>
    <button type="submit" className="submit1">Login</button>
  </div>
  <footer className="footer">
    <p className= "ff"> No Account? 
    <p className="signup-link">
      <Link to="/registercompany">Create an account</Link>.
    </p>
    </p>
  </footer>
</form>


          </div>
          {message && <p>{message}</p>}
        </div>

        {/* <Footer /> */}
      </div>
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
