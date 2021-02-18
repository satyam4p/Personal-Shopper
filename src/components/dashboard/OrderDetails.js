import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from '../../components/dashboard/BarChart';
import './dashboard.css';
import {NavLink,Route,Switch,BrowserRouter as Router} from 'react-router-dom';

class OrderDetails extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card>
            <CardHeader className="CardHeaderClassWide">
                    <p>Order Details</p>
                </CardHeader>
                <CardBody className="stylerecomend">
                

                <CardText >
                    HI SAURABH YOU HAVE NOT SUBSRIBED TO ANY SUBSCRIPTION PROGRAMS ,CLICK <NavLink to="/SurveyForm" >HERE</NavLink> TO ENROLL INTO
                  OUR PREMIUM SUBSCRIPTIONS.
                    </CardText>            

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default OrderDetails ;