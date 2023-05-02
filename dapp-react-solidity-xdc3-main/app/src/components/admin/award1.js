
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
  const [task, setTask] = useState(" ");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [hash, setHash] = useState("");

  // const [comName, setComName] = useState(" ");
  // const [empId, setEmpId] = useState(" ");
  
  const [fileUpload, setFileUpload] = useState(null);
  const uploadFile = async () => {
    
    const confirmAdminWallet = window.confirm("Is the admin wallet connected?");
const confirmUniqueName = window.confirm("Does the certificate have a unique name?");
const confirmNoChanges = window.confirm("Once uploaded, cannot be changed. Proceed?");
// const employeeAddress = props.params.Wallet.replace("xdc","0x")
// console.log(employeeAddress)
// console.log(employeeName)

if (confirmAdminWallet && confirmUniqueName && confirmNoChanges ) {

//   axios
//       .put(
//         `${API_URL}/updateetask/${taskkk._id}`,
//         { certificates: "Certified" },
//         { withCredentials: true }
//       )
//       .then(async (responsee) => {
//         const updateFile = responsee.data.updatedTask;
//         console.log(responsee.data.updateFile);
//         setSubmitting(true);
        
// })

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
// // console.log(hash,"ssssss")
// //  console.log(hash,"hashhhhhhh")
// console.log("asbdasbassdssmnadmasbdnabsmdasdsadsadsa", filehash)
// console.log(filehash,"filehash")
// console.log(taskId,"taskid")

  // event.preventDefault();
  
  try {
    const date = new Date().toLocaleDateString("en-GB");; // Get the deadline in the dd/mm/yy format

    const response = await axios.post(
      `${API_URL}/awardemp/${employeeName}/${compName}/${employeeAddress}`,
      { awardname: awardName , tokens, awarddate:date},
      { withCredentials: true }
    );

    console.log(response.data);
    console.log(employeeName);
    console.log(compName);

    // history.push("/real");
  } catch (error) {
    console.log("wrongyyyy");
    console.error(error);
  }

let resp = await executeTransaction(erc, provider, "registerFileAndSendReward", [
  filehash,
  employeeName,
  rewardAmount,
  employeeAddress
]);
log("Registered", "hash", resp.txHash);
setHash(resp.txHash)

// const responsse = await axios.get(`${API_URL}/downloadCertificate`, formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     "req":"Access-Control-Allow-Origin"
//   }, withCredentials:true
// });
const responsee = await axios.get(`${API_URL}/downloadCertificate?employeeName=${employeeName}&hash=${hash}`, {
  withCredentials: true,
  responseType: 'blob', // set the response type to blob to download the file
});



   } catch (error) {
    console.error('Error uploading file!', error);
    setSubmitting(false);
  }
    // let response = await queryData(erc, provider, "getFileHash", [taskId]);
    //     log("Returned hash", "hash", response);
        // const fileListRef = ref(storage, "certificates");
        // listAll(fileListRef)
        //   .then((res) => {
        //     res.items.forEach((itemRef) => {
        //       if (itemRef.name.slice(-64) === response) {
        //         console.log(itemRef.fullPath);
        //         getDownloadURL(itemRef)
        //           .then((url) => {
        //             console.log(url);
        //             window.open(url, "_blank");
        //           })
        //           .catch((error) => {
        //             console.log(error);
        //           });
        //       }
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
  
        // Reload page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
  
        setSubmitting(false);
      // })
      // .catch((error) => {
      //   console.log(error);
        // Reload page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      // });
  };
} 
  const handleTasks = (e) => {
    setTask(e.target.value);
 
    // setProductId(product.productName);
  };

  const handleTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handleRewards = (e) => {
    setRewards(e.target.value);
  };

  const handleAddModel = async (event) => {
    event.preventDefault();
    
    try {
      const date = new Date().toLocaleDateString("en-GB");; // Get the deadline in the dd/mm/yy format
  
      const response = await axios.post(
        `${API_URL}/awardemp/${employeeName}/${compName}/${employeeAddress}`,
        { awardname: awardName , tokens, awarddate:date},
        { withCredentials: true }
      );
  
      console.log(response.data);
      console.log(employeeName);
      console.log(compName);
  
      history.push("/real");
    } catch (error) {
      console.log("wrongyyyy");
      console.error(error);
    }
  };
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
<img className="awardd" style={{ marginLeft: "-50px" , height:"600px"}} src={awarddd} />
{/* <div
    className="Add-list"
    style={{
      backgroundColor: '#161928',
     fontFamily:"Secular One",
      background:"#161928",
      width: '1000px',
      textAlign: 'center',
      boxShadow: '0 24px 500px #26214a1a',
      borderRadius: '12px',
      padding: '2rem',
      marginLeft:"150px",
      height:"600px"
    }}
  >          */}

        
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
          {/* <label className="modlabel" htmlFor="text">
            Task Name
          </label>
          <input
            className="inputfield"
            id="model_id"
            name="task name"
            placeholder="Name"
            type="text"
            onChange={handleTaskName}
            style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}
          />
          <label className="modlabel" htmlFor="text">
            Task Description
          </label>
          <textarea
            className="inputfield"
            id="description_name"
            name="description_name"
            placeholder="Description"
            type="text"
            onChange={handleTaskDescription}
            style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}
          />
          <label className="modlabel" htmlFor="text">
            Deadline
          </label>
          <input
            className="inputfield"
            id="deadline"
            name="deadline"
            type="date"
            // value={deadline}
            onChange={handleDeadline}
            style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}
          />
          <br /> */}
          {/* <label className="modlabel" htmlFor="text">
            Rewards
          </label>
          <>
          <select className="inputfield" value={rewards} onChange={handleRewards} style={{
              backgroundColor: '#eee',
              borderRadius: '10px',
              padding: '1rem',
              border: 'none',
              marginBottom: '1rem',
              width: '100%'
            }}>
              <option value="">Select Rewards</option>
              <option value="10"> 10 </option>
              <option value="20"> 20 </option>
              <option value="30"> 30  </option>
             
            </select> */}
          {/* </> */}
          <div style={{position:"relative", top:"10px"}}>
                <input
                  style={{ opacity: submitting ? 0.5 : 1, marginRight:"-80px" }}
                  disabled={submitting}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                {/* <button
                  style={{ 
                    marginRight: '-90px', 
                    padding: '8px 16px', 
                    background: submitting ?'red' : "green", 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    opacity: submitting ? 0.5 : 1,
                    fontFamily:"Secular One",
                    marginLeft:"30px",
                    position:"relative",
                    left:"30px"
                  }}>
                  Upload
                </button>  */}
              </div>
            
              {/* onClick={() => uploadFile(task)} */}

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
          {/* <br /> */}
        </form>
     </div>
      {/* <br /> */}
      {/* <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warrenty
      </div>
      <br /> */}
    {/* </div> */}
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
