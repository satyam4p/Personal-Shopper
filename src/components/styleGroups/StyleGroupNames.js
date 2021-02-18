import React,{Component} from 'react';
import {CardText} from 'reactstrap';
import './styleGroupCard.css';

export default class styleGroupName extends Component {

    render(){
        return(
            <div className="StyleGroupDiv">
                <CardText className="StyleGroupCardText">Sample Group</CardText>
            </div>
        );
    }
}