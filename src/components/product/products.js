import React,{Component} from 'react';
import {  Row, Col, CardHeader} from 'reactstrap';
import '../styleGroups/styleGroupCard.css';
import {Card,CardImg,
     CardBody,CardSubtitle,CardText} from 'reactstrap';

// import StyleGroupName from './StyleGroupNames';
// import GroupPrice from './GroupPrice';
import image from './images/image1.png';
export default class Products extends Component{
    constructor(props){
        super(props);
        console.log("itemid: ",this.props.itemid);
        console.log("ItemType: ",this.props.ItemType);
    }    
    render(){
       
        return(
            <div className="cardsDiv"> 
                <Row>
                <Col >
                <Card className="StyleCard">
                    <CardHeader className="StyleGroupTitle">ACCESSORIES</CardHeader>
                    <CardBody>
                    <CardImg className="StyleCardImg" top width="50%" src={image} alt=" " /> 
                    <div className="StyleGroupSubTitleDiv">
                    <CardSubtitle className="StyleGrpNameSubTitle">Product</CardSubtitle>
                    <CardText className="productText" style={
                        {
                            textAlign:"left",color:"blueviolet"
                        }
                    }>{this.props.itemid}</CardText><br></br>
                 
                    </div>
                    {/* <StyleGroupName/>
                    <StyleGroupName/> */}
                    <CardSubtitle className="ProductsCardSubTitle">Size option</CardSubtitle><CardSubtitle style={{color:"blueviolet",textAlign:"left"}}>L M S</CardSubtitle>
                    {/* <ProductsComp ItemID = {this.props.itemid}/>  */}
                    {/* <GroupPrice/> */}

                    <CardSubtitle className="ProductsCardSubTitle">Color options</CardSubtitle><CardSubtitle style={{color:"blueviolet",textAlign:"left"}}>Red Grey</CardSubtitle>
                    {/* <ProductsComp ItemID = {this.props.itemid}/>  */}
                    {/* <GroupPrice/> */}

                    <CardSubtitle className="ProductsCardSubTitle">Availability</CardSubtitle><CardSubtitle style={{color:"blueviolet",textAlign:"left"}}>{

                          this.props.itemid === "100122" || this.props.itemid === "100005" || this.props.itemid === "100003" || this.props.itemid === "100014" || this.props.itemid === "100013" 
                        || this.props.itemid === "100019" || this.props.itemid === "100132" || this.props.itemid === "100151" ? <p style={{color:"red"}}>Out Of Stock</p> : <p style={{color:"green"}}>InStock</p>}</CardSubtitle>
                    {/* <ProductsComp ItemID == {this.props.itemid}/>  */}
                    {/* <GroupPrice/> */}
                    {/* <img className="styleCardEditButton" src={editLogo}/> */}
                    </CardBody>
                </Card>
                </Col>
                </Row>
               
                       
                    
            </div>

        );
    }

}