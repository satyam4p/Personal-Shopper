import React, { Component } from 'react';
import {Card,CardBody,CardTitle,Row,Col} from 'reactstrap';
import recent from '../../components/dashboard/images/recent.png';
import p1 from '../../components/dashboard/images/p1.png';
import './dashboard.css';
class NewArrival extends Component {
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
    getNewArrivals=()=>{
        return(<div>
           <Row xs="2">
            {
            this.state.Products.slice(0,8).map((product,index) =>
                <Col key={index}>
                    <img className="prodImg" src={p1}  alt=''/>
               
                <p className="productName">{product.name}</p>
                </Col>
              )
            
            }

            </Row>  
          </div>)   
            }
    render() { 
        return ( <div>
          <Card>
                <CardBody className="">
                <CardTitle className="title"><img className="imgSize" src={recent} alt=""/> <b>NEW ARRIVAlS</b></CardTitle>
                {this.getNewArrivals()}     
                </CardBody>
            </Card>
        </div>);
    }
}
export default NewArrival;