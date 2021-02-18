import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText} from 'reactstrap';
import msg from '../../components/dashboard/images/msg.png';
import './dashboard.css';
class MyMessages extends Component {
    constructor(props){
        super(props)
        this.state = {
            Messages:{
                CustomerMessage:"I did not like the previous outfits suggestions.Send a new One..."
            }
        }
    }

    getCustomerMessage=()=>{
     if( this.state.Messages.CustomerMessage!==''){
            return this.state.Messages.CustomerMessage;               
       }
    }
    render() { 
        const message=this.getCustomerMessage();
        return ( <div>
           <Card className="MyMessageClass">
                <CardBody className="">
                <CardTitle className="title"><img className="imgSize" src={msg} alt=""/><b> MY MESSAGES</b></CardTitle>
                <CardText className="CardText">Message:{message}</CardText>


                </CardBody>
            </Card>

        </div>);
    }
}
 
export default MyMessages ;