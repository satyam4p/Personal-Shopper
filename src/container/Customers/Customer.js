import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,  Input, CardHeader } from 'reactstrap';
import {
  Card, CardText,CardBody, CardSubtitle, Container,Row, Col ,Table
} from 'reactstrap';
import './customers.css';
import {MdReorder,MdViewModule} from 'react-icons/md';
import axios from 'axios';

class Customer extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            Customers:[{
                league:"GOLD LEAGUE",
                FirstName:"Alex",
                LastName:"",
                Sex_Age:"MALE-22",
                Size:"L",
                Colour_Preferences:"Steel Grey",
                Subscriptions:"Active"

            },

            {
                league:"PLATINUM LEAGUE",
                FirstName:"Rick",
                LastName:"",
                Sex_Age:"MALE-22",
                Size:"L",
                Colour_Preferences:"Yellow",
                Subscriptions:"Active"

            },
            {
                league:"SILVER LEAGUE",
                FirstName:"Nate",
                LastName:"Diaz",
                Sex_Age:"MALE-22",
                Size:"L",
                Colour_Preferences:"Red OliveGreen",
                Subscriptions:"Active"

            },{
                league:"PLATINUM LEAGUE",
                FirstName:"Saurabh",
                LastName:"Srivastava",
                Sex_Age:"MALE-22",
                Size:"L",
                Colour_Preferences:"Green Blue",
                Subscriptions:"Active"

            },
            {
                league:"GOLD LEAGUE",
                FirstName:"Alokit",
                LastName:"Jain",
                Sex_Age:"MALE-22",
                Size:"L",
                Colour_Preferences:"Red",
                Subscriptions:"Active"

            },
            {
                league:"SILVER LEAGUE",
                FirstName:"Sameer",
                LastName:"Malik",
                Sex_Age:"MALE-42",
                Size:"L",
                Colour_Preferences:"Black Grey",
                Subscriptions:"Active"

            },
            {
                league:"SILVER LEAGUE",
                FirstName:"Satyam",
                LastName:"Kumar",
                Sex_Age:"MALE-22",
                Size:"L",
                Colour_Preferences:"Red Green Blue",
                Subscriptions:"Active"

            }
        
        ],
        viewType: "List View",
        viewListType: false,
        listview:false,
        names:[]
        }
    }
    componentWillMount(){
        const data = {
            InputXML: {
                EnterpriseCode:"S-MART"
            },
            
            ApiName: "getItemList",
            // ApiName:"PSUpdateDraftOrder",
            IsService: "N"
        }
        const ent = JSON.stringify(data.EnterpriseCode);
        console.log(ent);
        const reqData = {
            method:"POST",
            url:`http://localhost:5000/survey`,
            data:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
    }
    axios(reqData).then(res => {
        console.log(res.data);
        const itemList = res.data.Item;
        this.setState({
            ItemList:itemList
        })
     
    })
    }



    viewTypeChange =props =>{
        const listType = this.state.viewListType;
        if (!props){
            this.setState({ viewListType: !listType });
            this.setState({ viewType: "Grid View" });
        }
        else{
            this.setState({ viewListType: !listType });
            this.setState({ viewType: "List View" });
        }
        
    };



    getCustomerDetails=()=>{
            if(this.state.names.length===0){
            return this.state.Customers.map((customer,index)=>{
                const {league,FirstName,LastName,Sex_Age,Size,Colour_Preferences,Subscriptions} = customer;
                return(
                    
                   
                   <Col md="3" key={index}>
                    <Card className="StyleCard">
                   
                    <CardHeader className="StyleGroupTitle">{league}</CardHeader>
                    <CardBody>
                    <CardSubtitle style={{textAlign:"left",color:"grey",fontWeight:"bold"}}>Customer</CardSubtitle>
                    <CardText style={
                        {
                            textAlign:"left",color:"rgba(4,71,132)"
                        }
                    }>{FirstName} {LastName}</CardText>
                    
                    <CardSubtitle style={{textAlign:"left",float:"left",color:"grey",fontWeight:"bold" }}>Sex_Age:</CardSubtitle>
                    <CardSubtitle style={{textAlign:"left" ,float:"right",paddingRight:"30px",color:"grey",fontWeight:"bold"}}>Size:</CardSubtitle><br/>
                    <CardSubtitle style={{color:"rgba(4,71,132)",float:"left"}}>{Sex_Age}</CardSubtitle>
                    <CardSubtitle style={{color:"rgba(4,71,132)",float:"right",paddingRight:"50px"}}>{Size}</CardSubtitle><br/>
                    <CardSubtitle style={{textAlign:"left",color:"grey",fontWeight:"bold"}}>Color Preferences</CardSubtitle><CardSubtitle style={{textAlign:"left",color:"rgba(4,71,132)"}}>{Colour_Preferences}</CardSubtitle>&nbsp;
                    <CardSubtitle style={{textAlign:"left",color:"grey",fontWeight:"bold"}}>Subscriptions</CardSubtitle><CardSubtitle style={{textAlign:"left",color:"rgba(4,71,132)"}}>{Subscriptions}</CardSubtitle>
                    </CardBody>
                </Card><br/>    
                   </Col>
                  
                )
            })
    
}
else{
    return this.state.names.map((customer,index)=>{
        const {league,FirstName,LastName,Sex_Age,Size,Colour_Preferences,Subscriptions} = customer;
        return(
            
           
           <Col md="3" key={index}>
            <Card className="StyleCard">
          
            <CardHeader className="StyleGroupTitle">{league}</CardHeader>
            <CardBody>
            <CardSubtitle style={{textAlign:"left",color:"grey"}}>Customer</CardSubtitle>
            <CardText style={
                {
                    textAlign:"left",color:"rgba(4,71,132)"
                }
            }>{FirstName} {LastName}</CardText>
            
            <CardSubtitle style={{textAlign:"left",float:"left" }}>Sex_Age:</CardSubtitle>
            <CardSubtitle style={{textAlign:"left" ,float:"right",paddingRight:"30px"}}>Size:</CardSubtitle><br/>
            <CardSubtitle style={{color:"rgba(4,71,132)",float:"left",}}>{Sex_Age}</CardSubtitle>
            <CardSubtitle style={{color:"rgba(4,71,132)",float:"right",paddingRight:"50px"}}>{Size}</CardSubtitle><br/>
            <CardSubtitle style={{textAlign:"left"}}>Color Preferences</CardSubtitle><CardSubtitle style={{textAlign:"left",color:"rgba(4,71,132)"}}>{Colour_Preferences}</CardSubtitle>&nbsp;
            <CardSubtitle style={{textAlign:"left"}}>Subscriptions</CardSubtitle><CardSubtitle style={{textAlign:"left",color:"rgba(4,71,132)"}}>{Subscriptions}</CardSubtitle>
            </CardBody>
        </Card><br/>    
           </Col>
          
        )
    })

}
    }
changeView=()=>{
    console.log("list view clicked:::",this.state.listview);
    this.setState({
        listview:!this.state.listview
    })
}
getCustomerTable =()=>{
    return(
       
        <Table responsive striped bordered hover sm="md">
            <thead className="tableHeaderCard">
                
                <tr>
                
                <th className="tableHeader">League</th>
                <th className="tableHeader">Customer</th>
                <th className="tableHeader">Gender / Age</th>
                <th className="tableHeader">Size</th>
                <th className="tableHeader">Color Preferences</th>
                <th className="tableHeader">Status</th>
            
                </tr>
          
            </thead> 
            <tbody>
            {this.renderTableData()}
            </tbody>

        </Table>
        
    )
}
renderTableData=()=>{
    if(this.state.names.length===0){
    return this.state.Customers.map((val, index) => {
        const {league,FirstName,LastName,Sex_Age,Size,Colour_Preferences,Subscriptions} = val 
      
        return (
             <tr className="tableRows" key={index}>
                        <td className="tableData">{league}</td>
                        <td>{FirstName} {LastName}</td>
                        <td>{Sex_Age}</td>
                        <td>{Size}</td>
                        <td>{Colour_Preferences}</td>
                        <td>{Subscriptions}</td>
                    </tr>    
               
        )
     })
}
else{
    return this.state.names.map((val, index) => {
        const {league,FirstName,LastName,Sex_Age,Size,Colour_Preferences,Subscriptions} = val 
      
        return (
             <tr className="tableRows" key={index}>
                        <td className="tableData">{league}</td>
                        <td>{FirstName} {LastName}</td>
                        <td>{Sex_Age}</td>
                        <td>{Size}</td>
                        <td>{Colour_Preferences}</td>
                        <td>{Subscriptions}</td>
                    </tr>    
               
        )
     })

}
}

filterCustomers=(event)=>{
    console.log("items in the state are:",this.state.Customers );
    var updatedList = this.state.Customers;
    var len = updatedList.length;
    var customerList = [];
    for(var i = 0; i < len; i++){
        var firstname = updatedList[i].FirstName;
        customerList.push(firstname); 
    }
    console.log("IteIDList is: ",customerList);
    console.log("updatedlist var: ",updatedList);
    updatedList = updatedList.filter((name)=>{
    //  console.log("inside filter func item is: ",Item);
     console.log("filter to lowercase: ",name.FirstName.toLowerCase());
    return name.FirstName.toLowerCase().search(event.target.value.toLowerCase()) !==-1
    });
    console.log("updatedList: ",updatedList);
    this.setState({
        names:updatedList
    })
}
    render() {
        return ( <div style={{overflowX:"hidden" }}>
    
        <Card className="toolCard">
                <Row>
            <Col md="3"><h2 style={{float:"left",paddingLeft:"15px",paddingTop:"10px",fontSize:"20px",fontWeight:"800px",fontFamily:"IBM Plex Sans"}}>CUSTOMERS</h2></Col><Col md="3"></Col>
            <Col md="6" style={{paddingTop:"5px"}}>
          
                {/* <Button style={{float:"left",marginRight:"10px"}} outline color="secondary" >Add New</Button>
                <Button style={{float:"left",marginRight:"10px"}}  outline color="secondary">Upload</Button> */}      
                <Input style={{width:"40%",float:"right", border:"1px solid rgba(4,71,132)" }} className="form" onChange={this.filterCustomers} type="text" name="search" id="searchText" placeholder="Type to Search" />
                <Button className="ButtonClass10" style={{float:"right" ,marginRight:"10px",paddingBottom:"5px", border:"1px solid rgba(4,71,132)"}}   outline  onClick={this.changeView}>{!this.state.listview ? <MdReorder size={24}/>:<MdViewModule size={24}/>}</Button>
            </Col>
          
            </Row> 
            </Card>
            <Container fluid={true}>
            <div >
                    <Card style={{marginTop:"10px",alignSelf:"center",width:"90%",marginLeft:"70px",border:"none"}}>
                    { this.state.listview === false ? <Row md="4">{this.getCustomerDetails()}</Row> :this.getCustomerTable()}
                    </Card>
                    </div> 
                    </Container>
            </div> 
            );




    }
}

export default Customer;
