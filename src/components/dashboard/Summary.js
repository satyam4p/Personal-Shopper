import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Badge ,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from './BarChart';
import './dashboard.css';
import {TiShoppingCart} from 'react-icons/ti';
import {Link} from 'react-router-dom';
import {Progress} from 'react-sweet-progress';

class Weather extends Component {
    
    constructor(props){
        super(props);
        this.state = {  }
        
    }
    render() { 
        console.log("Count from trending::::",this.props.countFromTrending);
        return ( <div>
            <Card style={{maxHeight:"220px"}}>
            <CardHeader className="CardHeaderClassWide">    
               <p>SUMMARY</p> 
                </CardHeader>
                <CardBody className="">
                <CardSubtitle style={{float:"left",marginTop:"5px",fontWeight:"bold",fontSize:"15px"}}>Customer Shopping Cart</CardSubtitle> 
                                <div style={{float:"right",height:"50%",width:"19%",marginRight:"20px",backgroundColor:"green",borderRadius:"50%"}}>
                               <Link to={{ pathname: `/GetCompleteOrderDetails/OrderHeaderKey?customerid=${this.props.customerId}=ohk=${this.props.orderHeaderKey}`,
                                        state:{customerID:this.props.customerId}
                                        }}>                                                                                                
                                        <TiShoppingCart size="40" style={{color:"white"}}/>
                                        <Badge style={{backgroundColor:"red",borderRadius:"50%",position:"absolute"}}>{this.props.currentCount}</Badge> 
                                        </Link>
                                        </div><br/><br/>
                <Card style={{width:"40%",marginRight:"30px",float:"left",backgroundColor: "rgb(229, 229, 229)",marginTop:"-10px"}}>
                        <p style={{marginBottom:"-5px", fontSize:"20px"}}>25</p>
                        <p style={{marginBottom:"-5px" ,fontSize:"12px",fontWeight:"bold"}}>Customers</p>
                        <hr style ={{borderColor:"white",height:"2px"}}></hr>
                        <p style={{marginBottom:"-7px",fontSize:"20px",marginTop:"-15px"}}>18K</p>
                        <p style={{fontSize:"12px",fontWeight:"bold"}}>Revenue Target</p>
                </Card>
                <CardSubtitle style={{paddingTop:"10px",fontWeight:"bold",marginRight:"-50px",fontSize:"15px"}}>Target </CardSubtitle>
                {/* <Card style={{width:"40%",height:"50px",float:"left",marginRight:"80px",backgroundColor: "rgb(229, 229, 229)"}}>
                        <p style={{marginBottom:"-1px",fontSize:"20px"}}>18K</p>
                        <p style={{paddingBottom:"10px",fontSize:"12px",fontWeight:"bold"}}>Revenue Target</p>
                </Card> */}
                <Progress
                    type="circle"
                    width={50}
                    percent={70}
                    strokeWidth={8}
                    style={{float:"left",position:"relative",marginLeft:"70px",paddingTop:"10px"}}
                />
                            
                </CardBody>
            </Card>

        </div>);
    }
}
 
export default Weather ;