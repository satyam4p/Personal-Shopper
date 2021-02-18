import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from '../../components/dashboard/BarChart';
import './dashboard.css';

class Weather extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card>
            <CardHeader className="CardHeaderClassWide">    
               <p>Weather Info</p> 
                </CardHeader>
                <CardBody className="stylerecomend">
               
                            <MyChart/>            

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default Weather ;