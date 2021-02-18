import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container} from 'reactstrap';
import LineChart from '../../components/dashboard/LineChart';
import './dashboard.css';

class OrderFullFillment extends Component {
    state = {  }
    render() { 
        return ( <div>
           <Card style={{ borderColor: '#333' }}>
                <CardBody className="">
                <CardTitle className="title"><b>ORDER FULLFILLMENT</b></CardTitle>
                           <LineChart/>
                </CardBody>
            </Card>

        </div>);
    }
}
 
export default OrderFullFillment ;