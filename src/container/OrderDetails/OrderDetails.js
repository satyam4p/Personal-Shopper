import React,{Component} from 'react';
import {CardImg,Button,Table,Input,Card,CardBody,CardText,Row,Col,CardTitle,Container} from 'reactstrap';
import './OrderDetails.css';
import axios from 'axios';
import ItemDetails from '../../components/OrderDetails/ItemDetails';
import ItemImg from '../../images/image1.png';
import SearchIcon from '../../images/Search-512.png';
//import Products from '../Products/ItemList';


export default class CompleteOrderDeatails extends Component{
    
    constructor(props){
        super(props);
        this.state={
            OrderDetails:[],
            OrderLines:[],
            fetched:false,
            OrderDate:"",
            value1:"",
            ItemList:[]
        }
  
    }
    componentWillMount(){
        // const {orders}  = this.props.location.state;
        console.log("asd ",this.props)
        const key = window.location.search;
        const params = new URLSearchParams(key);
        const OrderHeaderKey = params.get('key');
        console.log("orderheaderKey: ",OrderHeaderKey);
        const inputData = {
            InputXML:{
                OrderHeaderKey:OrderHeaderKey
            },           
            ApiName:"getOrderDetails"
        }
        const reqData = {
            method:"POST",
            //url:`http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            data:JSON.stringify(inputData),
            headers:{
                "Content-Type":"application/json",
                // "X-CSRFToken":window.AppInfo.bridgecsrftoken
            }
        }
        axios(reqData).then(res =>{
            console.log("response data is: ",res.data);
            console.log("Orderline in data: ",res.data.OrderLines.OrderLine);
            this.setState({
                OrderDetails:res.data,
                OrderLines:res.data.OrderLines.OrderLine,
                OrderDate:res.data.OrderDate
            })
        }).catch(err=>{
            this.setState({
                fetched:false
            })
            console.log("An error occured",err);
        })
        const data = {
            InputXML:{
                EnterpriseCode:"S-MART"
            },           
            ApiName:"getItemList"
        }
        console.log("props are: ",this.props);
        const ent = JSON.stringify(data.EnterpriseCode);
        console.log(ent);
        const reqdata = {
            method:"POST",
            //url:`http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            data:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
    }
    axios(reqdata).then(res => {
        console.log("items are: ",res.data);
        const itemList = res.data.Item;  
        console.log("Itemlist: ",itemList);
        this.setState({
            ItemList:itemList
        }) 
        
    })
        
    }
    updatedItemDetails =(val)=>{

        console.log("ItemDetails: ",val);
        console.log("THe Order Details are: ",this.state.OrderDetails);
        console.log("OrderLines in order are: ",this.state.OrderLines);
        const len = this.state.OrderLines.length;
        console.log("length is: ",len);
        const ItemID = val.ItemID;
        const UOM=val.UnitOfMeasure;
        console.log("Unit of measure: ",UOM);
        console.log("ItemID fetched is: ",ItemID);
        const unitPrice=val.PrimaryInformation.UnitCost;
        // const primeLinesNo = this.state.OrderLines.PrimeLineNo;
        const LastPrimeLineNo = this.state.OrderLines[len-1].PrimeLineNo;
        const newPrimeLineNo =  parseInt(LastPrimeLineNo)+1;
        // {
        //     "@OrderHeaderKey": "2019111916132684743",
        //     "@OrderNo": "Y100000301",
        //     "@Override": "Y",
        //     "OrderLines": {
        //        "OrderLine": {
        //           "@Action": "CREATE",
        //           "@DeliveryMethod": "SHP",
        //           "@ItemGroupCode": "PROD",
        //           "@OrderedQty": "1.0",
        //           "@SCAC": "",
        //           "@PrimeLineNo": "6",
        //           "@SubLineNo": "1",
        //           "Instructions": [],
        //           "Item": {
        //              "@ItemID": "NOR-01",
        //              "@UnitOfMeasure": "EACH"
        //           },
        //           "LinePriceInfo": {
        //              "@IsPriceLocked": "Y",
        //              "@ListPrice": "0.00",
        //              "@UnitPrice": "0.00"
        //           }
        //        }
        //     }
        //  }
        const CustomOrderLine = {
            "@Action":"CREATE",
            "@OrderedQty":"1",
            "@PrimeLineNo":newPrimeLineNo,

            DeliveryMethod:"SHP",
            Item:{
                ItemID:ItemID,
                UnitOfMeasure:UOM
            },
            LinePriceInfo:{
                IsPriceLocked:"Y",
                UnitPrice:unitPrice  
            }
        }
        const Orderlines = this.state.OrderLines;
        Orderlines.push(CustomOrderLine);
        this.setState({
            OrderLines:Orderlines,
            OrderLinesAdded:true
        })
        console.log("updated OrderLines are: ",this.state.OrderLines);

        

        // console.log("itemIDs:",val);

    }
    MapItemDetails=()=>{
        console.log("OrderLines mapping: ",this.state.OrderLines);
        if(this.state.OrderLines){
            return this.state.OrderLines.map((Items,index)=>{
                const {ItemID,ItemDesc}=Items
                console.log("Items: ",Items)
                console.log("Item is: ",Items.Item.ItemID); 
                return(
                <Card key={index} style={{width:"90%",marginBottom:"3px",height:"40%"}} >
                <div style={{marginRight:"7px",marginBottom:"7px"}}>
                     <CardText style={{textAlign:"Center",fontSize:"20px",fontWeight:"bold"}}>ITEMID: <CardText style={{color:"blue",display:"inline"}}>{Items.Item.ItemID}</CardText></CardText>
                     <CardImg className="ItemImage"  src={ItemImg}/>
                     <CardText style={{textAlign:"left",marginLeft:"5px",fontWeight:"bold"}}>ItemDescription:<CardText style={{color:"blue",display:"inline",fontWeight:"normal"}}> Tracking Shoes{Items.Item.ItemDesc}</CardText></CardText>
                     <CardText style={{textAlign:"left",marginLeft:"5px",fontWeight:"bold"}}>Unit Price: </CardText>
                     <CardText style={{textAlign:"left",marginLeft:"5px",fontWeight:"bold"}}>Cutomer Discount: </CardText>
                     <Button  outline color="secondary" style={{width:"20%",display:"inline",float:"right",color:"black"}}>Modify</Button>
                     <CardText style={{textAlign:"left",marginLeft:"5px",fontWeight:"bold"}}>Line Total: </CardText>
                     
                     </div> 
                </Card>)
            })
        }
    }
    getOrderDate(orderDate){ 
        console.log("inside date func: ",orderDate);
        if (orderDate) {
            console.log("inside if:");
            var year = orderDate.substring(0, 4);
            var month = orderDate.substring(5, 7);
            var day = orderDate.substring(8, 10);
            var val = month + "/" + day + "/" + year;
            return val;
      }
  
    }
    MapItems=()=>{
        console.log("Inside map method");
        console.log("state: ",this.state.ItemList)
        if(this.state.ItemList){
            return this.state.ItemList.map((ItemId,index)=>{
                const {ItemID,ItemKey}=ItemId
                return(
                   
                    <div style={{float:"left",width:"45%",marginLeft:"15px",marginTop:"10px"}}>
                    <Card style={{marginBottom:"5px"}} key={ItemKey}>
                   
                    <CardBody>
                        <CardTitle className="StyleGroupTitle">ACCESSORIES</CardTitle>
                        <CardImg className="StyleCardImg" top width="50%" src={image} alt=" " /> 
                        <div className="StyleGroupSubTitleDiv">
                        <CardSubtitle className="StyleGrpNameSubTitle" style={{fontWeight:"Bold"}}>Product</CardSubtitle><br></br>
                        <CardText className="productText" style={
                            {
                                textAlign:"left",
                                color:"blue"
                            
                            }
                        }>{ItemID}</CardText><br></br>
                        </div>
                        <CardSubtitle className="ProductsCardSubTitle">Size option</CardSubtitle>
                        <CardSubtitle className="ProductsCardSubTitle">Color options</CardSubtitle>
                        <CardSubtitle className="ProductsCardSubTitle">Availability</CardSubtitle>
                        <Button outline color="secondary" style={{float:"right",marginBottom:"5px",color:"black"}} onClick={this.updatedItemDetail}>Add</Button>
                        </CardBody>
                  
                    </Card>
                    </div>
                 
                )
            })
        }

    }
 
    render(){
        return(
            <div>
               <Card className="OrderDetailsHeader">
                    <h1>ORDER DETAILS</h1>    
                </Card><br></br>
                <Container fluid={true}>
                <h4 className="OrderNoHead">Order Number: {this.state.OrderDetails.OrderNo}</h4><br/><br/>
                <Card className="OrderDetails">
                {/* <Card className="details">
                <div className="statusDiv">
                <h3>Status: {this.state.OrderDetails.Status}</h3>
                <h3>OrderDate: {this.getOrderDate(this.state.OrderDate)}</h3>
                <h3>Payment Status:</h3>
                <h3>CutomerID:</h3>
                </div>
                </Card>
                <Card>
                <div className="statusDiv">
                <h3>Customer League:</h3>
                <h3>Gender:</h3>
                <h3>Age:</h3>
                <h3>Preferences1:</h3>
                </div>
                </Card> */}
                <Row>
                <Col sm="3">
                    <Card body className="detailsCard">
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>OrderNo: <p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}>{this.state.OrderDetails.OrderNo}</p></CardText> 
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Status: <p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}>{this.state.OrderDetails.Status}</p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>OrderDate: <p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}>{this.getOrderDate(this.state.OrderDate)}</p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Payment Status: <p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}></p></CardText>
                    </Card>
                </Col>
                <Col sm="3">
                    <Card body className="detailsCard">
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>CutomerID:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}></p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Customer League:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}> Sample League</p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Gender:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}> Male</p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Age: <p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}>23</p></CardText>
                    </Card>
                </Col>
                <Col sm="3">
                    <Card body className="detailsCard">
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Subscription Program:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}> Gold</p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Subscription Type:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}> Monthly</p></CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Subscription Interval:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}></p> </CardText>
                    <CardText style={{textAlign:"left",fontWeight:"bold"}}>Subscription Date:<p style={{textAlign:"left",display:"inline",fontWeight:"normal"}}></p> </CardText>
                    </Card>
                </Col>
                <Col>
                <div style={{width:"60%",marginLeft:"20%"}}>
                <Button outline color="secondary" style={{marginTop:"7px",color:"black",width:"100%"}}>Send To Customer</Button><br/>
                <Button outline color="secondary" style={{marginTop:"7px",color:"black",width:"100%"}}>Notes</Button><br/>
                <Button outline color="secondary" style={{marginTop:"7px",color:"black",width:"100%"}}>Cancel Order</Button><br/>
                <Button outline color="secondary" style={{marginTop:"7px",color:"black",width:"100%"}}>Customer Preferences</Button>
                </div>
                </Col>
                </Row>
                </Card>
              
                <Row>
                <Col md="6">
            
                <Card className="ItemDetailsCard" >
                <CardBody>
                   {this.MapItemDetails()}
                   </CardBody>
                </Card>
                </Col>
                <Col md="6">
              
                <Card className="ProductsCard" >
                    <CardBody>
                        <CardTitle style={{fontSize:"20px",fontWeight:"bold",float:"left",marginLeft:"2px"}}>Browse Products</CardTitle>
                        <Input type="text" className="1" style={{width:"40%",float:"right"}} placeholder="Search"><img src={SearchIcon}/></Input>
                        {/* <Products /> */}
                        <div className="cardsDiv"> 
                        <div>
                        <Card style={{width:"100%"}}>
                        <div>
                        {this.MapItems()}
                        </div>
                        </Card>
                
                        </div>
                    
            </div>

                    </CardBody>
                </Card>
                </Col>
                </Row>
                </Container>
            </div>
        )
    }
}