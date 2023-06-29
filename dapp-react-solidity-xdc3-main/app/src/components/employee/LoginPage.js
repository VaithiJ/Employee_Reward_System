import React, { useState } from "react";
import axios from "../url.js"
import { Link } from "react-router-dom";
import RegisterHeader from "../header/registerheader";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import "../../App.css";
import employeeImage from "./employees.png";
import styles from "../openPage/openpage.module.css";
import reg from "../openPage/r5.svg";
import "./reg.css";
import g from "../admin/w3.svg";
import empImg from "../../image/employee.jpg";
import "../../App.css";
import { FaHome } from "react-icons/fa";
import "./task.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Swal from "sweetalert2";


export default function SignInPage() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const backgroundGradient = {
    background: "#FFFFFF)",
    height: "10%",
    width: "100%",
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/login`,
        { name, password },
        { withCredentials: true }
      );
      Swal.fire({

        icon: 'success',

        title: 'Login Successful!',

        text: '',

        confirmButtonColor: "#9A1B56",
        showConfirmationButton: false

      });
      window.location.href = '/employeehome'
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
        alert(errorMessage)
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Incorrect password");
        alert(errorMessage)

      } else {
        setErrorMessage("Invalid name or password");
        alert(errorMessage)

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
        ></div>
        <div>
          <Link to="/">
            <FaHome
              className="fah"
              style={{
                marginLeft: "-1300px",
                marginTop: "-250px",
                width: "110px",
                height: "40px",
                color: "black",
              }}
            />
          </Link>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "-20px" }}>
            <img
              className="loginnclass"
              // style={{height:"20px", width:"10px"}}
              src={employeeImage}

            />
            <p
              className="ftnn"
              style={{ fontSize: "18px", paddingTop: "30px", marginTop: "350px", marginLeft: "-300px" }}
            >
              <b className="ftnn" style={{ fontFamily: "Secular One", marginTop: "-390px" }}>
                Unlock Your Potential <br /> Login to Your <b style={{ fontFamily: "Secular One", color: "red" }}>Employee</b> Portal
                <br /> TODAY!!!
              </b>
            </p>

            <form
              className="formemp"
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
                  fontFamily: "Secular One",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                Login
              </h2>
              <p>
                <label style={{ fontFamily: "Secular One", fontWeight: "bolder" }}>USERNAME</label>
                <br />
                <input
                  className="ftn"
                  type="text"
                  title="name"
                  value={name}
                  style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </p>
              <p>
                <label style={{ fontFamily: "Secular One", fontWeight: "bolder" }}>PASSWORD</label>
                <Link to="/forget-password">
                  <label className="right-label" style={{ fontFamily: "Secular One", fontWeight: "bold" }}>Forget password?</label>
                </Link>
                <br />
                <input
                  className="ftn"
                  type={showPassword ? 'text' : 'password'}
                  title="Password"
                  value={password}
                  style={{ fontFamily: "Secular One", fontWeight: "bold" }}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    style={{
                      position: "relative",
                      left: "100px",
                      top: "5px",
                      transform: "translateY(-250%)",
                      cursor: "pointer",
                      height: "10%",
                      width: "10%"
                    }}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <AiOutlineEye
                    style={{
                      position: "relative",
                      left: "100px",
                      top: "5px",
                      transform: "translateY(-250%)",
                      cursor: "pointer",
                      height: "10%",
                      width: "10%"
                    }}
                    onClick={togglePasswordVisibility}
                  />
                )}
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
                  <Link to="/register" style={{
                    color: "#146C94",
                    // textDecoration: "underline",
                    // textDecorationColor: "red",
                    fontFamily: "Secular One",
                    fontWeight: "bolder",
                  }}>Create an account</Link>.
                </p>
                <p style={{ textAlign: "center" }}>
                  <Link to="/" style={{
                    color: "#146C94",
                    // textDecoration: "underline",
                    // textDecorationColor: "red",
                    fontFamily: "Secular One",
                    fontWeight: "bolder",
                  }}>Back to Homepage</Link>.
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
