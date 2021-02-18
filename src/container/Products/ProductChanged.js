// import React, { Component } from 'react';
// import ProductCard from '../../components/product/products'
// import axios from 'axios';
// import {Row,Col,Button,Input,Card, Container,Table} from 'reactstrap';
// import {connect} from 'react-redux';
// import * as actionTypes from '../../redux/Product/action'
// import { useHistory } from "react-router-dom";

// import {MdReorder,MdViewModule} from 'react-icons/md';

// class ProductContainer extends Component {

//     constructor(props){
//         super(props);
//         this.state={
//             ItemList:[],
//             Item:[],
//             listview:false,
//         }
//     }
    
//     componentDidMount(){
//         const data = {
//             InputXML: {
//                 OrganizationCode:"Matrix",
//                 MaximumRecords:"40"
               
//             },
            
//             ApiName: "getItemList",
//             // ApiName:"PSUpdateDraftOrder",
//             IsService: "N"
//         }
//         const ent = JSON.stringify(data.EnterpriseCode);
//         console.log(ent);
//         const reqData = {
//             method:"POST",
//             url:`http://localhost:5000/api`,
//             data:JSON.stringify(data),
//             headers:{
//                 "Content-Type":"application/json"
//             }
//     }
//     axios(reqData).then(res => {
//         console.log(res.data);
//         const itemList = res.data.Item;
//         this.setState({
//             ItemList:itemList
//         })
//         {  this.props.onIncBtnClick(res.data.Item)
//         }
        
//     })
// }
// loadItems = () => {
//     console.log("Item in state are: ",this.state.Item);
//     console.log("Itemlist instate are: ",this.state.ItemList);
//     if(this.state.Item.length!=0){
//         return this.state.Item.map((Itemid,index) => {
//             const {ItemID,ItemKey} = Itemid
//             return(
//                 <Col md="3">
//                 <ProductCard key = {ItemKey} itemid={ItemID} ItemType = {Itemid.PrimaryInformation.ItemType}/>
//                 </Col>
//                 )
//         })
//     }
//     else{
//         return this.state.ItemList.map((Itemid,index) => {
//             const {ItemID,ItemKey} = Itemid
//             return(
//                 <Col md="3">
//                 <ProductCard key = {ItemKey} itemid={ItemID} ItemType = {Itemid.PrimaryInformation.ItemType}/>
//                 </Col>
//                 )
//         })

//     }



// }  
// filterItems=(event)=>{
//     console.log("items in the state are:",this.state.ItemList );
//     var updatedList = this.state.ItemList;
//     var len = updatedList.length;
//     var ItemIDList = [];
//     for(var i = 0; i < len; i++){
//         var ItemID = updatedList[i].ItemID;
//         ItemIDList.push(ItemID); 
//     }
//     console.log("IteIDList is: ",ItemIDList);
//     console.log("updatedlist var: ",updatedList);
//     updatedList = updatedList.filter((Item)=>{
//     //  console.log("inside filter func item is: ",Item);
//      console.log("filter to lowercase: ",Item.ItemID.toLowerCase());
//     return Item.ItemID.toLowerCase().search(event.target.value.toLowerCase()) !==-1
//     });
//     console.log("updatedList: ",updatedList);
//     this.setState({
//         Item:updatedList
//     })
// }
// changeView=()=>{
//     console.log("list view clicked:::",this.state.listview);
//     this.setState({
//         listview:!this.state.listview
//     })
    
// }
