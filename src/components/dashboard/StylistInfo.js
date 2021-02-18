import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from '../../components/dashboard/BarChart';
import './dashboard.css';
import {NavLink,Route,Switch,BrowserRouter as Router} from 'react-router-dom';

class StylistInfo extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card>
            <CardHeader className="CardHeaderClassWide">
                  <p>Stylist Info</p>
               </CardHeader>
                <CardBody className="stylerecomend">
              
                <CardText >
                   {/* HI SAURABH, YOU DON'T HAVE ANY STYLIST ASSIGNED TO  YOU, CLICK <NavLink to="/SurveyForm" >HERE</NavLink> TO GET A STYLIST. */}
                    
                    </CardText>              

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default StylistInfo ;