import React, { Component } from 'react';
import {Card,CardBody,CardSubtitle,CardHeader} from 'reactstrap';
import './dashboard.css';
import axios from 'axios';
class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            customerList:[],
            cardcliked:false,
            cardActive:""
          }
        }
        componentDidMount(){
            const data = {
                InputXML: {
                    "ExtnCustomerSubscription":{
                        "ExtnStylistID":"Stylist1"
                    } 
                },
                ApiName: "PSGetCustomerListForStylist",
                IsService: "Y"
                }
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
                console.log("response from get customer list service::",res.data);
                this.setState({
                    customerList:res.data.ExtnCustomerSubscription
                })
                console.log("the customer list instate is::",this.state.customerList);
            }).catch(error =>{
                console.log("an error occurred: ",error);
            })
        


    }
    mapCustomers=()=>{
        console.log("the customer list in mapcustomer function::: ",this.state.customerList);
        if(this.state.customerList){
            return this.state.customerList.map((customer,index)=>{
                const {ExtnCustomerID,ExtnSubscriptionDate,ExtnSubscriptionEndDate,ExtnSubscriptionProgram}=customer;
                return(
                    <Card key={index} style={{marginBottom:"10px"}} onClick={()=>{this.getCustomerID(ExtnCustomerID)}}>
                    {/* <Card style={{marginBottom:"10px"}} > */}
                    <div className={ExtnCustomerID===this.state.cardActive ? "ActiveCard":"CardInactive"}>
                        <CardHeader className="CardHeaderClassWide10">
                           <p>{ExtnCustomerID}</p> 
                            </CardHeader>
                        <div style={{padding:"5px",backgroundColor:"rgba(0,0,0,0.03)"}}>
                        <div>
                        <CardSubtitle style={{textAlign:"left", fontSize:"13px",fontWeight:"200",fontFamily:"IBM Plex Sans",color:"grey"}}>Subscription: </CardSubtitle><CardSubtitle style={{textAlign:"right", fontSize:"13px",fontWeight:"200",color:"rgba(4,71,132)",fontFamily:"IBM Plex Sans"}}>{ExtnSubscriptionProgram}</CardSubtitle>
                        </div>
                        <div>
                        <CardSubtitle style={{textAlign:"left",fontSize:"13px",fontWeight:"200",fontFamily:"IBM Plex Sans",color:"grey"}}>Start Date:</CardSubtitle><CardSubtitle style={{textAlign:"right",fontSize:"13px",fontWeight:"200",color:"rgba(4,71,132)",fontFamily:"IBM Plex Sans"}}>{this.getOrderDate(ExtnSubscriptionDate)}</CardSubtitle>
                        </div>
                        <div>
                        <CardSubtitle style={{textAlign:"left",fontSize:"13px",fontWeight:"200",fontFamily:"IBM Plex Sans",color:"grey"}}>End Date:</CardSubtitle><CardSubtitle style={{textAlign:"right",fontSize:"13px",fontWeight:"200",color:"rgba(4,71,132)",fontFamily:"IBM Plex Sans"}}>{this.getOrderDate(ExtnSubscriptionEndDate)}</CardSubtitle>
                        </div>
                        </div>
                        </div>
                    </Card>
                )
            })
        }
    }
    getOrderDate(orderDate) {
        console.log("inside date func: ", orderDate);
        if (orderDate) {
            console.log("inside if:");
            var year = orderDate.substring(0, 4);
            var month = orderDate.substring(5, 7);
            var day = orderDate.substring(8, 10);
            var val = month + "/" + day + "/" + year;
            return val;
        }

    }
    getCustomerID=(customerID)=>{
        console.log("Card header clicked:: ",customerID);
        this.props.customerid(customerID);
        this.setState({
            cardcliked:true,
            cardActive:customerID
        })

    }
    render() { 
        return ( <div>
            <Card className="customerListCard">
            <CardHeader className="CardHeaderClassWide">
                    <p>CUSTOMER LIST</p>
                </CardHeader>
                <CardBody className="stylerecomend" style={{height:"503px",paddingLeft:"8px",paddingRight:"8px",paddingTop:"2%"}}>
                {this.mapCustomers()}

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default CustomerList ;