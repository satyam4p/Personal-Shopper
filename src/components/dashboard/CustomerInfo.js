import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from '../../components/dashboard/BarChart';
import './dashboard.css';

class CustomerInfo extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card>
            <CardHeader className="CardHeaderClassWide">    
               <p>Customer Info</p> 
                </CardHeader>
                <CardBody className="stylerecomend">
              
                <CardText style={{height: "15px"}} ><div style={{float:"left",fontWeight:"600",fontSize:"12px"}}>FIRST NAME:</div><div style={{float:"right",fontWeight:"600",fontSize:"14px"}}>{}</div></CardText>
                        <CardText style={{height: "15px"}}><div style={{float:"left",fontWeight:"600",fontSize:"12px"}}>LAST NAME:</div><div style={{float:"right",fontWeight:"600",fontSize:"14px"}}>{}</div></CardText>
                        <CardText style={{height: "15px"}} ><div style={{float:"left",fontWeight:"600",fontSize:"12px"}}>DATE OF BIRTH:</div><div style={{float:"right",fontWeight:"600",fontSize:"14px"}}>{}</div></CardText>
                        <CardText style={{height: "15px"}}><div style={{float:"left",fontWeight:"600",fontSize:"12px"}}>EMAIL:</div><div style={{float:"right",fontWeight:"600",fontSize:"14px"}}>{}</div></CardText>          
                        <CardText style={{height: "15px"}}><div style={{float:"left",fontWeight:"600",fontSize:"12px"}}>MOBILE NO:</div><div style={{float:"right",fontWeight:"600",fontSize:"14px"}}>{}</div></CardText>
                </CardBody>
            </Card>

        </div>);
    }
}
 
export default CustomerInfo ;