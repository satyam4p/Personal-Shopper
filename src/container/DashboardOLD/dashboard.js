import React, { Component } from 'react';
import { Container,Card,CardBody,CardText, Row, Col} from 'reactstrap';
import StyleRecomendations from '../../components/dashboard/styleRecomendation';
import MyTasks from '../../components/dashboard/myTasks';
import MyMessages from '../../components/dashboard/myMessages';
import InventoryMatrics from '../../components/dashboard/inventorymatrics';
import OrderFullfillment from '../../components/dashboard/orderFullfillment';
import NewArrival from '../../components/dashboard/newArrival';
import NotificationsAndActions from '../../components/dashboard/notificationsAndActions';
import RecentCustomers from '../../components/dashboard/recentCustomers';


import PopularProducts from '../../components/dashboard/popularProducts';

class Dashboard extends Component {
    state = {  }
    render() { 
        return (
          <Container  fluid={true}>
                <Card>
                    <CardBody>
                    <Row >
                    <Col md="9">
                    <Row sm="3" style={{marginBottom:"10px"}}>
                    <Col>
                    <StyleRecomendations/>
                    </Col>
                    <Col>
                    <InventoryMatrics/>
                    </Col>
                    <Col>
                    <OrderFullfillment/>
                    </Col>
                    </Row>
                    <Row sm="2" style={{marginBottom:"15px"}}>
                    <Col>
                    <MyTasks/>
                    </Col>
                    <Col>
                    <MyMessages/>
                    </Col>
                    </Row>
                    </Col>
                    <Col md="3">
                    <NotificationsAndActions/>
                    </Col>
                    </Row>
                    <Row >
                    <Col md="9" >
                    <Row sm="2">
                    <Col >
                    <NewArrival/>
                    </Col>
                    <Col>
                    <PopularProducts/>
                    </Col>
                    </Row>
                    </Col>
                    <Col md="3">            
                        <RecentCustomers/>
                    </Col>
                    </Row>
                    
                    
                    
                    </CardBody>
                 </Card>
          </Container>);
    }
}
 
export default Dashboard;