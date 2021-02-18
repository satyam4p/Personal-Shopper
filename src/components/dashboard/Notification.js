import React, { Component } from 'react';
import {Card,CardImg,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader} from 'reactstrap';
import MyChart from './BarChart';
import './dashboard.css';
import axios from 'axios';
import ConfirmedOrder from "./images/ConfirmedOrder.jpg";
import RequestModification from "./images/RequestModification.jpg";
import SignedUp from "./images/SignedUp.jpg";
import DefaultNotification from "./images/DefaultNotification.jpg";
import {NavLink,Route,Switch,BrowserRouter as Router} from 'react-router-dom';

class Notification extends Component {
    constructor(props){
        super(props);
         this.state={
            StylistTaskInfoList:[]       
        }
    }

    /** APIcall to fetch TaskInfo during Pageload */
    componentDidMount(){
        const data = {
            InputXML:{
                Root :{
                    "ExtnStylistID":"Stylist1"
                    },  
            },               
            ApiName:"PSGetStylistNotifications",
            IsService: "Y"
        }
        //console.log("post object is:",inputData);
        const reqData = {
            method:"POST",
            //url:`http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            data:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        } 

        axios(reqData).then(res => {
            console.log("ExtnStylistTaskInfo:",res.data);
            this.setState({
                StylistTaskInfoList:res.data.ExtnStylistTaskInfo
            })
        }).catch(err=>{            
            console.log("An error occured",err);
        })          
    }

    /** Display TaskInfo */
    StylistTaskListInfo(TaskInfo, index) {

        /** Identify the Image and Display it depends on Message */
        var vImgToDisplay = DefaultNotification;
        var vColorRGB = {
            textColor : {
                color: "rgb(33, 37, 41)",
                margin:"5px", 
                float:"left", 
                fontSize:"10px"
            }
        };

        if (TaskInfo.ExtnStylistTask.includes("requested modification")){
            vImgToDisplay = RequestModification;
            vColorRGB = {
                textColor : {
                    color: "rgb(60, 98, 143)",
                    margin:"5px", 
                    float:"left", 
                    fontSize:"10px"
                }
            };
            
        } else if (TaskInfo.ExtnStylistTask.includes("signed up")){
            vImgToDisplay = SignedUp;
            vColorRGB = {
                textColor : {
                    color: "rgb(37, 88, 138)",
                    margin:"5px", 
                    float:"left", 
                    fontSize:"10px"
                }
            };
            
        } else if (TaskInfo.ExtnStylistTask.includes("confirmed order")){
            vImgToDisplay = ConfirmedOrder;
            vColorRGB = {
                textColor : {
                    color: "rgb(19, 170, 24)",
                    margin:"5px", 
                    float:"left", 
                    fontSize:"10px"
                }
            };
        }

        return (<CardText key={index} style={vColorRGB.textColor}>
                    <CardImg style={{width:"20px",float:"left"}}  src={vImgToDisplay} alt={TaskInfo.ExtnStylistTask} /> 
                    {TaskInfo.ExtnStylistTask}                     
                </CardText>)
    }

    /** Iterate all the Stylist Tasks */
    toViewStylistTaskList = () =>  {           
        return this.state.StylistTaskInfoList.map((TaskInfo,index) => {  
            return (                
                this.StylistTaskListInfo(TaskInfo, index)
            )
        });
    }

    render() { 
        return ( <div>
            <Card style={{ overflowY:"auto",minHeight:"220px" }}>
                <CardHeader className="CardHeaderClassWide">
                  <p>NOTIFICATION</p>
               </CardHeader>
                <CardBody style={{padding:"0px", height:"150px"}} >              
                    {this.toViewStylistTaskList()}   
                </CardBody>
            </Card>

        </div>);
    }
}
 
export default Notification ;