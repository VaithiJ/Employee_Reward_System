import React, { useState, useEffect, useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import jet from "./jet.gif";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
  queryEvents,
} = require("react-solidity-xdc3");

const PlatformAdmin = () => {
  //   const handleRemove = (index) => {
  //     setData((prevData) => prevData.filter((_, i) => i !== index));
  //   };

  const API_URL = "http://localhost:8800";
  const [companies, setCompanies] = useState([]);
  const [updatecompanies, setupdatecompanies] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { provider, erc } = useContext(EthereumContext);

  console.log("sample", erc);
  console.log(provider);
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
  const regCompany = async (event, company) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      let companyaddress = company.walletAddress.replace("xdc", "0x");
      let companyname = company.comName;
      console.log(erc);

      // Register the company
      let resp = await executeTransaction(erc, provider, "regCompany", [
        companyaddress,
        companyname,
      ]);
      log("Registered company", "hash", resp.txHash);

      // Check console for confirmation message
      console.log("Please approve this company.");

      // Wait for user to confirm in console
      let consoleConfirmation = await new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          if (console.log.toString().includes("Company approved.")) {
            clearInterval(interval);
            resolve(true);
          }
        }, 1000);
      });

      // If user confirmed, approve the company
      if (consoleConfirmation) {
        axios
          .put(
            `${API_URL}/verifycom/${company._id}`,
            { isAdmin: true },
            { withCredentials: true }
          )
          .then((response) => {
            const compp = response.data.savedUser;
            window.location.reload();
            console.log("red", response.data.savedUser);

            // Update tasks state
            setupdatecompanies(
              Array.isArray(compp)
                ? compp.map((t) => {
                    if (t._id === company._id) {
                      window.location.reload();
                      console.log("m");
                      return compp;
                    } else {
                      window.location.reload();
                      console.log("m");
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

      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const sendToCompany = async (event, company) => {
    event.preventDefault();
    setSubmitting(true);

    // Replace the "xdc" with "0x" in the company's wallet address
    let companyAddress = company.walletAddress.replace("xdc", "0x");
    console.log("kasdlkaskdajsld", companyAddress);

    // Define the amount to be sent
    let amount = "20";
    console.log(amount);

    // try {
    // Execute the transaction
    let resp = await executeTransaction(erc, provider, "sendToCompany", [
      amount,
      companyAddress,
    ]);

    // Log the transaction hash
    console.log("sending to company", "hash", resp.txHash);

    // Listen to the Transfer event emitted by the ercContract instance
    // erc.events.Transfer({
    //   filter: { from: myAddress, to: companyAddress },
    //   fromBlock: 0
    // })
    // .on('data', function(event) {
    //   console.log(`Token sent to ${company.name} with transaction hash: ${resp.txHash}`);
    // })
    // .on('error', function(error) {
    //   console.error(error);
    // });
    // erc.events.Transfer({}, (error, event) => {
    //   if (!error) {
    //     console.log(event.returnValues);
    //   } else {
    //     console.error(error);
    //   }
    // });
    // } catch(error) {
    //    console.error(error);
    // }
    //   erc.events.Transfer({
    //   // filter: { from: myAddress, to: companyAddress },
    //   fromBlock: 0
    // })
    // .on('data', function(event) {
    //   console.log(`Token sent to ${company.name} with transaction hash: `);
    // })
    // .on('error', function(error) {
    //   console.error(error);
    // });
    // erc.events.Transfer({}, (error, event) => {
    //   if (!error) {
    //     console.log(event.returnValues);
    //   } else {
    //     console.error(error);
    //   }
    // });

    setSubmitting(false);
  };

  const transfer = async () => {
    let events = await queryEvents(erc, provider, "Transfer", 47600814);
    console.log(events);
    console.log("asassadas");
  };

  const balanceOf = async (event, company) => {
    event.preventDefault();
    setSubmitting(true);
    console.log(company);
    let account = company.walletAddress.replace("xdc", "0x");
    console.log(account);
    let balance = await erc.balanceOf(account);

    console.log(`Account balance: ${balance.toString()}`);
    alert(`Account balance: ${balance.toString()}`);

    setSubmitting(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#2051E9",
        textAlign: "center",
        overflowX: "auto",
      }}
    >
      <h1
        style={{
          color: "white",
          fontFamily: "Montserrat",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          marginTop: "50px",
          marginLeft:"-100px",
          fontFamily:"Playfair Display"
        }}
      >
        EMPLOYEE REWARD SYSTEM
      </h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            fontSize: "40px",
            fontFamily: "Montserrat",
            backgroundColor: "#1196B0",
            height: "400px",
            marginLeft: "80px",
            marginTop: "80px",
            width: "500px",
            color: "white",
            borderRadius: "20px",
            boxShadow: "1px 0px 19px 5px rgba(255,255,255,0.75)",
          }}
        >
          <div style={{ marginTop: "20px", fontFamily: "Montserrat" }}>
            Manage platform with <b style={{fontFamily:"Montserrat"}} >EASE!</b>
          </div>
          <ul
            style={{
              marginTop: "40px",
              fontFamily: "Montserrat",
              fontSize: "20px",
            }}
          >
            
          </ul>
          <ul style={{ fontFamily: "Montserrat", fontSize: "20px" }}>
            Register Company to Blockchain
          </ul>
          <ul style={{ fontFamily: "Montserrat", fontSize: "20px" }}>
            Send tokens to companies
          </ul>
        </div>

        <div>
          <img style={{ marginLeft: "30px" }} src={jet} />
        </div>
      </div>
      <div
        style={{
          margin: "0 auto",
          width: "1000px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          overflow: "hidden",
          height: "auto",
          boxShadow: "0px 0px 30px rgba(255, 255, 255, 1)",
          marginTop: "30px",
        }}
      >
        <table
          style={{ minWidth: "100%", height: "auto", borderRadius: "20px",backgroundColor: "transparent" }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#2051E9",
                border: "",
                color: "white",
              }}
            ></tr>
            <tr style={{ backgroundColor: "#2051E9", border: "1px solid white" , color:"white"}}>
              <th style={{ padding: "1rem",fontFamily:"Montserrat" }}>Company Name</th>
              <th style={{ padding: "1rem" ,fontFamily:"Montserrat"}}>Wallet Address</th>
              <th style={{ padding: "1rem",fontFamily:"Montserrat" }}>Reward</th>
              <th style={{ padding: "1rem",fontFamily:"Montserrat" }}>Balance Tokens</th>
              <th style={{ padding: "1rem",fontFamily:"Montserrat" }}>Register</th>
              {/* <th style={{ padding: "1rem" }}>Register</th> */}
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => {
              const admin = company.isAdmin;
              console.log(admin);
              return (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "1rem", color: "white", fontFamily:"Montserrat" }}>
                    {company.comName}
                  </td>
                  <td style={{ padding: "1rem", color: "white",fontFamily:"Montserrat" }}>
                    xdc....{company.walletAddress.slice(-10)}
                  </td>
                  <td style={{ padding: "1rem", color: "white" }}>
                    <button className="button1"
                      style={{
                        backgroundColor: "#00FA57",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        position: "relative",
                        overflow: "hidden",
                        zIndex: "1",
                        fontFamily:"Montserrat"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#330078";
                        e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                        e.target.style.boxShadow = " 1px 0px 19px 5px #ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#00FA57";
                        e.target.style.border = "none";
                        e.target.style.boxShadow = "none";
                      }}
                      onClick={(e) => sendToCompany(e, company)}
                    >
                      <span
                        style={{
                          content: "''",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#1e9bff",
                          zIndex: "-1",
                          transform: "scale(0)",
                          transition: "0.5s",
                          
                        }}
                      ></span>
                      Give Tokens
                    </button>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <button
                      onClick={(e) => balanceOf(e, company)}
                      style={{
                        backgroundColor: "#FAC900",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontFamily:"Montserrat",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#CC00FF";
                        e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                        e.target.style.boxShadow = "1px 0px 19px 5px #ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#FAC900";
                        e.target.style.border = "none";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Balance
                    </button>
                  </td>
                  {/* <td style={{ padding: "1rem" }}>
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
                </td> */}
                  <td style={{ padding: "1rem" }}>
                    {/* <button onClick={transfer}>Query Data</button> */}

                    <button
                      onClick={(e) => regCompany(e, company)}
                      style={{
                        backgroundColor: "#FA0000",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontFamily:"Montserrat"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#16FF00";
                        e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
                        e.target.style.boxShadow = "1px 0px 19px 5px #ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#FA0000";
                        e.target.style.border = "none";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Register
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformAdmin;
