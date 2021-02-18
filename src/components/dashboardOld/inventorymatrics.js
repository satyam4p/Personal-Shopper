import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container} from 'reactstrap';
import PieChart from '../../components/dashboard/PieChart';
import './dashboard.css';

class InventoryMatrics extends Component {
    state = {  }
    render() { 
        return ( <div>
           <Card style={{ borderColor: '#333' }}>
                <CardBody className="">
                <CardTitle className="title"><b>INVENTORY MATRICS</b></CardTitle>
                
               <PieChart/>
                </CardBody>
            </Card>
          

        </div>);
    }
}
 
export default InventoryMatrics;