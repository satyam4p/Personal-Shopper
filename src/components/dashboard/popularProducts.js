import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container} from 'reactstrap';
import popular from '../../components/dashboard/images/popular.png'
import popularProd from '../../components/dashboard/images/p1.png'
import {connect} from 'react-redux';
import * as actionTypes from '../../redux/actions';
import './dashboard.css';
 
class PopularProducts extends Component {
   constructor(props){
        super(props)
        this.state = {
     Products: [{ img:"./sample.jpg", name:"Jeans", category:"Toys" },
            { img:"./sample.jpg", name:"Handbag", category:"Electronics" },
            { img:"./sample.jpg", name:"Cap", category:"Electronics" },
            { img:"./sample.jpg", name:"Shirt", category:"Electronics" },
            { img:"./sample.jpg", name:"Trowsers", category:"Electronics" },
            { img:"./sample.jpg", name:"Jacket", category:"Electronics" },
            { img:"./sample.jpg", name:"Tie", category:"Electronics" },
            { img:"./sample.jpg", name:"Socks", category:"Electronics" },
            { img:"./sample.jpg", name:"Shoes", category:"Electronics" }
            ]
           
        }
    };
    getPopularProduct=(dispatch)=>{
        return{
           Click : function(data){
           dispatch({type: actionTypes.ADD_NUMBERS,payload:data})
        }
        }
    }
    getPopularProducts=( )=>{
        return(<div>  <Row xs="2">
    
            {
            
            this.state.Products.slice(0,8).map((product,index) =>
                 <Col key={index}>
                   <img className="prodImg" src={popularProd} alt='image'/>
                  <p className="productName">{product.name}</p>
                </Col>
              )
            }
       </Row>    </div>)   
            }  
    render() { 
            const data="hiiii"
        return ( <div>
              <Card>
                <CardBody>
                <CardTitle className="title"><img className="imgSize" src={popular}/><b> POPULAR PRODUCTS</b></CardTitle>
                        <Row>   {this.getPopularProducts()} </Row>
                        { console.log("test")}
                       <Button onClick={this.props.onIncBtnClick}>BTN</Button>
                       {        console.log(this.props.cnt)
}
                </CardBody>
            </Card>

        </div>);
    }
}
const mapStateToProps=state=>{
    return{
        cnt:state.text
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onIncBtnClick: ()=>dispatch({type: actionTypes.ADD_NUMBERS,payload:"ypo"})
        // 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PopularProducts);