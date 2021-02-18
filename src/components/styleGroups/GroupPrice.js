import React,{Component} from 'react';
import './styleGroupCard.css';
import {CardText,CardSubtitle} from 'reactstrap';

export default class GroupPrice extends Component{

    render(){
        return(
            <div className="groupPriceDiv">
                <CardSubtitle className="groupPriceSubtitle">
                    Group Price
                </CardSubtitle>
                <CardText className="groupPriceText">
                            US$  0.00
                </CardText>

            </div>
        );
    }
}