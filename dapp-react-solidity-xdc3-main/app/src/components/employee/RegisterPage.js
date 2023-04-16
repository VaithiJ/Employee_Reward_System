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
import g from "../admin/g.svg"
import empImg from "../../image/employee.jpg"
import { FaHome } from "react-icons/fa";


export default function Register() {
  const API_URL = "http://localhost:8800";
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(" ");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState(" ");
  const [DOJ, setDOJ] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [wallet, setWallet] = useState("");
  const history = useHistory();

  const handleRegister = async (event) => {
    event.preventDefault();
    

    try {
     
      const response = await axios.post(`${API_URL}/register`, {
        name,
        mobile,
        address,
        DOJ,
        password,
        email,
        wallet,
      })
      console.log("hiighji")
      console.log(response.data);
      history.push("/login");
    } catch (error) {
      console.log("wrongyyyy")
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${g})` }}>
      {/* <Loginheader12 /> */}
      <div
        className={styles.image_cont}
        id="empp"
        style={{ marginLeft:"200px" , marginRight:"100px"}}
      >
        <div
          className="col-md-18 mx-auto my-auto text-left"
          style={{
            width: "100%",
            
          }}
        >
                    <p style={{fontSize:"40px",paddingTop:"30px" }}><b style={{fontFamily:"Noto Serif"}}>Be Part of the Future - Register with Blockchain and Unlock Your Employee Rewards!</b></p>
                    <Link to="/"><FaHome style={{marginLeft:"-1300px", marginTop:"-250px", width:"110px", height:"40px", color:"black"}}/></Link>

          <div style={{display:"flex", flexDirection:"row"}}>
                    <img src={employeeImage} style={{width:"400px", height:"450px", marginLeft:"-100px", marginTop:"50px"}}/>

          <form
            onSubmit={handleRegister}
            style={{
              marginLeft: "200px",
              borderRadius: "50px",
              marginBottom: "100px",
              boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3) inset",
              
            }}
          >
            <div style={{ textAlign: "center", margin: "auto" }}>
              <div>
                <h2 style={{fontFamily:"Montserrat", fontSize:"28px", fontWeight:"bold"}}>JOIN US</h2>
                <h5 style={{fontFamily:"Montserrat", fontSize:"20px",fontWeight:"bold"}}>CREATE YOUR USER ACCOUNT</h5>
              </div>
            </div>
            <div style={{ color: "black" }}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    placeholder="User Name"
                    className="form-control"
                    value={name}
                    title="User Name"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    title="comEmail"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    placeholder="Mobile"
                    className="form-control"
                    value={mobile}
                    title="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    title="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                        type="date"
                        title="Date of Joining"
                        placeholder="DOJ"
                        className="form-control"
                        value={DOJ}
                        onChange={(e) => setDOJ(e.target.value)}
                        required
                      />
                  </div>

                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    title="Address"
                    placeholder="address"
                    className="form-control"
                    value={address}
                    
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="wallet address"
                    className="form-control"
                    placeholder="Wallet Address"
                    value={wallet}
                    title="wallet"
                    onChange={(e) => setWallet(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <div style={{ marginLeft: "110px" }}>
                    <label
                      className="form-check-label"
                      style={{ color: "black" , marginLeft:"30px"}}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={checkbox}
                        onChange={(e) => setCheckbox(e.target.checked)}
                        required
                        style={{marginLeft:"-20px"}}
                      />
                      I_agree_to_the_terms_and_conditions
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginLeft: "0px" }}
              >
                Register
              </button>
              <div style={{ marginTop: "30px", marginRight: "130px" }}>
                <p className="forgot-password text-right">
                  Already registered <Link to="/login">log in?</Link>
                </p>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const HeaderStyle = {
  backgroundImage: "url(/assets/images/register-bg.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  height: "100vh",
};
