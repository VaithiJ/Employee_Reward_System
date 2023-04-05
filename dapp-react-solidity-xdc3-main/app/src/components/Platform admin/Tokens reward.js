import React, { useState, useEffect , useContext} from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
const { executeTransaction, EthereumContext, log, queryData } = require('react-solidity-xdc3');


const PlatformAdmin = () => {
  //   const handleRemove = (index) => {
  //     setData((prevData) => prevData.filter((_, i) => i !== index));
  //   };

  const API_URL = "http://localhost:8800";
  const [companies, setCompanies] = useState([]);
  const [updatecompanies, setupdatecompanies] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);
  console.log("sample", erc)
  useEffect(() => {
    axios
      .get(`${API_URL}/admin`, { withCredentials: true })
      .then((response) => {
        setCompanies(response.data.comp12);
        console.log(response.data.comp12);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
const regCompany = async(event, company) =>{
      // event.preventDefault();
    
            setSubmitting(true);
          let companyaddress = company.walletAddress.replace("xdc","0x");
          let companyname = company.comName;
      
          let resp = await executeTransaction(erc,provider,"regCompany",[companyaddress, companyname]);
          log("Registered company","hash", resp.txHash)
          setSubmitting(false);
      }

  const Verify = async(comp) => {

    
    const confirmed = window.confirm(
      "Approve this Company?"
    );
    if (confirmed) {
      axios
        .put(
          `${API_URL}/verifycom/${comp._id}`,
          { isAdmin: true },
          { withCredentials: true }
        )
        .then((response) => {

          const compp = response.data.savedUser;
          window.location.reload();
          console.log("red", response.data.savedUser);
          // update tasks state
          setupdatecompanies(
            Array.isArray(compp)
              ? compp.map((t) => {
                  if (t._id === comp._id) {
                    window.location.reload();
                    console.log("m")
                    return compp;
                  } else {
                    window.location.reload();
                    console.log("m")
                    return t;
                    
                  }
                })
              : []
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendToCompany = async(event, company) =>{
    event.preventDefault();
    setSubmitting(true);
    // let to = tokenn.wallet.replace("xdc", "0x");
    let companyaddress = company.walletAddress.replace("xdc","0x");
    let amount = "20";
    console.log(amount)

    let resp = await executeTransaction(erc,provider,"sendToCompany",[amount,companyaddress]);
    log("sending to company ","hash", resp.txHash)
    setSubmitting(false);
  }
  

  return (
    <div style={{ textAlign: "center", overflowX: "auto" }}>
      <h1
        style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Platform Admin
      </h1>
      <div
        style={{
          margin: "0 auto",
          width: "1000px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          overflow: "hidden",
          height: "auto",
        }}
      >
        <table style={{ minWidth: "100%", height: "auto" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "1rem" }}>Company Name</th>
              <th style={{ padding: "1rem" }}>Wallet Address</th>
              <th style={{ padding: "1rem" }}>Reward</th>
              <th style={{ padding: "1rem" }}>Verify</th>
              <th style={{ padding: "1rem" }}>Register</th>
            </tr>
          </thead>
          <tbody>
          {companies.map((company, index) => {
              const admin = company.isAdmin;
              console.log(admin)
              return (
              <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "1rem" }}>{company.comName}</td>
                <td style={{ padding: "1rem" }}>{company.walletAddress}</td>
                <td style={{ padding: "1rem" }}>
                  
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                      fontSize:"1rem"
                    }}
                    onClick={(e) => sendToCompany(e, company)} 
                  >
                    Give Tokens
                  </button>
                </td>
                <td style={{ padding: "1rem" }}>
                  {admin ? <p style={{color:"#00FF00"}}><b> VERIFIED </b> </p> : (
                  <button
                    onClick={() => Verify(company)}
                    style={{
                      backgroundColor: "#00FFFF",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Verify
                  </button>
                  
                  
                )} 
                </td>
                <td style={{ padding: "1rem" }}>
                 
                  <button
                    onClick={(e) => regCompany(e,company)}
                    style={{
                      backgroundColor: "#00FFFF",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Register
                  </button>
                  
                  
                
                </td>
          
              </tr>
          )})}
          </tbody>
                  
        </table>
      </div>
    </div>
  );
};

export default PlatformAdmin;
