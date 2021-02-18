import React, { Component } from 'react';
import {Card,CardBody,CardImg,CardText,CardSubtitle,Button,CardHeader} from 'reactstrap';
import './dashboard.css';
import axios from 'axios';
import image from './images/image1.png';

class ItemDetails extends Component {
    constructor(props){
        super(props);
        this.state = { 
            OrderLines:[],
            NewPrimeLineNo:"",
            OrderHeaderKeyFetched:false,
            OrderNo:""
         }

    }
  

    componentDidMount(){
       
        const data = {
            InputXML: {
                OrganizationCode:"Matrix",
                MaximumRecords:"20"
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
    }
    addItemObjet=(Item)=>{
        console.log("OrderHeaderKey from OrderDetailsDashbOard component is::",this.props.OrderHeaderKey);
        console.log("Item Ddetail for orderline is::: ",Item);
        const inputData = {
            InputXML: {
               OrderHeaderKey:this.props.OrderHeaderKey
            },
            ApiName: "getCompleteOrderDetails",
            // ApiName:"PSUpdateDraftOrder",
            IsService: "N"
            }
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
                this.props.getLenghtFromTrending(1); 
                console.log("the response data from getCOmpleteOrderDetails is:: ",res.data);
                this.setState({
                    OrderLines:res.data.OrderLines.OrderLine,
                    OrderNo:res.data.OrderNo
                })   
                console.log("OrderLines in the state are::: ",this.state.OrderLines);
                setTimeout(()=>{
                    if(this.state.OrderLines.length){
                        var len = this.state.OrderLines.length;
                        var lastPrimelIneNo = this.state.OrderLines[len-1].PrimeLineNo;
                        var newPrimeLineNo = parseInt(lastPrimelIneNo)+1;
                        this.setState({
                            NewPrimeLineNo:newPrimeLineNo,
                            OrderHeaderKeyFetched:true
                        })
                        console.log("new primeline no is::: ",this.state.NewPrimeLineNo);
                    }
                    const CustomOrderLine = {
                        Action: "CREATE",
                        OrderedQty: "1",
                        PrimeLineNo: this.state.NewPrimeLineNo,
                        SubLineNo: "1",
                        DeliveryMethod: "SHP",
                        Item: {
                            ItemID: Item.ItemID,
                            ItemKey: Item.ItemKey,
                            UnitOfMeasure: Item.UnitOfMeasure
                            },
                        LinePriceInfo: {
                            IsPriceLocked: "Y",
                            UnitPrice: Item.PrimaryInformation.UnitCost
                            }
                        }
                    const InputData = {
                        InputXML: {
                            Action: "MODIFY",
                            Override: "Y",
                            OrderNo: this.state.OrderNo,
                            OrderHeaderKey: this.props.OrderHeaderKey,
                            OrderLines: {
                                OrderLine: CustomOrderLine
                                }
                                },
                            ApiName: "changeOrder",
                            // ApiName:"PSUpdateDraftOrder",
                            IsService: "N"
                        }
                        console.log("INput xml to change order is:: ",InputData.InputXML);
                        const ReqData = {
                            method: "POST",
                           //url: `http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
                            // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
                            data: JSON.stringify(InputData),
                            headers: {
                                "Content-Type": "application/json",
                                // "X-CSRFToken":window.AppInfo.bridgecsrftoken
                            }
                        }
                        
                        axios(ReqData).then(res => {
                            console.log("response changeOrder api is::: ", res.data);
                            console.log("status resposnse: ",res.status);          
                            }).catch(error => {
                            console.log("an error occured: ", error);
                            })
                        

                    },1000)
                    }).catch(error => {
                console.log("an error occured: ", error);
                })
                       
                  
    }
    mapItems=()=>{
        console.log("ItemList is: ",this.state.ItemList);
        if(this.state.ItemList){
        return this.state.ItemList.map((ItemId, index) => {
            const { ItemID, ItemKey } = ItemId
            return (
                <div style={{ float: "left", width: "45%", margin:"10px",marginTop:"0px"}}>
                    <Card style={{ marginBottom: "5px"}} key={ItemKey}>
                            <CardHeader className="StyleGroupTitle">ACCESSORIES</CardHeader>
                            <CardBody style={{backgroundColor:"rgba(0, 0, 0, 0.03)",padding:"1rem"}}>
                            <CardImg className="StyleCardImg" top width="50%" src={image} alt=" " />
                            <div className="StyleGroupSubTitleDiv">
                                <CardSubtitle className="StyleGrpNameSubTitle" style={{ fontWeight: "Bold",color:"grey" }}>Product</CardSubtitle><br></br>
                                <CardText className="productText" style={
                                    {
                                        textAlign: "left",
                                        color: "blue"
                                    }
                                }>{ItemID}</CardText><br></br>
                            </div>
                            <CardSubtitle className="ProductsCardSubTitle" style={{color:"grey",fontWeight:"bold"}}>Size option</CardSubtitle><CardSubtitle style={{color:"blueviolet",textAlign:"left"}}>L M S</CardSubtitle>
                            <CardSubtitle className="ProductsCardSubTitle" style={{color:"grey",fontWeight:"bold"}}>Color options</CardSubtitle><CardSubtitle style={{color:"blueviolet",textAlign:"left"}}>Red Grey</CardSubtitle>
                            <CardSubtitle className="ProductsCardSubTitle" style={{color:"grey",fontWeight:"bold"}}>Availability</CardSubtitle><CardSubtitle style={{color:"blueviolet",textAlign:"left"}}>{

                            this.props.itemid === "100122" || this.props.itemid === "100005" || this.props.itemid === "100003" || this.props.itemid === "100014" || this.props.itemid === "100013" 
                            || this.props.itemid === "100019" || this.props.itemid === "100132" || this.props.itemid === "100151" ? <p style={{color:"red"}}>Out Of Stock</p> : <p style={{color:"green"}}>InStock</p>}</CardSubtitle>
                             
                                {/* <div style={{ float: "left" }}>
                                    <Button outline color="secondary" style={{ marginRight: "3px" }} onClick={() => this.handleDecreaseQty()}>-</Button>
                                    <Button outline color="secondary">{this.state.qty}</Button>
                                    <Button outline color="secondary" style={{ marginLeft: "3px" }} onClick={() => this.handleIncreaseQty()}>+</Button>
                                </div> */}
                                <Button outline color="secondary" style={{ float: "left", marginBottom: "5px", color: "black" }} onClick={()=>this.addItemObjet(ItemId)}>Add</Button>

                            
                        </CardBody>
                    </Card>
                </div>

            )
        })
    }
    }

    render() { 
           
        return ( <div>
            <Card className="TrendingItemListClass">
            <CardHeader className="CardHeaderClassWide">    
              <p>TRENDING ITEMS</p>
                </CardHeader>
                <CardBody className="stylerecomend" style={{maxHeight:"280px",paddingLeft:"0px",paddingRight:"0px",paddingTop:"2%"}}>
                {this.mapItems()}
                </CardBody>
            </Card>

        </div>);
    }
}
 
export default ItemDetails ;