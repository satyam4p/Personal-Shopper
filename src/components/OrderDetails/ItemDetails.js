import React,{Component} from 'react';
import {Card} from 'reactstrap';


export default class ItemDetails extends Component{

    constructor(props){
        super(props);
        this.props= props;
        this.state={
            
        }
        console.log("orderlines in itemdetails ",this.props);

    }

    render(){
        return(
            <div>
                <Card>
                    
                </Card>
            </div>
        )
    }



}