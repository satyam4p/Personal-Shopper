import React,{Component} from 'react';
import { Row,Col,Card,CardBody,Button,Container,Input,Table } from 'reactstrap';
import Viewsubscription from "../../components/subscriptions/viewSubscription"
import AddNewSubscription from "../../components/subscriptions/AddNewSubscriptionForm";


  class Subscription extends Component{
    state = {
        subdata: [
          {programme:"Gold Weekly Programme", name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "12/11/2019", customers:"5" },
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "16/10/2019" , customers:"5"},
          {programme:"Gold Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Gold Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Gold Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "16/10/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "16/10/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "16/10/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "16/10/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "16/10/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"},
          {programme:"Platinium Weekly Programme" ,name: "Slim Fit,Outgoing, Active Wear", staus: "Active", date: "30/09/2019" , customers:"5"}

        ],
        viewType: "List View",
        viewListType: false,
        addNewSub: "ADD",
        add: false
    }
        addNewSubForm =() =>{
            return(
                <AddNewSubscription />
            )
            
        }
        viewTypeChange =props =>{
            const listType = this.state.viewListType;
            const add= this.state.add;
            if (!props){
                this.setState({ viewListType: !listType });
                this.setState({ viewType: "Grid View" });
            }
            else if(props==="ADD"){
                this.setState({ add: !add });
            }
            else{
                this.setState({ viewListType: !listType });
                this.setState({ viewType: "List View" });
            }
            
        };
        toViewSubscription = () =>  {
            const viewType = this.state.viewListType;
            console.log(viewType)
            console.log("view Subscription method got hit");
            if(!viewType){
                return this.state.subdata.map((subs,index) => {
                    return (
                            <Viewsubscription key={index} programme={subs.programme} name={subs.name} staus={subs.staus} date={subs.date}
                            customers={subs.customers} type={this.state.viewListType}/>
                        );
                });
            }
            else{
                return( 
                    <Table  responsive striped bordered hover sm="md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subscription Programme</th>
                            <th>Subscription Name</th>
                            <th>Subscription Staus</th>
                            <th>Starts From</th>
                            <th>Customers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subdata.map( (data, index) => {
                            console.log(index)
                            return(
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{data.programme}</td>
                                <td>{data.name}</td>
                                <td>{data.staus}</td>
                                <td>{data.date}</td>
                                <td>{data.customers}</td>
                            </tr>
                            )
                            
                        })}
                    </tbody>
                </Table>
                )
        }}
        
       render(){
        return ( <div>
            <Card>
                <CardBody> 
                    <Row className="buttonSubscription">
                        <Col md="3">
                    <h3>Subscription</h3> 
                    </Col>
                    <Col md="6" >  
                        <Button outline color="secondary"  id="Popover1" onClick={()=>this.viewTypeChange("ADD")}>Add New</Button>{' '}
                        <Button outline color="secondary" onClick={()=>this.viewTypeChange(this.state.viewListType)}>{this.state.viewType}</Button>{' '}
                        <Button outline color="secondary">Upload</Button>{' '}
                        </Col>
                        <Col md="3">
                        <Input className="inputSearch" placeholder="Type to Search" />
                    </Col>
                    </Row>
                </CardBody> 
            </Card>
            {this.addNewSubForm()}
            <Container className="containerSub1" fluid={true}> 
                <Card body outline color="secondry" className="Cards">
                    <Row>
                      { this.toViewSubscription()}
                    </Row>
                </Card> 
           
            </Container>
        </div> );
        }

}
export default Subscription;