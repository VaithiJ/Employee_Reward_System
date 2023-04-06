import React, { useEffect, useState } from "react";
import styles from "./openpage.module.css";
import companyImage from "./comp1.png";
import employeeImage from "../../image/employee.jpg"
import ac from "./acc.png";
import Onavbar from "./Onavbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import Slideshow from "./carousel/car";
import "./openpage.module.css";
import bg from "./y.svg";
import g from "./sc.svg";

const Openpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all">
      <div
        className={styles.open}
        style={{
          width: "100%",
          height: "1070px",
          backgroundImage: `url(${bg})`,
        }}
      >
        <Onavbar />
        <div
          style={{
            textAlign: "left",
            marginLeft: "100px",
            marginTop: "100px",
          }}
        >
          <span
            className={styles.span}
            style={{ paddingTop: "200px", textShadow: "0px 0px 2px" }}
          >
            Employee Reward System{" "}
          </span>
        </div>
        <div>
          <img
            src={ac}
            style={{
              width: "500px",
              height: "400px",
              float: "right",
              marginTop: "-200px",
              marginRight: "20px",
            }}
          />
        </div>
        <h1 className="home-title">
          <p
            className={styles.open1}
            style={{
              marginLeft: "100px",
              textAlign: "left",
              fontFamily: "Roboto Condensed",
              lineHeight: "1.5",
            }}
          >
            Recognizing and Rewarding Employees <br /> with Excellence
          </p>
        </h1>
        <div>
          <Link to="/login">
            <button className={styles.btn} style={{ marginLeft: "-20px" }}>
              Employee
            </button>
          </Link>
          <Link to="/logincomp">
            <button className={styles.btn} style={{ marginLeft: "320px" }}>
              Company
            </button>
          </Link>
        </div>
      </div>
      <div style={{ backgroundImage: `url(${g})` }}>
        <div className={styles.open}>
          <div className={styles.image_container} id="empp">
            <img
              src={employeeImage}
              style={{
                width: "550px",
                height: "400px",
                marginTop: "-500px",
                marginLeft: "90px",
              }}
              alt="Employee"
            />
            <div style={{ marginTop: "-550px" }}>
              <h3 className={styles.txt}>EMPLOYEE</h3>
              <p
                className={styles.p}
                style={{
                  lineHeight: "1.5",
                  fontSize: "16px",
                  textAlign: "right",
                }}
              >
                The employee's role in this platform is to complete tasks
                assigned by the company admin and earn ERCoin rewards. They can
                also take certification courses to increase their value to the
                company. The platform stores certificates of completion on IPFS
                and records the hash on the XDC blockchain, providing lifelong
                proof of achievements. Overall, the employee's contributions and
                hard work are crucial to the success of the platform.
              </p>
            </div>
          </div>

          <div className={styles.image_container}>
            <div className="compp">
              <div className={styles.text_container}>
                <h3 className={styles.txt}>COMPANY</h3>

                <p
                  className={styles.p}
                  style={{
                    lineHeight: "1.5",
                    fontSize: "16px",
                    marginLeft: "100px",
                    textAlign: "left",
                  }}
                >
                  The company registers and onboard employees, assigns tasks and
                  certifications, and rewards them with ERCoin. The admin
                  approves tasks and stores certificates on IPFS, recording the
                  hash on the XDC blockchain. The platform streamlines task
                  management and reduces administrative workload. It promotes
                  transparency and fairness in task assignment and reward
                  distribution, creating a positive work environment. Overall,
                  the company supports and incentivizes its employees to drive
                  the platform's success.
                </p>
              </div>
            </div>

            <img
              src={companyImage}
              style={{
                width: "750px",
                height: "550px",
                marginTop: "-100px",
                marginRight: "90px",
              }}
              alt="Employee"
            />
          </div>
        </div>

        <div
          className={styles.about}
          style={{ boxShadow: "0 0 10px rgba(10,100,0,0.3)" }}
        >
          <h2 className={styles.a1} style={{ color: "#F4F4F4" }}>
            <br />
            What is the problem we solve
          </h2>
          <br />
          <p
            className={styles.p}
            style={{ lineHeight: "1.5", color: "white", textAlign: "center" }}
          >
            The Employee Reward System addresses the issue of employees losing
            proof of their notable achievements or certifications when leaving a
            company. Through the system, employees can be rewarded with tokens
            for their completed tasks or achievements, which are stored on a
            blockchain. These tokens can then be redeemed for gift vouchers. The
            system provides a reliable and verifiable record of an employee's
            accomplishments, making it easier for recruiters to evaluate their
            qualifications.
          </p>

          {/* <Link to="/about">
            <button className={styles.btn}>Learn More</button>
          </Link> */}
          <br />
        </div>
        <div className="int">
          <div
            className={styles.open}
            style={{
              marginLeft: "550px",
              marginTop: "100px",
              boxShadow: "0 0 10px rgba(10,100,0,0.7)",
              width: "300px",
              height: "300px",
              marginBottom:"40px"
            }}
          >
            <h3 className={styles.a1} style={{}}>
              Stacks Used
            </h3>
            <Slideshow />
          </div>
        </div>
        <Footer />
      </div>
    </div>
    // </div>
  );
};

export default Openpage;
