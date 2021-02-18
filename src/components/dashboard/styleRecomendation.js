import React, { Component } from 'react';
import {Card,CardBody,CardTitle} from 'reactstrap';
import MyChart from '../../components/dashboard/BarChart';
import './dashboard.css';

class StyleRecomendations extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Card>
                <CardBody className="stylerecomend">
                <CardTitle className="title"><b>STYLE RECOMENDATIONS</b></CardTitle>

                            <MyChart/>            

                </CardBody>
            </Card>

        </div>);
    }
}
 
export default StyleRecomendations ;