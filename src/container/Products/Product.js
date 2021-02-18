import React, { Component } from 'react';
import ProductCard from '../../components/product/products'
import axios from 'axios';
import {Row,Col,Button,Input,Card, Container,Table} from 'reactstrap';
import {connect} from 'react-redux';
import * as actionTypes from '../../redux/Product/action'
import './products.css';
import {MdReorder,MdViewModule} from 'react-icons/md';

class ProductContainer extends Component {

    constructor(props){
        super(props);
        this.state={
            ItemList:[],
            Item:[],
            listview:false,
        }
    }
    
    componentDidMount(){
        const data = {
            InputXML: {
                OrganizationCode:"Matrix",
                MaximumRecords:"40"
               
            },
            
            ApiName: "getItemList",
            IsService: "N"
        }
        const ent = JSON.stringify(data.EnterpriseCode);
        console.log(ent);
        const reqData = {
            method:"POST",
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
            ItemList:itemList
        })
        this.props.onIncBtnClick(res.data.Item);
        
    })
}
loadItems = () => {
    console.log("Item in state are: ",this.state.Item);
    console.log("Itemlist instate are: ",this.state.ItemList);
    if(this.state.Item.length!==0){
        return this.state.Item.map((Itemid,index) => {
            const {ItemID,ItemKey} = Itemid
            return(
                <Col md="3">
                <ProductCard key = {ItemKey} itemid={ItemID} ItemType = {Itemid.PrimaryInformation.ItemType}/>
                </Col>
                )
        })
    }
    else{
        return this.state.ItemList.map((Itemid,index) => {
            const {ItemID,ItemKey} = Itemid
            return(
                <Col md="3">
                <ProductCard key = {ItemKey} itemid={ItemID} ItemType = {Itemid.PrimaryInformation.ItemType}/>
                </Col>
                )
        })

    }



}  
filterItems=(event)=>{
    console.log("items in the state are:",this.state.ItemList );
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
changeView=()=>{
    console.log("list view clicked:::",this.state.listview);
    this.setState({
        listview:!this.state.listview
    })
    
}
showProducts=()=>{
        if(this.state.Item.length!==0){
            return this.state.Item.map((Itemid,index) => {
                const {ItemID,ItemKey} = Itemid
                return(
                    <Col md="3">
                    <ProductCard key = {ItemKey} itemid={ItemID}/>
                    </Col>
                    )
            })
        }
        else{
            return this.state.ItemList.map((Itemid,index) => {
                const {ItemID,ItemKey} = Itemid
                return(
                    <Col md="3">
                    <ProductCard key = {ItemKey} itemid={ItemID}/>
                    </Col>
                    )
            })
    
        }
}
renderTableRows=()=>{
    if(this.state.Item.length!==0){
        return this.state.Item.map( (Item, index) => {
            return(
                <tr className="tableRows" style={{lineHeight:".20 !important"}} key={index}>
                    <td>{++index}</td>
                    <td style={{color:"rgba(4,71,132)"}} >{Item.ItemID}</td>
                    <td>{Item.UnitOfMeasure}</td>
                    <td>{Item.PrimaryInformation.UnitCost}$</td>
                    <td>{Item.PrimaryInformation.ShortDescription}</td>
                    <td>{  Item.ItemID === "100122" || Item.ItemID === "100005" || Item.ItemID === "100003" || Item.ItemID === "100013" || Item.ItemID === "100014" 
                    || Item.ItemID === "100019" || Item.ItemID === "100132" ||Item.ItemID === "100151" ? <p style={{color:"red"}}>Out of Stock</p> : <p style={{color:"green"}}>InStock</p>}</td>
                </tr>
                )
                
            })
        
}
else{
    return this.state.ItemList.map( (Item, index) => {
        return(
        <tr className="tableRows" style={{lineHeight:".20"}} key={index}>
            <td>{++index}</td>
            <td style={{color:"rgba(4,71,132)"}}>{Item.ItemID}</td>
            <td>{Item.UnitOfMeasure}</td>
            <td>{Item.PrimaryInformation.UnitCost}$</td>
            <td>{Item.PrimaryInformation.ShortDescription}</td>
            <td>{Item.OrganizationCode}</td>
            <td>{  Item.ItemID === "100122" || Item.ItemID === "100005" || Item.ItemID === "100003" || Item.ItemID === "100013" || Item.ItemID === "100014" 
    || Item.ItemID === "100019" || Item.ItemID === "100132" ||Item.ItemID === "100151" ? <p style={{color:"red"}}>Out of Stock</p> : <p style={{color:"green"}}>InStock</p>}</td>
        </tr>
        )
        
    })
}
}
renderTableData=()=>{

        return( 
            
            <Table responsive striped bordered hover sm="md">
            <thead>
                <tr>
                    <th  className="tableHeader">#</th>
                    <th  className="tableHeader">Product ID</th>
                    <th  className="tableHeader">Unit OF Measure</th>
                    <th  className="tableHeader">Unit Cost</th>
                    <th  className="tableHeader">Description</th>
                    <th  className="tableHeader">OrganizationCode</th>
                    <th  className="tableHeader">Availability</th>
                    
                </tr>
            </thead>
            <tbody>
            {this.renderTableRows()}
            </tbody>
                </Table>
               
                )

            
}

    render() { 
      
        return ( <div style={{overflowX:"hidden"}}>
    
    <Card className="toolCard">
       
            <Row>
        <Col md="3"><h3 style={{float:"left",paddingLeft:"20px",paddingTop:"4px",fontSize:"22px",fontWeight:"400"}}>Products</h3></Col><Col md="3"></Col>
        <Col md="6">
      
            {/* <Button style={{float:"left",marginRight:"10px"}} outline color="secondary" >Add New</Button>
            <Button style={{float:"left",marginRight:"10px"}}  outline color="secondary">Upload</Button> */}      
            <Input style={{width:"40%",float:"right", border:"1px solid rgba(4,71,132)" }} className="form" onChange={this.filterItems} type="text" name="search" id="searchText" placeholder="Type to Search" />
            <Button className="ButtonClass10" style={{float:"right" ,marginRight:"10px", border:"1px solid rgba(4,71,132)"}}   outline  onClick={this.changeView}>{!this.state.listview ? <MdReorder size={24}/>:<MdViewModule size={24}/>}</Button>
        </Col>
      
        </Row> 
        </Card>
        <Container fluid={true}>
            <div >
                    <Card style={{marginTop:"10px",alignSelf:"center",width:"90%",marginLeft:"70px"}}>
                    {this.state.listview===false ? <Row md="4">{this.showProducts()}</Row>: this.renderTableData()}
                   
                    </Card>
                    </div> 
                    </Container>
        </div> );
    }
}
const mapStateToProps=state=>{
    console.log(state)
    return{
        ItemList:state.product.ProductList
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onIncBtnClick: (data)=>dispatch({type: actionTypes.ADD_PRODUCT,payload:data})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductContainer);