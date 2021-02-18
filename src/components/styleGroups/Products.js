import React,{Component} from 'react';
import {CardText} from 'reactstrap';
import './styleGroupCard.css';


export default class products extends Component{
    render(){    
    return(
            <div className="ProductCardsDiv">
                <CardText className="ProductCardsText">{this.props.ItemID}</CardText>
            </div>
        )
    }
    
}
