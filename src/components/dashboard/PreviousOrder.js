import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from '../../components/dashboard/BarChart';
import './dashboard.css';

class PreviousOrder extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card>
            <CardHeader className="CardHeaderClassWide">
                    <p>Customer List</p>
                </CardHeader>

                <CardBody className="stylerecomend" style={{height:"503px"}}>
               

                            <MyChart/>            

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default PreviousOrder ;