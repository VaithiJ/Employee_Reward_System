
import { Container, Row, Col } from 'react-bootstrap';
import Onavbar from './Onavbar';
import React from 'react';
import Footercr from '../footer/footercr';
// import styles from './openpage.module.css';

const AboutPage = () => {

  const customFont = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
  };

  const headingGradient = {
    background: 'linear-gradient(to right, #3259c9, #ff4b1f, #e633ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div >
      <Onavbar />
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"/>
          <link href="'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap"  rel="stylesheet"/>
      </head>

      <Container>
        <Row>
          <Col>
            {/* Apply the custom font to the text */}
            <div className='open'>
              <h1 style={{ fontSize: '4rem', textAlign: 'center', ...customFont, ...headingGradient ,position:"relative", top:"50px"}}>
                EMPLOYEE REWARD SYSTEM
              </h1>
              <h2 id='about' style={{ color: '#00008b',position:"relative", top:"70px",textAlign:"left"}}>
                <u><b style={{fontFamily:"Playfair-Display cursive"}}> ABOUT </b></u>
              </h2>
              <h4 style={{ color: '#000', wordSpacing:'0.6em',textAlign:"left", position:"relative", top:"60px", fontFamily:"Montserrat"}}>
                Maintaining accurate records of employee data and certifications is essential for many companies,
                but such records can often be difficult to manage and access. This lack of proper record-keeping can
                create challenges for retrieving and utilizing employee data, leading to inefficiencies and errors.
                However, by utilizing blockchain technology, such data can be securely stored in a tamper-proof,
                permanent manner. This makes it easier for employees to access and utilize their information whenever
                necessary, improving the efficiency of operations. Additionally, blockchain can be used to issue
                tokens as rewards for employees who have completed specific tasks, providing a tangible incentive
                to drive desired behaviors. The contract can be developed using Daml, a powerful digital asset
                modeling language, to facilitate this process and ensure that employee data is effectively managed
                and utilized within the organization and also send tokens as rewards to the respective employees.
              </h4>
              {/* <h4 id="about" style={{ color: '#ff4b1f' }}>
                <u>About</u>
              </h4>
              <h5 style={{ color: '#FFFFFF', wordSpacing:'0.6em'}}>
                Maintaining accurate records of employee data and certifications is essential for many companies,
                but such records can often be difficult to manage and access. This lack of proper record-keeping can
                create challenges for retrieving and utilizing employee data, leading to inefficiencies and errors.
                However, by utilizing blockchain technology, such data can be securely stored in a tamper-proof,
                permanent manner. This makes it easier for employees to access and utilize their information whenever
                necessary
                </h5> */}
          <h2 id="benefits" style={{ color: '#00008b',position:"relative", top:"70px",textAlign:"left"}}>
            <u> <b style={{fontFamily:"Playfair-Display cursive"}}>BENEFITS </b></u>
          </h2>
          <h4 style={{ color: '#000', wordSpacing:'0.6em',textAlign:"left",fontFamily:"Montserrat",position:"relative",top:"60px" }}>
            The benefits of implementing a blockchain-based employee reward system include:
           </h4>
           <ul style={{ color: '#000',wordSpacing:'0.6em',textAlign:"left", position:"relative",top:'60px',fontSize:"1.4rem",fontFamily:"Montserrat"}}>
             <li style={{fontFamily:"Montserrat"}}>Improved accuracy and accessibility of employee data and certifications</li>
             <li style={{fontFamily:"Montserrat"}}> Increased efficiency of operations</li>
           <li style={{fontFamily:"Montserrat"}}>Tangible incentives for employees to perform desired behaviors</li>
             <li style={{fontFamily:"Montserrat"}}>Secure and tamper-proof storage of employee data</li>
           </ul>
           <h2 id="tech" style={{ color: '#00008b',textAlign:"left" ,position:"relative", top:"65px"}}>
             <u> <b style={{fontFamily:"Playfair-Display cursive"}}> TECHNOLOGY </b> </u>
         </h2>
           <h4 style={{ color: '#000',wordSpacing:'0.6em' ,textAlign:"left",fontFamily:"Montserrat",position:"relative",top:"50px"}}>
             The employee reward system can be developed using blockchain technology and the Daml digital
             asset modeling language. This ensures the secure and efficient management of employee data,
             as well as the issuance and transfer of reward tokens. Additionally, the use of smart contracts
             in Daml allows for the automation of reward issuance and tracking, further improving the efficiency
             of operations.
           </h4>
           <h2 style={{ color: '#00008b',textAlign:"left",position:"relative", top:"65px" }}>
             <u> <b style={{fontFamily:"Playfair-Display cursive"}}>FUTURE </b></u>
           </h2>
           <h4 style={{ color: '#000',wordSpacing:'0.6em',textAlign:"left",position:"relative", fontFamily:"Montserrat", top:"50px"}}>
             The future of employee reward systems lies in the development and integration of emerging technologies,
             such as blockchain and AI, to improve the accuracy, efficiency, and fairness of such systems. By leveraging
             these technologies, companies can more effectively motivate their employees to perform desired behaviors,
             while also providing a more transparent and accessible system for the management of employee data and rewards.
           </h4>
         </div>
       </Col>
     </Row>
   </Container>
   <footer style={{position:"relative", top:"40px"}}> <Footercr/> </footer>
 </div>

 );
 };

 export default AboutPage;
