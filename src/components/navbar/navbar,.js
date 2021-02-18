import React, { useState, Component } from 'react';
import axios from 'axios';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Card,
  CardBody,
  Button,
  Row,
  Col
} from 'reactstrap';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import '../../App.css';
import Routes from '../../route';
import './navbar.css';
import RabbitLogo from '../../images/logo.png';
import OrderSearch from '../OrderSearch/OrderSearchScr';
import { MdPowerSettingsNew } from 'react-icons/md';


const callThis = () => {

  var postObject = { "CommandName": "getItemList" };
  postObject.InputXml = {
    "EnterpriseCode": "S-MART",
    "ItemKey": "201911061724411388"
  };

  postObject.Template = {};
  postObject.IsService = "N";

  //console.log(window.AppInfo.bridgecsrftoken);

  const reqData = {
    method: "POST",
    url: `/Rabbit/proxy/service/Httpinvoke`,
    data: JSON.stringify(postObject),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": window.AppInfo.bridgecsrftoken
    }


  }

  axios(reqData).then(res => {
    console.log("api called");
    const response = res.data;
    console.log("the response is: ", response);
    console.log("itemlist: ", response.Item);
  })
}
function NavbarComponent(props) {


  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const token = window.AppInfo.bridgecsrftoken;
  //   const BaseName=`/Rabbit/container.jsp?CSRFToken=${token}`

  //   const BaseName=`/Rabbit/container.jsp?CSRFToken`
  // const token = window.AppInfo.bridgecsrftoken;
  // const BaseName = `/Rabbit/container.jsp?CSRFToken=${token}`;
  const BaseName = "/RueGilt";
  // var loggedInUser = window.AppInfo.loginid;
  // console.log("loginId: ",loggedInUser);
  const loginid = "saurabh";
  if (loginid == "saurabh") {
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

              <div className="brandName"><h4 className="top" style={{fontWeight:"520",paddingLeft:"2px"}}>PERSONAL SHOPPER</h4><h6 className="top">GROUPE</h6></div>

            </NavbarBrand>
            <NavbarBrand className="secondBrand">

              <div className="logoDiv"><img className="rabbitLogo" src={RabbitLogo} /></div>

            </NavbarBrand>

            <NavbarBrand className="secondBrand" style={{ paddingRight: "10px" }} href='/Rabbit'>
                <div className="logoDiv" className="float-right">
                  <MdPowerSettingsNew size="60" style={{ paddingTop: "8px" }} /><br />
                  <div><p style={{ fontSize: "12px" }}>LOG OUT</p></div>
                </div>
          </NavbarBrand>

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
                      <li ><Link to="/dashboard" style={{ marginLeft: "0px",color:"rgba(4,71,132)",fontSize:"17px" }}>Dashboard</Link></li>
                      <li><Link to="/customers" style={{color:"rgba(4,71,132)",fontSize:"17px" }}>Customers</Link></li>
                      {/* <li><Link to="/subscriptions" style={{ textDecoration:"none",color:"blue"}}>Subscriptions</Link></li> */}
                      <li><Link to="/products" style={{color:"rgba(4,71,132)" ,fontSize:"17px"}}>Product</Link></li>
                      <li><Link to="/orderSearch" style={{ marginRight: "0px",color:"rgba(4,71,132)",fontSize:"17px" }}>Order Review / Send To Customer</Link></li>
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

  return (<div className="NavbarClass">

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

          <div className="logoDiv">
            <img className="rounded float-right" alt="aligment" src={RabbitLogo} />
            {/* <Image className="rabbitLogo" className="rabbitLogo" source = {require('RabbitLogo')} /> */}
          </div>

        </NavbarBrand>

        <NavbarBrand className="secondBrand" style={{ paddingRight: "10px" }} href='/Rabbit'>
                <div className="logoDiv" className="float-right">
                  <MdPowerSettingsNew size="60" style={{ paddingTop: "8px" }} /><br />
                  <div><p style={{ fontSize: "12px" }}>LOG OUT</p></div>
                </div>
          </NavbarBrand>

      </div>
      <div><i className="setting_icon"></i></div>
    </Navbar>
    <Router>
      <Collapse isOpen={isOpen}>

        <Card>
          <Row className="menuRow">
            {/* <Col md="0"><NavLink to="/"  style={{ textDecoration:"none" ,color:"blue"}} exact></NavLink></Col>   */}
            {/* <Col md="0"><NavLink to="/"  style={{ textDecoration:"none" ,color:"blue"}} exact></NavLink></Col> */}
            <Router basename={BaseName} forceRefresh={true}>
              <div className="table">
                <ul className="horizontal-list">

                  <li><Link to="/dashboard" >Dashboard</Link></li>
                  <li><Link to="/customers">Customers</Link></li>
                  {/* <li><Link to="/subscriptions" style={{ textDecoration:"none",color:"blue"}}>Subscriptions</Link></li> */}
                  <li><Link to="/products" >Product</Link></li>
                  <li><Link to="/orderSearch"  >Order Search</Link></li>
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