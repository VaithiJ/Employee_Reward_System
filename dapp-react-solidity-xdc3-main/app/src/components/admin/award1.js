
import React, { useState, useEffect , useContext} from "react";
import "./CreateModal.css";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarMenu from "./side";
import { useHistory } from "react-router-dom";
import bg from "./ss.svg"
import "./real.css"
import awarddd from "./ad3.png"
import "./reg.css"
import Swal from "sweetalert2";



const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");



const Award = (props) => {
  const { provider, erc } = useContext(EthereumContext);

  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const tokenn = jwt_decode(cookies.access_token);
  const history = useHistory();

  const API_URL = "http://localhost:8800";

  const employeeName = props.match.params.Name;
  const employeeAddress = props.match.params.Wallet.replace("xdc","0x");
     console.log(employeeAddress)
  const compName = tokenn.name;

  const [submitting, setSubmitting] = useState(false);
  const [hash, setHash] = useState("");

 
  
  const [fileUpload, setFileUpload] = useState(null);
  const uploadFile = async () => {
    
    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
const confirmUniqueName = window.confirm("Does the certificate have a unique name?");
const confirmNoChanges = window.confirm("Once uploaded, cannot be changed. Proceed?");


if (confirmAdminWallet && confirmUniqueName && confirmNoChanges ) {



  if (!fileUpload) return;

  try {
    setSubmitting(true);
console.log("FIles",fileUpload)
    const formData =  new FormData();
    formData.append('employeeName', employeeName); 

     formData.append('PerformanceCertificates', fileUpload);
console.log("Formdata", formData.entries())
    const response = await axios.post(`${API_URL}/uploadCertificate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "req":"Access-Control-Allow-Origin"
      }, withCredentials:true
    });

    console.log('Performance certificate uploaded successfully!', response.data.FileHash);
    console.log(response.data.FileHash)
//     console.log(taskkk)

const filehash =response.data.FileHash;
const rewardAmount = tokens;
console.log(rewardAmount)

  
    const date = new Date().toLocaleDateString("en-GB");; // Get the deadline in the dd/mm/yy format

    const responsee = await axios.post(
      `${API_URL}/awardemp/${employeeName}/${compName}/${employeeAddress}`,
      { awardname: awardName , tokens, awarddate:date},
      { withCredentials: true }
    );

    console.log(responsee.data);
    console.log(employeeName);
    console.log(compName);
    let resp = await executeTransaction(erc, provider, "registerFileAndSendReward", [
      filehash,
      employeeName,
      rewardAmount,
      employeeAddress
    ]);
    log("Registered", "hash", resp.txHash);
    setHash(resp.txHash)
    Swal.fire({
      icon: "success",
      title: "Awarded successfully!",
      text: `${employeeName} has been awarded`,
      confirmButtonColor: "#9A1B56",
      timer: 1500, // automatically close after 3 seconds
  showConfirmButton: true // force the "ok" button to be visible
    });

    history.push("/real");
  } catch (error) {
    if (error.code === -32603) {
      Swal.fire({
        icon: "error",
        title: "Awarding Failed!",
        text: "Check if your wallet is connected & your balance",
        confirmButtonColor: "#9A1B56",
      })
  }
}




  
        setSubmitting(false);
     
  };
} 
const [award, setAward] = useState([]);
const [awardName, setAwardName] = useState("");
const [tokens, setTokens] = useState("");

useEffect(() => {
  axios
    .get(`${API_URL}/award`, { withCredentials: true })
    .then((response) => {
      setAward(response.data.award);
      console.log(response.data.award)
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

const handleSelectChange = (event) => {
  const selectedOption = event.target.value;
  setAwardName(selectedOption);

  console.log( selectedOption)
  const selectedAward = award.find((award) => award.AwardName === selectedOption);
  console.log( selectedAward)
  if (selectedAward) {
    const pp = selectedAward.tokens
    setTokens(selectedAward.tokens);
    console.log(pp )
  } else {
    setTokens("");
  }
};
  return (
    <div className="modal-container"  style={{backgroundColor:"#F9F8F8"}} >
      <header style={{ backgroundColor: '#F9F8F8', padding: '1.5rem 0',height:"100px" }}>
      <div style={{position:"relative",bottom:"20px",left:"20px", marginLeft:"-1200px"}}>
      <SidebarMenu /> </div>
  <h2
    className="heading"
    style={{ 
      fontFamily: 'Secular One', 
      fontSize: '2.5rem', 
      marginBottom: '1.5rem',
      color: '#333333',
      textAlign: 'center',
      textTransform: 'uppercase',
      position:"relative",
      bottom:"60px",
      color:"black"

    }}>
    {employeeName}
  </h2>
</header>
<div style={{display:"flex", flexDirection:"row"}}>
<img className="awardd" style={{ marginLeft: "-50px" , height:"600px"}}  />

        
        <form className="modal-form" style={{
backgroundColor:"#F9F8F8",width:"600px",marginRight:"100px", borderRadius:"10px", fontFamily:"Secular One",height:"600px"}} >
          <label className="modlabel" htmlFor="text" style={{marginTop:"-200px"}} >
            Select Awards
          </label>
          <>
          <select className="inputfield" value={awardName} onChange={handleSelectChange} style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%',
              fontWeight:"bolder"
            }}>
              
  <option value="" style={{textDecoration:"line-through", color:"black"}}>Select Award</option>
  {award.map((awardObj) => (
    <option key={awardObj._id} value={awardObj.AwardName}>{awardObj.AwardName}</option>
  ))}
</select>
<p style={{fontFamily:"Secular One"}}>Total token rewards : {tokens} </p>

          </>
         
          <div style={{position:"relative", top:"10px"}}>
                <input
                  style={{ opacity: submitting ? 0.5 : 1, marginRight:"-80px" }}
                  disabled={submitting}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
               
              </div>
            

          <Link>
          <button

            id="singlebutton"
            name="singlebutton"
            className="btM"
            onClick={uploadFile}
            style={{fontFamily:"Secular One",position:"relative",top:"40px"}}
          >
            Award Employee
          </button>
          </Link>
        </form>
     </div>
      
    <div style={{ marginTop: "0px", marginLeft: "-800px",marginTop:"-120px", fontFamily: "Secular One", fontSize: "30px" }}>
  <ul >
    <li style={{fontFamily:"Secular One"}}>Select an award for your employee</li>
    <li style={{fontFamily:"Secular One"}}>Reward them with the chosen award</li>
    <li style={{fontFamily:"Secular One"}}>Watch your employees feel appreciated <br/> and  motivated!</li>
  </ul>
</div>

    </div>
  
  );
};

export default Award;
