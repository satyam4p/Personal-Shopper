import React, { Component } from 'react';
import {Card,CardImg,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from './BarChart';
import './dashboard.css';
import axios from 'axios';
import MessageIcons from "./images/MessageIcons.jpg";
import MessageMidLine from "./images/MessageMidLine.jpg";

class Messages extends Component {
    constructor(props){
        super(props);
         this.state={
            NoteList:[]       
        }
    }

     /** APIcall to fetch MessageInfo during Pageload */
    componentDidMount(){
        
        const data = {
            InputXML :{
                Root : {
                    "ContactUser":"Saurabh"
                }
            },       
            ApiName:"PSGetStylistMessages",
            IsService:"Y"
        }

        //console.log("post object is:",inputData);
        const reqData = {
            method:"POST",
            url:`http://207.148.123.221:5000/api`,
            data:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        } 

        axios(reqData).then(res => {
            //console.log("MessageListInfo:"+res.data);
            this.setState({
                NoteList:res.data.Note
            })
        }).catch(err=>{            
            console.log("An error occured",err);
        })          
    }

    /** Display MessageInfo */
    MessageListInfo(MessageInfo, index) {
        return (<Card key={index} style={{margin:"5px", float: "left", backgroundColor: "rgba(0,0,0,0.03)", height: "50px", width: "260px"}}>
                    <CardText style={{padding:"0px",float:"left", fontSize:"10px"}}>
                        <CardText style={{padding:"0px", margin: "5px", float: "left"}}>{MessageInfo.NoteText}</CardText>
                        <CardImg style={{width:"auto",float:"right", padding: "5px 5px 0px 0px"}}  src={MessageIcons} alt=" " />
                        <CardImg style={{float:"left", height: "1px", width: "200px", paddingLeft: "5px"}}  src={MessageMidLine} alt=" " />
                        <CardText style={{paddingLeft: "5px", float:"left", clear:"left"}}>{MessageInfo.ContactUser}</CardText>
                    </CardText>      
                </Card>)
    }

    /** Iterate all the Message list */
    toViewMessageList = () =>  {

        if (this.state.NoteList){
            return this.state.NoteList.map((MessageInfo,index) => {  
                if (MessageInfo){
                    return ( 
                        this.MessageListInfo(MessageInfo, index)
                    )
                }
            });
        }
    }

    render() { 
        return ( <div>
            <Card style={{ overflowY:"auto",minHeight:"220px" }}>
                <CardHeader className="CardHeaderClassWide">    
                    <p>MESSAGES</p> 
                </CardHeader>
                <CardBody className="stylerecomend" style={{height:"150px", padding: "5px"}}>
                    {this.toViewMessageList()} 
                </CardBody>
            </Card>

        </div>);
    }
}
 
export default Messages ;