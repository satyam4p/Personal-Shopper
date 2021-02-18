import React from 'react';
import { CardText,CardTitle,Card,CardBody,Button,Col } from 'reactstrap';
// import '../App.css';

const viewsubscription = ( props ) => {
    
    if (!props.type){
        console.log("Inside IF")
        console.log(props)
        return (
            <div >
                <Col className="c">
                <Card body outline color="dark" className="Cards">
                    <CardBody >
                        <CardTitle>{props.programme}</CardTitle>
                        <CardText>Subscription Name:<br/>{props.name}</CardText>
                        <CardText>Subscription Status:<br/>{props.staus}</CardText>
                        <CardText>Starts From:<br/>{props.date}</CardText>
                        <CardText>Customers:<br/>{props.customers}</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                </Col>
            </div>
            // <div className="Person">
            //     <p onClick={props.click}>League:{props.name}<br/>Sports:{props.sports}<br/>Country:{props.country}</p>
            //     {/* <p>{props.children}</p> */}
            //     {/* <input type="text" onChange={props.changed}  /> */}
            // </div>
        )
    }
    else{
        console.log(props)
        return (
            <div>
                
            </div>
            
        )
    }
    
};

export default viewsubscription;