import React, { Component } from 'react';
import {Card,CardBody,Input,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container,CardHeader, CardColumns, CardImg} from 'reactstrap';
import MyChart from './BarChart';
import './dashboard.css';
import {NavLink,Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import img from './images/image1.png';
import {MdAddShoppingCart,MdRemoveShoppingCart,MdSearch} from 'react-icons/md';



class OrderDetails extends Component {
    constructor(props){
        super(props);
        this.props= props;


        this.state={
            productList : [],
            CustomOrderLines:[],
            OrderHeaderKey:"",
            orderCreatedFlag:false,
            OrderNo:"",
            PrimeLineNo:"",
            descriptionList:[],
              
            }
    }
    componentWillMount(){

        const data = {
                    InputXML: {
                        OrganizationCode:"Matrix",
                        MaximumRecords:"40"   
                    },
                    ApiName: "getItemList",
                    // ApiName:"PSUpdateDraftOrder",
                    IsService: "N"
                    }
        // const ent = JSON.stringify(data.EnterpriseCode);
        // console.log(ent);
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
                    console.log(res.data);
                    const itemList = res.data.Item;
                    this.setState({
                        productList:itemList

                    })
                
                    
                })
        }
    addProductToCart=(val)=>{
        // console.log("AddtoCartIcon:: ",val);
         const ItemKey = val.ItemKey;
         const ItemID = val.ItemID;
         const UOM = val.UnitOfMeasure;
         const unitPrice = val.PrimaryInformation.UnitCost;
         var currentOrderLines = this.state.CustomOrderLines;
         
         console.log("Customer id from customer list is::  ",this.props.customerID);
        //  console.log("ItemDetails from the itemdetail component is:::: ",this.props.ItemDetail);
         console.log("CurrentOrderlines are:::",currentOrderLines.length);
         console.log("OrderCreatedFlag:::",this.state.orderCreatedFlag);
         if(this.state.orderCreatedFlag==false){
         if(currentOrderLines.length==0){
              const NewPrimeLineNo = "1";
             const CustomOrderLine = {
                OrderedQty: "1",
                PrimeLineNo: NewPrimeLineNo,
                SubLineNo: "1",
                DeliveryMethod: "SHP",
                Item: {
                    ItemID: ItemID,
                    ItemKey: ItemKey,
                    UnitOfMeasure: UOM
                },
                LinePriceInfo: {
                    IsPriceLocked: "Y",
                    UnitPrice: unitPrice
                }
            }
            currentOrderLines.push(CustomOrderLine);
            console.log("CUstom orderlines in state are:: ",this.state.CustomOrderLines);
            console.log("currentOrderLines are::: ",currentOrderLines);
            
            const inputData = {
                InputXML: {
                    EnterpriseCode:"DEFAULT",
                    DraftOrderFlag:"Y",
                    OrderNo:"",
                    DocumentType:"RG001.ex",
                    ShipToKey:"20200305101634247497",
                    BillToKey:"20200305101634247497",
                    OrderLines: {
                        OrderLine: this.state.CustomOrderLines
                    },
                    Extn:{
                        ExtnCustomerID:this.props.customerID,
                        ExtnStylistID: "Stylist1"
                    }
                },
                ApiName: "createOrder",
                // ApiName:"PSUpdateDraftOrder",
                IsService: "N"
                }
            console.log("Inputxml is:::",inputData.InputXML);
            const reqData = {
            method: "POST",
           //url: `http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
            data: JSON.stringify(inputData),
            headers: {
                "Content-Type": "application/json",
                // "X-CSRFToken":window.AppInfo.bridgecsrftoken
            }
        }
            axios(reqData).then(res => {
                    console.log("response from createOrderApi : ", res.data);
                    console.log("status resposnse: ",res.status);
                    console.log("OrderHeaderKey::: ",res.data.OrderHeaderKey);
                    this.setState({
                        OrderHeaderKey:res.data.OrderHeaderKey,
                        orderCreatedFlag:true,
                        OrderNo:res.data.OrderNo,
                        PrimeLineNo:"1"
                    })
                    setTimeout(()=>{
                        console.log(res);
                    this.props.OrderHeaderKeyFn(res.data.OrderHeaderKey);
                    this.props.ItemCount(1);
                    },2000)
                    }).catch(error => {
                    console.log("an error occured: ", error);
                    })
                     }
                    }
        else{
            console.log("Ordercreated flag::::",this.state.orderCreatedFlag);
            var len = currentOrderLines.length;
            console.log("in else condition::: current orderlines length is: ",len);
            // this.props.ItemCount(1);
            console.log("Custom orderlines in state of else are:::",this.state.CustomOrderLines);
            const LastPrimeLineNo = currentOrderLines[len-1].PrimeLineNo;
            console.log("new primelineno is:: ",LastPrimeLineNo);
            var NewPrimeLineNo = parseInt(LastPrimeLineNo) + 1;
            console.log("newPrimeLineNo:: ",NewPrimeLineNo);
            const CustomOrderLine = {
                Action: "CREATE",
                OrderedQty: "1",
                PrimeLineNo: NewPrimeLineNo,
                SubLineNo: "1",
                DeliveryMethod: "SHP",
                Item: {
                    ItemID: ItemID,
                    ItemKey: ItemKey,
                    UnitOfMeasure: UOM
                    },
                LinePriceInfo: {
                    IsPriceLocked: "Y",
                    UnitPrice: unitPrice
                    }
                }
            console.log("Custom created OrderLine is::: ",CustomOrderLine);
            currentOrderLines.push(CustomOrderLine);
            console.log("New OrderLines are::: ",currentOrderLines);
            
            const inputData = {
                InputXML: {
                Action: "MODIFY",
                Override: "Y",
                OrderNo: this.state.OrderNo,
                OrderHeaderKey: this.state.OrderHeaderKey,
                OrderLines: {
                    OrderLine: CustomOrderLine
                    }
                    },
                ApiName: "changeOrder",
                // ApiName:"PSUpdateDraftOrder",
                IsService: "N"
                }
        console.log("input xml for change order is:::",inputData.InputXML);
        const reqData = {
            method: "POST",
           //url: `http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
            data: JSON.stringify(inputData),
            headers: {
                "Content-Type": "application/json",
                // "X-CSRFToken":window.AppInfo.bridgecsrftoken
                }
            }
        axios(reqData).then(res => {
            console.log("response changeOrder api is::: ", res.data);
            console.log("status resposnse: ",res.status);  
            this.props.ItemCount(1);        
            }).catch(error => {
            console.log("an error occured: ", error);
            })
            }

        }

    // removeProduct = (val) =>{
    //     console.log("Remove::: ",val)
    //     console.log("Custom orderLines iin state are:: ",this.state.CustomOrderLines);
    //     var currentOrderLines = this.state.CustomOrderLines;
    //     console.log("currenOrderLines::: ",currentOrderLines);
    //     console.log("ItemKey is::: ",val.ItemKey);
    //     const itemKey = val.ItemKey;
    //     var ItemList = [];
    //     var lenOfCurrentOrderLines = this.state.CustomOrderLines.length;
    //     console.log("Len of current OrderLines in remove is::: ",lenOfCurrentOrderLines);
    //     if(lenOfCurrentOrderLines==0){
    //         return;
    //     }
    //     else{
    //         // console.log("inside else of remove method");
    //         console.log("Current orderLines in Else of remove are:: ",currentOrderLines);
    //         for(var i =0 ; i < lenOfCurrentOrderLines ; i++){
    //             if(itemKey == currentOrderLines[i].Item.ItemKey){
    //                 console.log("matched the itemkeys");
    //                 console.log("Customer Orderlines before splice in state are::: ",this.state.CustomOrderLines);
    //                 currentOrderLines.splice(i,1);
    //                 console.log("currenOrderLines after remove from cart are::::: ",currentOrderLines);
    //                 console.log("Customer Orderlines after splice in state are::: ",this.state.CustomOrderLines);
    //                 return;
    //             }
    //             }
    //             console.log("currenOrderLines after remove from cart are::::: ",currentOrderLines);
    //             console.log("Customer Orderlines after splice in state are::: ",this.state.CustomOrderLines);    
    //     }    
    // }

    mapProducts =() =>{
        console.log("the product list is::: ",this.state.productList);
        if(this.state.descriptionList.length!=0){
            return this.state.descriptionList.map((Item,index)=>{
                const {ItemID,UnitOfMeasure} = Item
                return(
                    <Card style={{marginBottom:"5px"}}>
                    <CardHeader className="CardHeaderClassWide10" >
                      <p> {ItemID}</p> 
                        </CardHeader>
                    
                    <CardBody >
                    <Row md="2">
                    <Col md="7">
                    <CardText style={{textAlign:"left",color:"grey"}}>Product Description:</CardText><CardText style={{textAlign:"left",color:"rgba(4,71,132)"}}>{Item.PrimaryInformation.ShortDescription}</CardText>   
                    <CardText  style={{textAlign:"left",float:"left",color:"grey"}}>Unit Cost: </CardText><CardText  style={{textAlign:"left",color:"rgba(4,71,132)"}}>&nbsp;{Item.PrimaryInformation.UnitCost}$</CardText>
                    </Col>
                    <Col md="5">
                        <CardImg className="ProductImage" src={img}></CardImg>
                        {/* <Button className="AddProductButton" onClick={()=>{this.removeProduct(Item)}}><MdRemoveShoppingCart size="20"/></Button> */}
                        <Button className="AddProductButton" onClick={()=>{this.addProductToCart(Item)}}>Add To Cart<MdAddShoppingCart size="20"/></Button>
                        </Col>
                        </Row>
                    </CardBody>
                    </Card>
                )
            })
        }
        else{
            return this.state.productList.map((Item,index)=>{
                const {ItemID,UnitOfMeasure} = Item
                return(
                    <Card style={{marginBottom:"5px"}}>
                    <CardHeader className="CardHeaderClassWide10" style={{fontWeight:"700"}}>
                      <p>{ItemID}</p>  
                        </CardHeader>
                    
                    <CardBody style={{backgroundColor:"rgba(0,0,0,0.03)"}}>
                    <Row md="2">
                    <Col md="7">
                    <CardText style={{textAlign:"left",color:"grey",fontWeight:"bold"}}>Product Description:</CardText><CardText style={{textAlign:"left",color:"rgba(4,71,132)"}}>{Item.PrimaryInformation.ShortDescription}</CardText>   
                    <CardText  style={{textAlign:"left",float:"left",color:"grey",fontWeight:"bold"}}>Unit Cost: </CardText><CardText  style={{textAlign:"left",color:"rgba(4,71,132)"}}>&nbsp;{Item.PrimaryInformation.UnitCost}$</CardText>
                    </Col>
                    <Col md="5">
                        <CardImg className="ProductImage" src={img}></CardImg>
                        {/* <Button className="AddProductButton" onClick={()=>{this.removeProduct(Item)}}><MdRemoveShoppingCart size="20"/></Button> */}
                        <Button className="AddProductButton" onClick={()=>{this.addProductToCart(Item)}}>Add To Cart<MdAddShoppingCart size="20"/></Button>
                        </Col>
                        </Row>
                    </CardBody>
                    </Card>
                )
            })

        }

    }
    // recommendProducts=()=>{
    //     console.log("RecommendProducts:: the CustomOrderLines in state are::",this.state.CustomOrderLines);
    //     var orderlines = this.state.CustomOrderLines;
    //     console.log("Recommend:::orderlines are::",orderlines);
    //     if(orderlines.length==0){
    //         return;
    //     }
    //     const inputData = {
    //             InputXML: {
    //                 EnterpriseCode:"DEFAULT",
    //                 DraftOrderFlag:"Y",
    //                 OrderNo:"",
    //                 OrderLines: {
    //                     OrderLine: this.state.CustomOrderLines
    //                 }
    //             },
    //             ApiName: "createOrder",
    //             // ApiName:"PSUpdateDraftOrder",
    //             IsService: "N"
    //             }
    //     console.log("Inputxml is:::",inputData.InputXML);
    //     const reqData = {
    //         method: "POST",
    //        //url: `http://localhost:5000/api`,
            //url: `http://207.148.123.221:5000/api`,
    //         // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
    //         data: JSON.stringify(inputData),
    //         headers: {
    //             "Content-Type": "application/json",
    //             // "X-CSRFToken":window.AppInfo.bridgecsrftoken
    //         }
    //     }
    //         axios(reqData).then(res => {
    //         console.log("response from createOrderApi : ", res.data);
    //         console.log("status resposnse: ",res.status);   
    //         }).catch(error => {
    //         console.log("an error occured: ", error);
    //         })
    // }
    filterItems=(event)=>{
        console.log("items in the state are:",this.state.productList );
        var updatedList = this.state.productList;
        var len = this.state.productList.length;
        var ItemDescList = [];
        for(var i = 0; i < len; i++){
            var ItemDesc = updatedList[i].PrimaryInformation.ShortDescription;
            ItemDescList.push(ItemDesc); 
        }
        console.log("IteIDList is: ",ItemDescList);
        console.log("updatedlist var: ",updatedList);
        updatedList = updatedList.filter((Item)=>{
        //  console.log("inside filter func item is: ",Item);
         console.log("filter to lowercase: ",Item.PrimaryInformation.ShortDescription.toLowerCase());
        return Item.PrimaryInformation.ShortDescription.toLowerCase().search(event.target.value.toLowerCase()) !==-1
        });
        console.log("updatedList: ",updatedList);
        this.setState({
            descriptionList:updatedList
        })
    }
    render() { 
        
        return ( 
            <div>
                <Card className="BrowseProductsClass" >
                <CardHeader className="CardHeaderClassWide">
                    <p style={{float:"left"}}>BROWSE PRODUCTS</p>
                    <Input style={{width:"40%",float:"right",marginTop:"-11px"}} placeholder="Search Products" onChange={this.filterItems}></Input>
                    {/* <Button style={{ backgroundColor:"white",color:"rgba(4,71,132)",width:"30%",float:"right",marginTop:"-10px",height:"35px"}} onClick={()=>this.recommendProducts()}>Recommend</Button> */}
                </CardHeader>
                <CardBody style={{paddingLeft:"8px",paddingRight:"8px",paddingTop:"2%"}} >
                    {this.mapProducts()}            
                </CardBody>
                </Card>
        </div>
        );
    }   
}
 
export default OrderDetails ;