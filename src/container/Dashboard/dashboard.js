import React, { Component } from 'react';
import { Container,Card,CardBody,CardText, Row, Col} from 'reactstrap';
import StyleRecomendations from '../../components/dashboard/styleRecomendation';
import MyTasks from '../../components/dashboard/myTasks';
import MyMessages from '../../components/dashboard/myMessages';
import InventoryMatrics from '../../components/dashboard/inventorymatrics';
import OrderFullfillment from '../../components/dashboard/orderFullfillment';
import NewArrival from '../../components/dashboard/newArrival';
import NotificationsAndActions from '../../components/dashboard/notificationsAndActions';
import RecentCustomers from '../../components/dashboard/recentCustomers';
import Notification from '../../components/dashboard/Notification';
import Messages from '../../components/dashboard/Messages';
import Summary from '../../components/dashboard/Summary';
import OrderDetails from '../../components/dashboard/OrderDetailsDashboard';
import ItemDetails from '../../components/dashboard/ItemDetails';
import CustomerList from '../../components/dashboard/CustomerList';


import PopularProducts from '../../components/dashboard/popularProducts';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {  
            CustomerID:"",
            ItemDetails:[],
            OrderHeaderKey:"",
            ItemCount:"",
            lenFromTrending:"",
            countfromtrendFlag:false,
            currentCount:0,
            lenfromOrderDetails:false
        }
    }
   

    getCustomerID=(CustomerID)=>{
        console.log(CustomerID);
        this.setState({
            CustomerID:CustomerID
        })
        console.log("customer id from child compoennt is:::",this.state.CustomerID);

    }
    getOrderHeaderKey=(OrderHeaderKey)=>{
        console.log("OrderHeaderKey from OrderDetailsDahboard component::::: ",OrderHeaderKey);
        this.setState({
            OrderHeaderKey:OrderHeaderKey
        })
    }
    getItemCount=(itemCount)=>{
        console.log("ItemCount is:: ",itemCount);
        var currentcnt = this.state.currentCount;
        if(this.state.countfromtrendFlag){
            
            // var lengthfromtrending = this.state.lenFromTrending;
            currentcnt = currentcnt+itemCount;
           console.log("current count after len from trending:: ",currentcnt);
           this.setState({
               currentCount:currentcnt,
               lenfromOrderDetails:true

           })
        }
        else{
            const count = currentcnt;
            const cnt = count + parseInt(itemCount) ;
            console.log("count is:::: ",cnt);
        this.setState({
            currentCount:cnt,
            lenfromOrderDetails:true
        })
    }
    }
    getlenghtFromtrending=(len)=>{
        console.log("lenght from trendng is:::",len);
        if(this.state.lenfromOrderDetails){
            var currCnt = this.state.currentCount;
            currCnt = currCnt+parseInt(len);
            this.setState({
                currentCount:currCnt,
                countfromtrendFlag:true
            })
        }
        else{
            this.setState({
                currentCount:len,
                countfromtrendFlag:true
            })
        }
        
    }
    render() { 
        return (
          <Container  fluid={true}>
                <Card>
            <CardBody>
            <Row>
                 <Col md="3" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                 <CustomerList customerid={this.getCustomerID}/>
                 {/* <CustomerList/> */}
                 </Col>
                 <Col md="9">
               <Row sm="3" style={{paddingLeft:"8px",paddingRight:"8px"}}>
                    <Col>
                    <Notification/>
                    </Col>
                    <Col style={{paddingLeft:"8px",paddingRight:"8px"}}>
                    <Messages/>
                    </Col>
                    <Col style={{paddingLeft:"0px",paddingRight:"0px"}}>
                    <Summary currentCount={this.state.currentCount} orderHeaderKey={this.state.OrderHeaderKey} customerId={this.state.CustomerID}/>
                    </Col>
                </Row>
                <Row sm="2">
                    <Col style={{paddingTop:"2%",paddingLeft:"8px",paddingRight:"8px"}}>
                    <OrderDetails customerID={this.state.CustomerID} OrderHeaderKeyFn={this.getOrderHeaderKey} ItemCount={this.getItemCount}/>
                    {/* <OrderDetails/> */}
                    </Col>
                    <Col style={{paddingTop:"2%"}}>
                    <ItemDetails OrderHeaderKey={this.state.OrderHeaderKey} getLenghtFromTrending={this.getlenghtFromtrending}/>
                    </Col>
                    {this.getCustomerID}
                </Row>
                </Col>
             </Row>        
                    </CardBody>
                 </Card>
          </Container>);
    }
}
 
export default Dashboard;