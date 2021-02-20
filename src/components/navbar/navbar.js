import React, { useState, } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Card,
  Button,
  Row,
 
} from 'reactstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import '../../App.css';
import Routes from '../../route';
import './navbar.css';


function NavbarComponent(props) {


  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const token = window.AppInfo.bridgecsrftoken;
  // const BaseName = `/Rabbit/container.jsp?CSRFToken=${token}`
  // const loginId = window.AppInfo.loginid;
  // console.log("LoginID is: ", loginId);
  //   const BaseName=`/Rabbit/container.jsp?CSRFToken`
  //  const token = window.AppInfo.bridgecsrftoken;
  // const BaseName = `/Rabbit/container.jsp?CSRFToken=${token}`;
  const BaseName = "personalshopper.netlify.app//RueGilt";
  // var loggedInUser = window.AppInfo.loginid;
  // console.log("loginId: ", loggedInUser);

  return (
    <div className="NavbarClass">

      <Navbar className="navbarclass" color="light" light expand="md">
        <div>
          <Button color="" onClick={toggle} >
            <div className="menu" ></div>
            <div className="menu"></div>
            <div className="menu"></div>
          </Button>
        </div>
        <div className="commmonDiv">

          <NavbarBrand className="brandOne" href={BaseName}>

            <div className="brandName"><h3 className="top">PERSONAL SHOPPER</h3><h6 className="top">GROUPE</h6></div>

          </NavbarBrand>
          <NavbarBrand className="secondBrand">

            {/* <div className="logoDiv"><img className="rabbitLogo" src={RabbitLogo} alt="" /></div> */}

          </NavbarBrand>

          {/* <NavbarBrand className="secondBrand" style={{ paddingRight: "10px" }} href='/Rabbit'>
                <div className="logoDiv" className="float-right">
                  <MdPowerSettingsNew size="60" style={{ paddingTop: "8px" }} /><br />
                  <div><p style={{ fontSize: "12px" }}>LOG OUT</p></div>
                </div>
          </NavbarBrand> */}

        </div>
        <div><i className="setting_icon"></i></div>
      </Navbar>
      <Router>
        <Collapse isOpen={isOpen}>

          <Card style={{backgroundColor:" rgb(225, 243, 252) ",paddingTop:"10px",paddingBottom:"10px",height:"50px"}}>
            <Row className="menuRow">
              {/* <Col md="0"><NavLink to="/"  style={{ textDecoration:"none" ,color:"blue"}} exact></NavLink></Col>   */}
              {/* <Col md="0"><NavLink to="/"  style={{ textDecoration:"none" ,color:"blue"}} exact></NavLink></Col> */}
              <Router basename={BaseName} forceRefresh={true}>
                <div className="table">
                  <ul className="horizontal-list">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                    {/* <li><Link to="/subscriptions" style={{ textDecoration:"none",color:"blue"}}>Subscriptions</Link></li> */}
                    <li><Link to="/products">Product</Link></li>
                    <li><Link to="/orderSearch">Review Order/Send To Customer</Link></li>
                    {/* <li><Link to="/stylegroups" style={{ textDecoration:"none",color:"blue"}}>StyleGroup</Link></li> */}
                    {/* <li><Link to="/subscription" style={{ textDecoration:"none",color:"blue"}}> Subscription Programs</Link></li> */}
                  </ul>
                </div>
              </Router>
            </Row>
          </Card>
        </Collapse>
        <Routes baseName={BaseName} />
      </Router>
    </div>);
}

export default NavbarComponent;