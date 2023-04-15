
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaThumbsUp, FaHome , FaPowerOff} from 'react-icons/fa';
import { AiOutlineClose,AiOutlineMenu } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { FiGift ,FiPower} from 'react-icons/fi';
import './SidebarMenu.css';

import jwt_decode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useHistory } from 'react-router-dom';



const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // set isOpen to false by default
  const menuRef = useRef(null);


  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "name",
  ]);
  const toke = jwt_decode(cookies.access_token);
  const API_URL = "http://localhost:8800";

  const handleLogout = () => {
    removeCookie("access_token");
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== 'menu-toggle'
    ) {
      setIsOpen(false);
    }
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.sidebar-menu ul')) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} style={{marginTop:"20px"}}>
     <button className="btn btn-primary" id="menu-toggle" style={{background:"#FFFFFF",color:"#000000",width:"70px",border:"none"}} onMouseEnter={toggleSidebar}>
        {isOpen ? <AiOutlineClose style={{fontSize:"2rem",position:"relative",right:"0px",}} /> : <AiOutlineMenu style={{fontSize:"2rem",position:"relative",right:"0px",}} />}
      </button>
      <nav className={`sidebar-menu ${isOpen ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
        <div className="sidebar-header" ></div>
        <ul className="list-unstyled" >
        <li id="fonnn">
        <img src={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCD2IRkg5xxZTdaHZrj4MXtcwuvo2xSPOACVOPvQ&s'} alt="User Avatar" style={{ 
           borderRadius: '50%',
        marginRight: '20px',
        width:"150px",
        height:"150px"

      }} />  </li>

      <li style={{color:"white", marginLeft:"-20px"}}>{toke.name}</li>

    <Link to="/real"style={{marginLeft:"-200px", fontSize:"14px"}}>
      <FaHome className="fonnn"  /> Home
    </Link>
  <li id="fonnn">
    <Link to="/admindash" style={{marginLeft:"-120px",fontSize:"14px"}}>
      <FaHome className="fonnn"  /> Onboard Employees
    </Link>
  </li>
          {/* <li id="fonnn">
            <a href="/assigntask/:employeeId/:compName">
              <BiTask className="icon" id="fonnn" /> Assign Tasks
            </a>
          </li> */}
         <li id="fonnn">
    <Link to="/reward" style={{marginLeft:"-200px",fontSize:"14px"}}>
      <FaHome className="fonnn"  /> Reward
    </Link>
  </li>
          <li>
            <a href="/logincomp"
              style={{ color: "#FFFFFF" }}
              onMouseOver={(e) => (e.target.style.color = "#000000")}
              onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
              onClick={handleLogout}
            >
              <FiPower style={{fontSize:"20px",marginLeft:"-100px"}} className="icon" id="fonnn" /> <b style={{fontSize:"18px", }}>Logout </b>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="close-btn" onClick={toggleSidebar}>
            {/* <AiOutlineClose /> */}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SidebarMenu;
