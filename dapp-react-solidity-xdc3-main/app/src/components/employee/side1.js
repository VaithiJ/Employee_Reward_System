import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaTasks } from "react-icons/fa";
import { FiPower } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { FiGift } from "react-icons/fi";
import "./sidemenu1.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";

const SidebarMenu12 = () => {
  const [isOpen, setIsOpen] = useState(false); // set isOpen to false by default
  const menuRef = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "employee_token",
    "name",
  ]);


  const toke = jwt_decode(cookies.employee_token);
  const API_URL = "http://localhost:8800";
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    removeCookie("employee_token");
  };


  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== "menu-toggle"
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".sidebar-menu ul")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} style={{ marginTop: "20px" }}>
      <button
        className="btn btn-primary"
        id="menu-toggle"
        style={{
          background: "#f5f5f5",
          color: "#000000",
          width: "70px",
          border: "none",
        }}
        onMouseEnter={toggleSidebar}
      >
        {isOpen ? (
          <AiOutlineClose
            style={{ fontSize: "2rem", position: "relative", right: "0px" }}
          />
        ) : (
          <AiOutlineMenu
            style={{ fontSize: "2rem", position: "relative", right: "0px" }}
          />
        )}
      </button>
      <nav
        className={`sidebar-menu ${isOpen ? "open" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-header"></div>
        <ul className="list-unstyled" style={{ alignContent: "lef" }}>
          <li>
            <a href="/employeehome">
              <FaHome className="fonnn" id="fonnn" /> Home
            </a>
          </li>
          {/* <li>
            <a href="/emptask">
              <FaTasks className="icon" id="fonnn" /> Assigned Tasks
            </a>
          </li> */}
          <li>
            <a href="/login"
              style={{ color: "#FFFFFF" }}
              onMouseOver={(e) => (e.target.style.color = "#000000")}
              onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
              onClick={handleLogout}
            >
              <FiPower className="icon" id="fonnn" /> Logout
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

export default SidebarMenu12;
