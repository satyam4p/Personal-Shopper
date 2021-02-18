import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container, Pagination} from 'reactstrap';
import bell from '../../components/dashboard/images/bell.png';
import btn from '../../components/dashboard/images/btn.png';
import pencil from '../../components/dashboard/images/pencil.png';
import msgs from '../../components/dashboard/images/msgs.png';
import './dashboard.css';
class NotificationAndActions extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            alert:[{
                Name:"Vibhuti Ranjan",
                Purpose:"Order Cancel",

            },
            {
                Name:"Satyma Kumar",
                Purpose:"Order Placed",

            },
            {
                Name:"Vibhuti Ranjan",
                Purpose:"Style Reject",

            },
            {
                Name:"Vibhuti Ranjan",
                Purpose:"Return Order",

            },
            {
                Name:"Vibhuti Ranjan",
                Purpose:"Modification Request",

            }]
        }
    }
    render() { 
        return ( <div>
          
            <Card className="styleRecomend" style={{ borderColor: '#333'}}>
                <CardBody >
                <CardTitle className="title"><img className="imgSize" src={bell}/><b> NOTIFICATIONS & ACTIONS</b></CardTitle>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br><br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
               
                <div>
               <Row xs="3">
                 <Col>
               
                <Button color="primary"><img className="btnGrp" src={btn}></img></Button> 
                <p>NEW STYLE</p>
                </Col>
                 <Col>
                <Button color="primary"><img className="btnGrp" src={pencil}></img></Button>  
               <p>EDIT STYLE</p>    
               </Col>
                 <Col> 
                <Button color="primary"><img className="btnGrp" src={msgs}></img></Button>    
               <p>INVITE USER  </p>
                </Col>
                </Row>
                </div>
                </CardBody>
            </Card>
        </div>);
    }
}
 
export default NotificationAndActions ;