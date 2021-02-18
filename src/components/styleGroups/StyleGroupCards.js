import React,{Component} from 'react';
import {  Row, Col} from 'reactstrap';
import './styleGroupCard.css';
import {Card,CardImg,
     CardBody,CardTitle,CardSubtitle} from 'reactstrap';
import ProductsComp from './Products';
import StyleGroupName from './StyleGroupNames';
import GroupPrice from './GroupPrice';
//  import {Card,CardDeck} from 'react-bootstrap';
import image from './images/image1.png';
import editLogo from './images/edit.png';

 
export default class StyleGroupTypes extends Component{


    render(){
        return(
            <div className="cardsDiv"> 
                <Row>
                <Col >
                <Card className="StyleCard">
                    <CardBody>
                   
                    <CardTitle className="StyleGroupTitle">Style Group Type</CardTitle>
                    <CardImg className="StyleCardImg" top width="50%" src={image} alt=" " /> 
                    <div className="StyleGroupSubTitleDiv">
                    <CardSubtitle className="StyleGrpNameSubTitle">Style Group</CardSubtitle><br></br>
                    </div>
                    <StyleGroupName/>
                    <StyleGroupName/>
                    <CardSubtitle className="ProductsCardSubTitle">Product</CardSubtitle>
                    <ProductsComp ItemID = {this.props.itemid}/> 
                    <GroupPrice/>
                    <img className="styleCardEditButton" src={editLogo} alt=""/>
                    </CardBody>
                </Card>
                </Col>
                </Row>
               
                       
                    
            </div>

        );
    }

}