import React,{Component} from 'react';
import { Container, Row, Col} from 'reactstrap';
import '../../components/styleGroups/styleGroupCard.css';
import {Button, ButtonGroup,Input,Jumbotron,Card,CardImg,
     CardBody,CardTitle,CardSubtitle,CardText,CardLink,CardGroup} from 'reactstrap';
import axios from 'axios';

// import StyleGroupName from './StyleGroupNames';
// import GroupPrice from './GroupPrice';
import image from '../../images/image1.png';
export default class Products extends Component{
    constructor(props){
        super(props);  
        this.state={
            ItemList:[],
            OrderDetails:[],
            OrderLine:[]
        }
        
    }    
    componentDidMount(){
        const data = {
            EnterpriseCode:"S-MART",
            ApiName:"getItemList"
        }
        console.log("props are: ",this.props);
        const ent = JSON.stringify(data.EnterpriseCode);
        console.log(ent);
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
        console.log("items are: ",res.data);
        const itemList = res.data.Item;  
        console.log("Itemlist: ",itemList);
        this.setState({
            ItemList:itemList
        }) 
        
    })
    }
    onAddClickHandler=(ItemID)=>{
        console.log("add button clicked!!");   
        const key =  window.location.search;
        const params = new URLSearchParams(key);
        const OrderHeaderKey = params.get('key');
        console.log("orderheaderKey: ",OrderHeaderKey);
        // console.log("onAddClickHandler props: ",this.props.orderDetails);
        const orderdetails=this.props.orderDetails;
        console.log("OrderDetails Const: ",orderdetails);
        const orderLines = {
            Action:"Create",
          
        }
        // this.setState({
        //     OrderDetails:
        // })

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
                        <CardSubtitle className="ProductsCardSubTitle" style={{color:"grey",fontWeight:"bold"}}>Size option</CardSubtitle>
                        <CardSubtitle className="ProductsCardSubTitle" style={{color:"grey",fontWeight:"bold"}}>Color options</CardSubtitle>
                        <CardSubtitle className="ProductsCardSubTitle" style={{color:"grey",fontWeight:"bold"}}>Availability</CardSubtitle>
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
            <div className="cardsDiv"> 
                <div>
                <Card style={{width:"100%"}}>
                <div>
                {this.MapItems()}
                </div>
                </Card>
                
                </div>
                    
            </div>

        );
    }

}