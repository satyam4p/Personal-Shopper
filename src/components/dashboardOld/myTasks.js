import React, { Component } from 'react';
import {Card,CardBody,CardTitle,CardText,CardSubtitle,Button,Row,Col,Container} from 'reactstrap';
import tasks from '../../components/dashboard/images/tasks.png';
import './dashboard.css';
class MyTasks extends Component {
    state = {  }
    render() { 
        return ( <div>
              <Card style={{ borderColor: '#333' }}>
                <CardBody className="">
                <CardTitle className="title"><img className="imgSize" src={tasks}/><b> MY TASKS</b></CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>BTN</Button>                

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default MyTasks ;