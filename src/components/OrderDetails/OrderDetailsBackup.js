import React, { Component } from 'react';
import {CardImg, Button, Table, Input, Card, CardBody, CardText, Row, Col, CardTitle, Container,
    CardSubtitle, Label,Modal,ModalBody,ModalFooter,ModalHeader,ModalProps, Form,Alert} from 'reactstrap';
import Dialog from 'react-dialog';
import './OrderDetails.css';
import axios from 'axios';
import ItemDetails from '../../components/OrderDetails/ItemDetails';
import ItemImg from '../../images/image1.png';
import SearchIcon from '../../images/Search-512.png';
//import Products from '../Products/ItemList';
import '../../components/styleGroups/styleGroupCard.css';
import image from '../../images/image1.png';
import plus from '../../images/plus.png';
import minus from '../../images/minus.png';
import remove from '../../images/remove.png';
import CustomerSurveyDetails from '../../components/CustomerPreferences/CustomerSurvey';
import { ModalTitle } from 'react-bootstrap';


export default class CompleteOrderDeatails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OrderDetails: [],
            OrderLines: [],
            CustomOrderLines: [],
            fetched: false,
            OrderDate: "",
            value1: "",
            ItemList: [],
            qty: "1",
            OrderLinesAdded: false,
            status: "",
            SentToCustomer:"N",
            Disable:false,
            OrderLinesRemoved:false,
            SurveyDetails:[],
            ReceivedSurveyDetails:false,
            modal:false,
            updatedProductList:[],
            instruction:false,
            showPopUp:false,
            sentStatus:false,
            OrderSaved:false,
            NoOrderLinesFlag:false,
            OrderLinesForMapItems:[]
        }

    }
    componentWillMount() {
        // const {orders}  = this.props.location.state;
        // console.log("asd ", this.props)
        // const key = window.location.search;
        // console.log("key: ",key);
        // var url = new URL(key);
        // console.log("Url is: ",url);
        // var ohk = url.searchParams.get("key")
        // console.log("oHK: ",ohk);
        // const params = new URLSearchParams(key);
        // console.log("params",params);
        // const OrderHeaderKey = params.get('key');
        // console.log("orderheaderKey: ", OrderHeaderKey);
        // var url = window.location.href;
        var searchVal = window.location.search;
        console.log("searchVal: ",searchVal);
        var val = searchVal.split("=");
        var len = val.length;
        console.log("len is: ",len);
        var OrderHeaderKey = val[len-1];
        console.log("OrderHeaderKey: ",OrderHeaderKey);
        const inputData = {
            InputXML: {
                OrderHeaderKey: OrderHeaderKey,
            },
            ApiName: "getOrderDetails",
            IsService: "N"
        }
        // var postObject = {"CommandName":"getOrderDetails"};
        // postObject.InputXml = {OrderHeaderKey: OrderHeaderKey};
        // postObject.Template = {};
        // postObject.IsService = "N";
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
            console.log("response data is: ", res.data);
            console.log("Orderline in data: ", res.data.OrderLines.OrderLine);
            this.setState({
                OrderDetails: res.data,
                OrderLines: res.data.OrderLines.OrderLine,
                OrderDate: res.data.OrderDate,
                status:res.data.Status
            })
            console.log("status in did mount: ",this.state.OrderDetails.Status)
            if(this.state.OrderDetails.Status=="Cancelled"){
                this.setState({
                    Disable:true
                })
            }
        }).catch(err => {
            this.setState({
                fetched: false
            })
            console.log("An error occured", err);
        })
        const data = {
            InputXML: {
                EnterpriseCode: "S-MART",
            },
            ApiName: "getItemList",
            IsService: "N"
        }
        // var postObjects = {"CommandName":"getItemList"};
        // postObjects.InputXml = {EnterpriseCode: "S-MART"};
        // postObjects.Template = {};
        // postObjects.IsService = "N";
        // console.log("props are: ", this.props);
        // const ent = JSON.stringify(data.EnterpriseCode);
        // console.log(ent);
        const reqdata = {
            method: "POST",
           //url: `http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // "X-CSRFToken":window.AppInfo.bridgecsrftoken
            }
        }
        axios(reqdata).then(res => {
            console.log("items are: ", res.data);
            const itemList = res.data.Item;
            console.log("Itemlist: ", itemList);
            this.setState({
                ItemList: itemList
            })

        })
        const inputdata = {
            InputXML: {
                "Test":{
                    "ExtnCustomerSurvey":{
                    }    
                }
               
            },
            ApiName: "PSGetSurveyDetails",
            IsService: "Y"
        }
        const Reqdata = {
            method: "POST",
            url: `http://localhost:5000/survey`,
            data: JSON.stringify(inputdata),
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios(Reqdata).then(res => {
            console.log("response from customer preferences: ", res.data);
            console.log("status resposnse: ",res.status);
            this.setState({
                SurveyDetails:res.data.survey.ExtnCustomerSurvey,
                ReceivedSurveyDetails:true
            })
           
           
        }).catch(error => {
            console.log("an error occured: ", error);
        })
       
    }
    updatedItemDetail = (val) => {
        console.log("INSIDE updatedItemDetail");
        console.log("ItemDetails: ", val);
        console.log("THe Order Details are: ", this.state.OrderDetails);
        
        var len="";
        const ItemKey = val.ItemKey;
        const ItemID = val.ItemID;
        const UOM = val.UnitOfMeasure;
        console.log("Unit of measure: ", UOM);
        console.log("ItemID fetched is: ", ItemID);
        const unitPrice = val.PrimaryInformation.UnitCost;
        // const primeLinesNo = this.state.OrderLines.PrimeLineNo;
        var LastPrimeLineNo = "";
        var newPrimeLineNo = "";
        if(!this.state.OrderLines){
            LastPrimeLineNo = "1";
        }
        else {
            len = this.state.OrderLines.length;
            console.log("length is: ", len);
            LastPrimeLineNo = this.state.OrderLines[len - 1].PrimeLineNo;
        }
        newPrimeLineNo = parseInt(LastPrimeLineNo) + 1;
        const CustomOrderLine = {
            Action: "CREATE",
            OrderedQty: "1",
            PrimeLineNo: newPrimeLineNo,
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
        var Orderline=[];
        var CustomerOrdLines = [];  
        if(this.state.OrderLines){
            Orderline = this.state.OrderLines;
            console.log("OrderLines from state are: ",Orderline);
            CustomerOrdLines=this.state.CustomOrderLines;
            Orderline.push(CustomOrderLine);
            CustomerOrdLines.push(CustomOrderLine);
            console.log("CustomerOrderLines are after push: ", CustomerOrdLines);
        
            this.setState({
            OrderLines: Orderline,
            OrderLinesAdded: true,
            CustomOrderLines: CustomerOrdLines
        })
        console.log("Sutomer orderlines in update itemdetails functions are: ",this.state.CustomOrderLines);
        }
        else{

            Orderline.push(CustomOrderLine);  
            CustomerOrdLines.push(CustomOrderLine);
            this.setState({
                OrderLines: Orderline,
                OrderLinesAdded: true,
                CustomOrderLines: CustomerOrdLines
            })
        }
        

        console.log("Updated CustomOrderLines are: ", this.state.CustomOrderLines);
        console.log("updated OrderLines are: ", this.state.OrderLines);
    }

    MapItemDetails = () => {
        console.log("OrderLines mapping: ", this.state.OrderLines);
       if(!this.state.OrderLines || !this.state.OrderLines.length){
           return(<CardText style={{fontWeight:"bold",color:"red"}}>No Items To Display</CardText>)
       }
       
        if (this.state.OrderLines) {
            var mapOrderlines = this.state.OrderLines;
            console.log("mapOrderlines are: ",mapOrderlines);
            
            var len = mapOrderlines.length;
            const Orderlines=[];
            for(var i=0;i<len;i++){
                var action = mapOrderlines[i].Action;
                    if(action!=='REMOVE'){
                    Orderlines.push(mapOrderlines[i]);
                    }
            }
            console.log("Orderlines new array is: ",Orderlines);
            if(!Orderlines.length || !Orderlines){
                return(<CardText style={{fontWeight:"bold",color:"red"}}>No Items To Display</CardText>)
            }
           
            return Orderlines.map((Items, index) => {
                const { ItemID, ItemDesc } = Items
                console.log("Items: ", Items)
                console.log("Item is: ", Items.Item.ItemID);
                return (
                    <Card key={index} style={{ width:"80%", marginBottom: "3px", height: "40%" }} >
                        <div style={{ marginRight: "7px", marginBottom: "7px" }}>
                            <CardText style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" ,marginLeft:"5px"}}>ITEMID: <CardText style={{ color: "blue", display: "inline" }}>{Items.Item.ItemID}</CardText></CardText>
                            <Row>
                                <Col md="8">


                                    <CardText style={{ textAlign: "left", marginLeft: "5px", fontWeight: "bold" }}>ItemDescription:<CardText style={{ color: "blue", display: "inline", fontWeight: "normal" }}> {Items.Item.ItemDesc}</CardText></CardText>
                                    
                                    <CardText style={{ textAlign: "left", marginLeft: "5px", fontWeight: "bold" }}>Unit Price: </CardText>
                                    <CardText style={{ textAlign: "left", marginLeft: "5px", fontWeight: "bold" }}>Cutomer Discount: </CardText>

                                    <CardText style={{ textAlign: "left", marginLeft: "5px", fontWeight: "bold", width: "fit" }}>Line Total: </CardText>
                                </Col>
                                <Col md="4">

                                    <CardImg className="ItemImage" src={ItemImg} /><br />

                                    <Button outline color="secondary" style={{ color: "black", width: "70%" }} onClick={() => { this.removeHandler(Items) }}>Remove</Button><br />
                                    {/* <Button outline color="secondary" style={{ color: "black", width: "70%", marginTop: "1px" }}>Modify</Button> */}

                                </Col>
                            </Row>
                        </div>
                    </Card>)
            })
        
        }
        
      
    }
    removeHandler = (val) => {
        console.log("ItemValue: ", val);
        const primelineNo = val.PrimeLineNo;
        console.log("primelineno to remove: ", primelineNo);
        const currentORderLines = this.state.OrderLines;
        console.log("CUrr oRder Lines: ", currentORderLines);
        var len = currentORderLines.length;
        console.log(len);
        if(len<1){
            return(
                <CardText>No Items To Display</CardText>
            )
        }
        if (!len == 0 || !len<0) {
            for (var i = 0; i < len; i++) {
                if (!currentORderLines[i])
                    console.log("ARRAY",currentORderLines);
                else {

                    console.log("Currentarray",currentORderLines);
                    const primeLNO = currentORderLines[i].PrimeLineNo;
                    console.log("in loop PNO: ", primeLNO);
                    if (primeLNO == primelineNo) {
                        console.log("matched");
                        if(currentORderLines[i].Action=="CREATE"){
                            currentORderLines.splice(i,1);
                           
                            this.setState({
                                
                                CustomOrderLines: currentORderLines,
                                OrderLinesRemoved:true
                            })
                          
                        }
                        else{
                            var customOrderLine = {
                            OrderHeaderKey:this.state.OrderDetails.OrderHeaderKey,
                            Action:"REMOVE",
                            PrimeLineNo:primeLNO,
                            OrderLineKey:currentORderLines[i].OrderLineKey,
                            Override:"Y",
                            SubLineNo:"1"
                        }
                        console.log("customerOrderLine created: ",customOrderLine);
                        // currentORderLines.pop();
                        console.log("OrderLines to remove is: ",currentORderLines[i]);
                            currentORderLines.push(customOrderLine);
                            currentORderLines.splice(i,1);
                            
                            console.log("New Customer OrderLines are::::",currentORderLines);
                            this.setState({
                               
                                CustomOrderLines: currentORderLines,
                                OrderLinesRemoved:true
                            })
                    }
                      
                    }
                 
                  
                    if(!this.state.OrderLines.length){
                        console.log("No ord lines!!");
                        return(
                            <CardText>No Items To</CardText>
                        )
                    }
                    

                }
            }

            console.log("remaining orderlInes: ",currentORderLines);
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
    MapItems = () => {
        console.log("Inside map method");
        console.log("state: ", this.state.ItemList)
        console.log("item state : ",this.state.Item);
        if (this.state.Item) {
            return this.state.Item.map((ItemId, index) => {
                const { ItemID, ItemKey } = ItemId
                return (

                    <div style={{ float: "left", width: "45%", marginLeft: "15px", marginTop: "10px" }}>
                        <Card style={{ marginBottom: "5px" }} key={ItemKey}>

                            <CardBody>
                                <CardTitle className="StyleGroupTitle">ACCESSORIES</CardTitle>
                                <CardImg className="StyleCardImg" top width="50%" src={image} alt=" " />
                                <div className="StyleGroupSubTitleDiv">
                                    <CardSubtitle className="StyleGrpNameSubTitle" style={{ fontWeight: "Bold" }}>Product</CardSubtitle><br></br>
                                    <CardText className="productText" style={
                                        {
                                            textAlign: "left",
                                            color: "blue"

                                        }
                                    }>{ItemID}</CardText><br></br>
                                </div>
                                <CardSubtitle className="ProductsCardSubTitle">Size option</CardSubtitle>
                                <CardSubtitle className="ProductsCardSubTitle">Color options</CardSubtitle>
                                <CardSubtitle className="ProductsCardSubTitle">Availability</CardSubtitle><br />
                                <div>
                                    <div style={{ float: "left" }}>
                                        <Button outline color="secondary" style={{ marginRight: "3px" }} onClick={() => this.handleDecreaseQty()}>-</Button>
                                        <Button outline color="secondary">{this.state.qty}</Button>
                                        <Button outline color="secondary" style={{ marginLeft: "3px" }} onClick={() => this.handleIncreaseQty()}>+</Button>
                                    </div>
                                    <Button outline color="secondary" style={{ float: "right", marginBottom: "5px", color: "black" }} onClick={() => { this.updatedItemDetail(ItemId) }}>Add</Button>

                                </div>
                            </CardBody>
                        </Card>
                    </div>

                )
            })
        }
        else{
            console.log("ItemList state: ",this.state.ItemList);
            return this.state.ItemList.map((ItemId, index) => {
                const { ItemID, ItemKey } = ItemId
                return (

                    <div style={{ float: "left", width: "45%", marginLeft: "15px", marginTop: "10px" }}>
                        <Card style={{ marginBottom: "5px" }} key={ItemKey}>

                            <CardBody>
                                <CardTitle className="StyleGroupTitle">ACCESSORIES</CardTitle>
                                <CardImg className="StyleCardImg" top width="50%" src={image} alt=" " />
                                <div className="StyleGroupSubTitleDiv">
                                    <CardSubtitle className="StyleGrpNameSubTitle" style={{ fontWeight: "Bold" }}>Product</CardSubtitle><br></br>
                                    <CardText className="productText" style={
                                        {
                                            textAlign: "left",
                                            color: "blue"

                                        }
                                    }>{ItemID}</CardText><br></br>
                                </div>
                                <CardSubtitle className="ProductsCardSubTitle">Size option</CardSubtitle>
                                <CardSubtitle className="ProductsCardSubTitle">Color options</CardSubtitle>
                                <CardSubtitle className="ProductsCardSubTitle">Availability</CardSubtitle><br />
                                <div>
                                    <div style={{ float: "left" }}>
                                        <Button outline color="secondary" style={{ marginRight: "3px" }} onClick={() => this.handleDecreaseQty()}>-</Button>
                                        <Button outline color="secondary">{this.state.qty}</Button>
                                        <Button outline color="secondary" style={{ marginLeft: "3px" }} onClick={() => this.handleIncreaseQty()}>+</Button>
                                    </div>
                                    <Button outline color="secondary" style={{ float: "right", marginBottom: "5px", color: "black" }} onClick={() => { this.updatedItemDetail(ItemId) }}>Add</Button>

                                </div>
                            </CardBody>
                        </Card>
                    </div>

                )
            })

        }

    }
    handleIncreaseQty = () => {
        const currQty = parseInt(this.state.qty);
        console.log("curr qty: ", currQty);
        const newqty = currQty + 1;
        this.setState({
            qty: newqty
        })
    }
    handleDecreaseQty = () => {
        const currQty = parseInt(this.state.qty);
        if (currQty == 0) {

        }
        const newQty = currQty - 1;
        this.setState({
            qty: newQty
        })
    }
    showQty = () => {

    }
    handleOnClickSave = () => {
        console.log("Custom OrderLines in handleClicksave function::: ",this.state.CustomOrderLines)
        if (this.state.OrderLinesAdded || this.state.OrderLinesRemoved) {
            console.log("orderlines added");
            var Orderdetails = this.state.OrderDetails;
            console.log("Customer oRderline: ", this.state.CustomOrderLines);   
            var len = this.state.CustomOrderLines.length;
            console.log("OrderLoines length: ",len);
            var orderLinesTosend=[]
            var CurrentORderLines = this.state.CustomOrderLines;
            for(var i=0;i<len;i++){
                if(CurrentORderLines[i].Action == "CREATE" || CurrentORderLines[i].Action=="REMOVE"){
                    orderLinesTosend.push(CurrentORderLines[i]);
                }
            }
            console.log("the ORderLines to send array is: ",orderLinesTosend);

            const orderData = {
                Action: "MODIFY",
                Override: "Y",
                OrderNo: Orderdetails.OrderNo,
                OrderHeaderKey: Orderdetails.OrderHeaderKey,
                OrderLines: {
                    OrderLine: this.state.CustomOrderLines
                }
            }
            console.log("exsting order details are:",this.state.OrderDetails);
            // var postObjects = {"CommandName":"PSUpdateDraftOrder"};
            // postObjects.InputXml = { 
            //                         Order:{
            //                         Action: "MODIFY",
            //                         Override: "Y",
            //                         OrderNo: Orderdetails.OrderNo,
            //                         OrderHeaderKey: Orderdetails.OrderHeaderKey,
            //                         OrderLines: {
            //                             OrderLine: this.state.CustomOrderLines
            //                             }
            //                         }
            //                         };
            // postObjects.Template = {};
            // postObjects.IsService = "Y";
            // console.log("Orderetils: ", Orderdetails);
            // console.log("post object for save: ",postObjects);
            // Orderdetails.Action = "MODIFY";
            // Orderdetails.Overrride = "Y";
            // const customOrderLine = this.state.CustomOrderLines;
            //  const addOrderLine = orderData.OrderLines.OrderLine;
            //  addOrderLine.push(customOrderLine);
            // console.log("Updated Order Data is: ", orderData);
            // console.log("Updated Customer orderLines: ", this.state.CustomOrderLines);
            // console.log("updated orderdetails: ", Orderdetails);
            // console.log("OrderNo: ", Orderdetails.OrderNo);
            // console.log("OrderHeaderKey: ", Orderdetails.OrderHeaderKey);
            if(!orderLinesTosend.length){
                const data = {
                    InputXML: {
                        Action: "MODIFY",
                    Override: "Y",
                    OrderNo: Orderdetails.OrderNo,
                    OrderHeaderKey: Orderdetails.OrderHeaderKey,
                    OrderLines: {
                        OrderLine: this.state.CustomOrderLines
                    }
                    },
                    ApiName: "changeOrder",
                    // ApiName:"PSUpdateDraftOrder",
                    IsService: "N"
                }
                const reqData = {
                    method: "POST",
                   //url: `http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
                    // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        // "X-CSRFToken":window.AppInfo.bridgecsrftoken
                    }
                }
                console.log("Customer orderlines in state are: ",this.state.CustomOrderLines);
            if(!this.state.CustomOrderLines.length){
                this.setState({
                    NoOrderLinesFlag:true
                })
                setTimeout(()=>{
                    this.setState({
                        NoOrderLinesFlag:false
                    });
                },2000);
            }
            else{
                axios(reqData).then(res => {
                    console.log("response from changeOrder: ", res.data);
                    if(res.status==200){
                        this.setState({
                            OrderSaved:true
                        })
                        setTimeout(()=>{
                            this.setState({
                                OrderSaved:false
                            });
                        },2000);
                    }
    
                }).catch(error => {
                    console.log("An error occured: ", error);
                })
            }
            }
            else{
                console.log("OrderLinesTOSend: ",orderLinesTosend);
                const data = {
                    InputXML: {
                        Action: "MODIFY",
                    Override: "Y",
                    OrderNo: Orderdetails.OrderNo,
                    OrderHeaderKey: Orderdetails.OrderHeaderKey,
                    OrderLines: {
                        OrderLine: orderLinesTosend
                    }
                    },
                    ApiName: "changeOrder",
                    // ApiName:"PSUpdateDraftOrder",
                    IsService: "N"
                }
                const reqData = {
                    method: "POST",
                   //url: `http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
                    // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        // "X-CSRFToken":window.AppInfo.bridgecsrftoken
                    }
                }
                console.log("Customer orderlines in state are: ",this.state.CustomOrderLines);
            if(!this.state.CustomOrderLines.length){
                this.setState({
                    NoOrderLinesFlag:true
                })
                setTimeout(()=>{
                    this.setState({
                        NoOrderLinesFlag:false
                    });
                },2000);
            }
            else{
                axios(reqData).then(res => {
                    console.log("response from changeOrder: ", res.data);
                    if(res.status==200){
                        this.setState({
                            OrderSaved:true
                        })
                        setTimeout(()=>{
                            this.setState({
                                OrderSaved:false
                            });
                        },2000);
                    }
    
                }).catch(error => {
                    console.log("An error occured: ", error);
                })
            }

            }
            
           
            
            
        }
    }
    cancelHandler = () => {
        console.log("cancel clicked");
        console.log("Order details:", this.state.OrderDetails);
        
        const orderDet = this.state.OrderDetails;
        const OrderHeaderKey = orderDet.OrderHeaderKey;
        console.log("OrderHeaderKey: ", OrderHeaderKey);
        const inputData = {
            InputXML: {
                "OrderHeaderKey": OrderHeaderKey,
                "Override":"Y"
            },
            ApiName: "cancelOrder",
            IsService: "N"
        }
        // var postObjects = {"CommandName":"cancelOrder"};
        // postObjects.InputXml = { "OrderHeaderKey": OrderHeaderKey,
        //                          "Override":"Y" 
        //                         };
        // postObjects.Template = {};
        // postObjects.IsService = "N";
        
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
            console.log("response from cancel order: ", res);
            console.log("cancelled order response data: ",res.data);
            if(res.status==200){
                this.setState({
                    status: "Cancelled",
                    Disable:true,
                    showPopUp:true
                })
                setTimeout(()=>{
                    this.setState({
                        showPopUp:false
                    });
                },2000);
            }
          
        }).catch(error => {
            console.log("an error occured: ", error);
        })

    }
    sendHandler=()=>{
        console.log("send handler clicked!!");
        const orderHeaderKey = this.state.OrderDetails.OrderHeaderKey;
        console.log("OHK: ",orderHeaderKey);
        const inputData = {
            InputXML: {
                "OrderStatusChange":{
                    OrderHeaderKey: orderHeaderKey,
                    TransactionId:"RG_REVIEW_ORDER.RG001.ex.ex",
		            BaseDropStatus:"1000.020",
		            ChangeForAllAvailableQty:"Y"
                }
               
            },
            ApiName: "PSSendForCustomerReview",
            IsService: "Y"
        }
        // var postObjects = {"CommandName":"PSSendForCustomerReview"};
        // postObjects.InputXml = { "OrderStatusChange":{
        //                             OrderHeaderKey: orderHeaderKey,
        //                             TransactionId:"RG_REVIEW_ORDER.RG001.ex.ex",
        //                             BaseDropStatus:"1000.020",
        //                             ChangeForAllAvailableQty:"Y"
        //                                 }
       
        //                         };
        // postObjects.Template = {};
        // postObjects.IsService = "Y";
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
            console.log("response from Send To Custoomer: ", res);
            console.log("status resposnse: ",res.status);
            const statusResponse = res.status;
            if(statusResponse==200){
                this.setState({
                    SentToCustomer:"Y",
                    status:"Sent To Customer",
                    sentStatus:true
                    
                })
                setTimeout(()=>{
                    this.setState({
                        sentStatus:false
                    });
                },2000);

            }
          
            console.log("sent To Cust Flag: ",this.state.SentToCustomer);
            console.log("Status of Order: ",this.state.status)
        }).catch(error => {
            console.log("an error occured: ", error);
        })



    }
  
    preferencesHandler=()=>{
        console.log("preferences clicked!!");
        return(
            <CustomerSurveyDetails/>
        )
      
    }
    openModel=()=>{
        this.setState({
            modal:!this.state.modal
          });
          console.log("state open?: ",this.state.modal);


    }
   
      mapCustomerSurveyAnswers=()=>{
          console.log("survey details mapping");
          console.log("survey details: ",this.state.SurveyDetails);
          return(
              this.state.SurveyDetails.map((details,index)=>{
                  const {ExtnSurveyQuestion,ExtnSurveyAnswerText,ExtnSurveyQuestionType} = details
                  return(
                      <div >
                      {/* <p style={{fontWeight:"bold",float:"left"}}>Question Type:&nbsp;</p>
                      <p style={{color:"blue",fontWeight:"bold"}}> {ExtnSurveyQuestionType}</p> */}
                      <p style={{fontWeight:"bold"}}>{ExtnSurveyQuestion}</p>
                      <p style={{float:"left"}}>Ans:&nbsp;</p>
                      <p style={{color:"blue",fontWeight:"bold"}}>{ExtnSurveyAnswerText}</p>
                      </div>
                  )
                }
              )
          )
        
      }
    filteredItemList=(event)=>{
        console.log("product list:",this.state.ItemList);
        var updatedList = this.state.ItemList;
        var len = updatedList.length;
        var ItemIDList = [];
        for(var i = 0; i < len; i++){
            var ItemID = updatedList[i].ItemID;
            ItemIDList.push(ItemID); 
        }
        console.log("IteIDList is: ",ItemIDList);
        console.log("updatedlist var: ",updatedList);
        updatedList = updatedList.filter((Item)=>{
        //  console.log("inside filter func item is: ",Item);
         console.log("filter to lowercase: ",Item.ItemID.toLowerCase());
        return Item.ItemID.toLowerCase().search(event.target.value.toLowerCase()) !==-1
        });
        console.log("updatedList: ",updatedList);
        this.setState({
            Item:updatedList
        })
      }
      handleInstructions =() =>{
        this.setState({
            instruction:!this.state.instruction
        })
        console.log("instruction: ",this.state.instruction);
      }
   
    render() {
        return (
            <div className="mainDiv">
                <Card className="OrderDetailsHeader" style={{ zIndex: 2 }}>
                    <h1>ORDER DETAILS</h1>
                </Card><br></br>
                <Container fluid={true}>
                    <Label className="OrderNoHead">Order Number : </Label>
                    <CardText style={{display:"inline",float:"left",fontWeight:"bold",color:"blue",fontSize:"large"}}>&nbsp;{this.state.OrderDetails.OrderNo}</CardText>
                    <br /><br />
                    <div >
                        <Card className="OrderDetails" style={{border:"none"}}>
                            <Row>
                                <Col sm="3">
                                    <Card body className="detailsCard">
                                        <CardText style={{ textAlign: "left", fontWeight: "bold"}}>OrderNo: <p style={{ textAlign: "left", display: "inline", fontWeight: "normal"}}>{this.state.OrderDetails.OrderNo}</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Status: <p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}>{this.state.status}</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>OrderDate: <p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}>{this.getOrderDate(this.state.OrderDate)}</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Payment Status: <p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}></p></CardText>
                                    </Card>
                                </Col>
                                <Col sm="3">
                                    <Card body className="detailsCard">
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>CutomerID:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}></p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Customer League:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}> Sample League</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Gender:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}> Male</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Age: <p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}>23</p></CardText>
                                    </Card>
                                </Col>
                                <Col sm="3">
                                    <Card body className="detailsCard">
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Subscription Program:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}> Gold</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Subscription Type:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}> Monthly</p></CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Subscription Interval:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}>1 year</p> </CardText>
                                        <CardText style={{ textAlign: "left", fontWeight: "bold" }}>Subscription Date:<p style={{ textAlign: "left", display: "inline", fontWeight: "normal" }}>{this.getOrderDate(this.state.OrderDate)}</p> </CardText>
                                    </Card>
                                </Col>
                                <Col>
                                    <div style={{ width: "60%", marginLeft: "20%" }}>
                                        <Button outline disabled={this.state.Disable} color="secondary" style={{ marginTop: "6px", color: "black", width: "100%" }} onClick={() => { this.handleOnClickSave() }}>Save</Button>
                                        <Button outline disabled={this.state.Disable} color="secondary" style={{ marginTop: "6px", color: "black", width: "100%" }} onClick={()=>{this.sendHandler()}}>Send To Customer</Button><br />
                                        <Button outline disabled={this.state.Disable} color="secondary" style={{ marginTop: "6px", color: "black", width: "100%" }} onClick={() => {this.handleInstructions()}}>Instructions</Button><br />
                                        <Button outline disabled={this.state.Disable} color="secondary" style={{ marginTop: "6px", color: "black", width: "100%" }} onClick={() => { this.cancelHandler() }}>Cancel Order</Button><br />
                                        <Button outline disabled={this.state.Disable} color="secondary" style={{ marginTop: "6px", color: "black", width: "100%" }} onClick={() => {this.openModel()}}>Customer Preferences</Button>
                                        <Modal isOpen={this.state.modal} >
                                        <ModalHeader>Customer Preferences</ModalHeader>
                                        <ModalBody className="surveyDetails">
                                            {this.mapCustomerSurveyAnswers()}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={()=>this.openModel()}>
                                            Close
                                            </Button>

                                        </ModalFooter>
                                        </Modal>
                                        <Modal isOpen={this.state.instruction} >
                                        <ModalHeader>Instructions</ModalHeader>
                                        <Form >
                                        <ModalBody>
                                            <Input></Input>
                                       </ModalBody>
                                        <ModalFooter>
                                        <Button color="success" onClick={()=>this.handleInstructions()} >
                                            Submit
                                            </Button>
                                            <Button color="danger" onClick={()=>this.handleInstructions()}>
                                            Close
                                            </Button>
                                            </ModalFooter>
                                            </Form>
                                        
                                        </Modal>
                                        <Modal isOpen={this.state.showPopUp} color="danger" className="PopupClass">
                                           <ModalHeader className="popupText">Order Cancelled</ModalHeader>  
                                        </Modal>
                                        <Modal isOpen={this.state.sentStatus} color="danger" className="PopupClass">
                                           <ModalHeader className="popupText2">Order Sent To Customer</ModalHeader>  
                                        </Modal>
                                        <Modal isOpen={this.state.OrderSaved} className="PopupClass">
                                           <ModalHeader className="popupText2">Order Saved</ModalHeader>  
                                        </Modal>
                                        <Modal isOpen={this.state.NoOrderLinesFlag} className="PopupClass">
                                           <ModalHeader className="popupText">No Items Added</ModalHeader>  
                                        </Modal>
                                        
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
                                        
                                        <CardTitle style={{ fontSize: "20px", fontWeight: "bold", float: "left", marginLeft: "2px" }}>Browse Products</CardTitle>
                                        <Input type="text" className="1" style={{ width: "40%", float: "right" }} placeholder="Search"  onChange={this.filteredItemList}><img src={SearchIcon} /></Input>
                                        

                                        {/* <Products /> */}
                                        <div className="cardsDiv">
                                            <div>
                                                <Card style={{ width: "100%",backgroundColor:"ghostwhite",border:"none" }}>
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
                    </div>
                </Container>   
            </div>

        )
    }
}