import { ethers } from 'ethers';
import './App.css';
import Sample from './Sample/Sample';
import Header from './s/Header';
import { abi } from '../artifacts/contracts/ERSC/erc.sol/ERC.json'; 
import { erc as address } from '../output.json';



import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from '../components/employee/LoginPage'
import RegisterPage from '../components/employee/RegisterPage'
import ForgetPasswordPage from '../components/pages/ForgetPasswordPage'
import EmployeeDashboard from '../components/employee/EmployeeDashBoard'
import ProfilePage from '../components/employee/UserProfile'
import AddEmployee from '../components/admin/AddEmployee'
import AboutPage from '../components/openPage/AboutPage'
import OpenPage from '../components/openPage/Openpage'
import RegisterCompany from "../components/admin/RegisterPageComp";
import LoginComp from "../components/admin/LoginPage";
import AdminDashBoard from "../components/admin/AdminDashBoard"
import RealDash from "../components/admin/RealDash.js"
import AddTask from '../components/admin/AddTask'
import EmpProfile from "../components/admin/EmpProfile"
import CalendarView from '../components/employee/EmployeeTaskView'
import RewardTasks from '../components/admin/RewardTasks'
import AssignTask from "../components/admin/CreateModal"
import ViewTask from '../components/admin/ViewTask'
// import Sample from "./Sample/Sample.js"
import PlatformAdmin from "../components/Platform admin/Tokens reward"
// import Tes from "../components/Platform admin/Tes";



const { getWeb3Modal, createWeb3Provider, connectWallet, EthereumContext, createContractInstance, log } = require('react-solidity-xdc3');

var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network"
  },
  network: "mainnet",
  toDisableInjectedProvider: true
}

function App() {
  const [connecting, setconnecting] = useState(false);
  const [ethereumContext, setethereumContext] = useState({});
  const web3Modal = getWeb3Modal(connectOptions);

  const connect = async (event) => {
    console.log("Clicked")
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const erc = await createContractInstance(address, abi, provider);

    const account = signer.getAddress();
    setethereumContext({ provider, erc, account})
    log("Connect", "Get Address", await signer.getAddress());
    setconnecting(true);
  }
  
  return (
//     <div className="App">
//                     <div className="connect-button-container" style={{marginTop:"30px", position: "absolute", top: 0, right: 0, padding: "10px", zIndex: 999, textAlign: "right" }}>
//                     <button style={{borderRadius:"20px", width:"200px", backgroundColor:"red"}} onClick={connect} disabled={connecting}>{connecting ? 'Connected...' : 'Connect Wallet'}
//                     </button>
// </div>
 <div className="App">
     
      { !(window.location.pathname === '/login' || window.location.pathname === '/' || window.location.pathname === '/logincomp' || window.location.pathname === '/register' || window.location.pathname === '/registercomp') &&
        <div className="connect-button-container" style={{marginTop:"30px", position: "absolute", top: 0, right: 160, padding: "10px", zIndex: 999, textAlign: "right" }}>
          <button style={{borderRadius:"20px", width:"200px", backgroundColor:"red"}} onClick={connect} disabled={connecting}>{connecting ? 'Connected...' : 'Connect Wallet'}
          </button>
        </div>} 
      <section>
        <EthereumContext.Provider value={ethereumContext}>
          <Router>
            <div>
           
                <Switch>
                 
                    <Route exact path="/" component={OpenPage}/>
                    <Route exact path="/about" component={ AboutPage } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/registercompany" component={ RegisterCompany } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/userprofile" component={ProfilePage} />
                    <Route path="/logincomp" component={LoginComp}/>
                    <Route path="/assigntask/:Name/:name/:Wallet" component={AssignTask}/>
                    <Route path="/viewtask/:id" component={ViewTask}/>



                    
                    
                    {/* <Route exact path="/logsign" component={ LandingPage } /> */}
                    
                    <Route path="/employeetokens" component={EmployeeDashboard} />
                   
                    {/* <Route path="/addemployee" component={AddEmployee}/> */}
                    <Route path="/admindash" component={AdminDashBoard}/>
                    {/* <Route path="/viewtask" component={ViewTask}/> */}
                    <Route exact path="/employeehome" component={EmployeeDashboard}/>
                    {/* <Route path="/approvetask" component={ApproveTask}/> */}
                    <Route path="/empprofile/:_id" component={EmpProfile}/>
                    <Route path="/real" component={RealDash}/>
                    <Route path="/adde/:_id/:name/:address/:mobile/:email/:wallet" component={AddEmployee}/>
                    {/* <Route path="/emptask" component={CalendarView}/> */}
                    <Route path="/reward" component={RewardTasks}/>
                    <Route path="/admin" component={PlatformAdmin}/>
                    
                    {/* <Route path="/addd" component={Tes}/> */}


                    {/* <Route path="/viewtask/:empName" component={ViewTask}/>    */}
                </Switch>
            </div>
        </Router>
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;
