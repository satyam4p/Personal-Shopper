import React,{Component} from 'react';
import {Button,Card,Input,Label,CardHeader,
    Form,FormGroup,Table,Container, Row, Col,DropdownItem,DropdownToggle,DropdownMenu,ButtonDropdown} from 'reactstrap';


import './OrderSearchscr.css';
// import Table from './Table';
import axios from 'axios';

import {Link} from 'react-router-dom';  
// import {Link} from 'react-router';


export default class orderSearch extends Component{
    data=[];
    constructor(props){
        super(props);
        this.state={
            OrderList:[],
            fetched:false,
            currentOrder:"",
            dropdown:false,
            status:"",
            statusValue:"",
            isOpen:false,
    
        }
    }
    componentDidMount(){
        // const inputData = {
        //     InputXML:{
        //         EnterpriseCode:"S-MART"
        //     },            
        //     ApiName:"getOrderList",
        //     IsService:"N"
        // }
        const inputData = {
            InputXML:{
            Order:{

            }
            },            
            ApiName:"PSGetNewOrdersForStylist",
            IsService:"Y"
        }
        console.log("post object is: ",inputData);
        // axios(reqData).then(res =>{
        //     console.log("response data is: ",res.data.Order);
            
        //     this.data = res.data.Order;
        //     this.setState({
        //         OrderList:this.data,
        //         fetched:true  
        //     })
        //     console.log("value of data is:",this.data);
        // }).catch(err=>{
        //     this.setState({
        //         fetched:false
        //     })
        //     console.log("an error occured");
        // })

    }

      columns =
        [{
         
            Header:'OrderNo',
            accessor:'OrderNo'
         },
         {
             Header:'Status',
             accessor:'Status'
         },
         {
             Header:'DocumentType',
             accessor:'DocumentType'
         }

        ]
     
        handleSubmit=(event)=>{
            event.preventDefault();
            
            const OrderNo = event.target.OrderNo.value;
            const Status = this.state.status;
            const EnterpriseCode = event.target.EnterpriseCode.value;
            const customerID = event.target.CustomerID.value
            console.log("Orderno and status are: ",OrderNo);
            console.log("Status value is:",Status );
            console.log("EnterpriseCode value is:",EnterpriseCode );
            console.log("customerID value is:",customerID );
            console.log("submitted");
            const inputData = {
                InputXML:{
                    Order:{
                    EnterpriseCode:EnterpriseCode,
                    OrderNo:OrderNo,
                    Status:Status,
                    LatestFirst:"Y",
                    Extn:{
                        ExtnCustomerID:customerID  
                        // Customer1
                    }
                }
                },               
                ApiName:"PSGetNewOrdersForStylist",
                IsService:"Y"
            }
            console.log("post object is: ",inputData);
            const reqData = {
                method:"POST",
                // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
                //url:`http://localhost:5000/api`,
                url: `http://207.148.123.221:5000/api`,
                data:JSON.stringify(inputData),
                headers:{
                    "Content-Type":"application/json",
                    // "X-CSRFToken":window.AppInfo.bridgecsrftoken
                }
              
            }
            axios(reqData).then(res =>{
                console.log("response data is: ",res.data.Order);
                
                this.data = res.data.Order;
                this.setState({
                    OrderList:this.data,
                    fetched:true  
                })
                console.log("value of data is:",this.data);
            }).catch(err=>{
                this.setState({
                    fetched:false
                })
                console.log("An error occured",err);
            })
    
           
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
        
        renderTableData=()=>{
            
            console.log("inside function")
                if(this.state.fetched){
                    console.log("inside if condition of fetched");
                    if(this.state.OrderList){
                    return this.state.OrderList.map((orders, index) => {
                        const {OrderNo , Status,OrderDate,EnterpriseCode, DocumentType,OrderHeaderKey} = orders 
                        console.log("orders: ",orders);
                        return (
                             <tr className="tableRows" key={OrderNo}>
                                        <td className="tableData">
                                        <Link  style={{color:"rgba(4,71,132)"}} size="xs" to={{ pathname: `/GetCompleteOrderDetails/OrderHeaderKey?customerid=${orders.Extn.ExtnCustomerID}=ohk=${OrderHeaderKey}`,Order:orders }}>
                                        {OrderNo}
                                        </Link> 
                                        </td>
                                        <td>{Status}</td>
                                        <td>{EnterpriseCode}</td>
                                        <td>{orders.Extn.ExtnCustomerID}</td>
                                        <td>{DocumentType}</td>
                                        <td>{this.getOrderDate(OrderDate)}</td>
                                    </tr>    
                               
                        )
                     })   
                }
            }
        }
        dropdownHandle=()=>{
            this.setState({
                dropdown:!this.state.dropdown
            })
        }
        handleClick=(event)=>{
            const statusVal = event.target.value;
            console.log("status is::: ",statusVal);
            if(statusVal === 1000){
                this.setState({
                    status:statusVal,
                    statusValue:"Draft Order"
                })
            }
            if(statusVal === 1100){
                this.setState({
                    status:statusVal,
                    statusValue:"Created"
                })
            }
            if(statusVal === 3700){
                this.setState({
                    status:statusVal,
                    statusValue:"Shipped"
                })
            }
            if(statusVal === ""){
                this.setState({
                    status:"",
                    statusValue:"All"
                })
            }
           
            console.log("this.state.status is: ",this.state.status);
        }
        toggle = ()=>{
            this.setState({
                isOpen:!this.state.isOpen
            })
        }
        updateModal(isVisible) {
            this.setState({
                 isVisible : isVisible
            })
          this.forceUpdate();
        }
        render(){
        return(
            <div>
            <Card className="headerCard" >
                 <h2 style={{float:"left",paddingLeft:"15px"}}>NEW SUBSCRIPTION ORDERS</h2>
                 </Card> 
                 <Container fluid={true}>
                 <Row>
                 <br/>
                 {/* <Button style={{backgroundColor:"white",color:"blueviolet",width:"5%",height:"5%"}} onClick={this.toggle.bind(this)}>Search Orders</Button>                 <br/> */}
                 {/* <Collapse isOpen={this.state.isOpen}> */}
                
                 <Col md="3" style={{width:"inherit",}}>
                 <Card className="searchBoxCard">
                <CardHeader style={{float:"left",fontWeight:"bold",fontSize:"1rem",backgroundColor:"rgba(56, 234, 247, 0.37)",color:"rgba(4,71,132) "}}>Order Search</CardHeader>
                <Form onSubmit={this.handleSubmit.bind(this)} className="SearchForm">
                <FormGroup>
                    <Label for="OrderNo" className="OrderNoLAbel">Order Number</Label><br/>
                    <Input  type="text" name="orderno" className="inputgroupdiv" id="OrderNo" placeholder="OrderNo" /><br/><br/>
                    <Label for="EnterpriseCode" className="EnterpriseCodeLabel">EnterpriseCode</Label><br/>
                    <Input  type="text" name="EnterpriseCode" className="inputgroupdiv" id="Enterprise" placeholder="EnterpriseCode" /><br/><br/>
                    <Label for="CustomerID" className="CustomerIDLabel">Customer ID</Label><br/>
                    <Input type="text" name="CustomerID" className="inputgroupdiv" id="CustomerID" placeholder="CustomerID"/>
                    <div style={{width:"fit-content"}}>
                    <Label className="StatusLabel">Status</Label><br/>
                    <ButtonDropdown  style = {{marginTop:"5px"}} direction="right" isOpen={this.state.dropdown} toggle={this.dropdownHandle} >
                   
                    <DropdownToggle style={{backgroundColor:"white",color:"rgba(4,71,132)"}} caret>
                        {this.state.statusValue ? this.state.statusValue: "Status"}
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem className="DropDownItem" itemID onClick={this.handleClick.bind(this)} value="1100">Created</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="DropDownItem" onClick={this.handleClick.bind(this)} value="1000">Draft Order</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="DropDownItem" onClick={this.handleClick.bind(this)} value="3700">Shipped</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="DropDownItem" onClick={this.handleClick.bind(this)} value="">All</DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                    </div>
                    {/* <Label for="Status" className="StatusLabel">Status</Label><br/>
                    <Input type="text" name="status" className="StatusDiv" id="Status" placeholder="Status" /> */}
                </FormGroup><br/>
                <Button className="SubmitButton">Search</Button>
                {/* <Button onClick={this.toggle} className="CloseButton">Close</Button> */}
                </Form> <br/> 
                
                 </Card>
                 </Col> 
                 {/* </Collapse> */}
               
                 <Col md="9">
                 <Card className="TableCard">
            <Table responsive striped bordered hover sm="md">
            
                <thead className="tableHeaderCard">
                
                    <tr>
                    
                    <th className="tableHeader">Order Number</th>
                    <th className="tableHeader">Order Status</th>
                    <th className="tableHeader">EnterpriseCode</th>
                    <th className="tableHeader">CustomerID</th>
                    <th className="tableHeader">DocumentType</th>
                    <th className="tableHeader">Order Date</th>
                
                    </tr>
              
                </thead> 
                <tbody>
                {this.renderTableData()}
                </tbody>
            </Table>
            </Card>
            </Col>
            </Row>
            </Container> 
           
           
               
            </div>
        )
    }
}
