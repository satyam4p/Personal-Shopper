import React,   {Component} from 'react';
import { Container, Row, Col,Input} from 'reactstrap';
import '../../components/styleGroups/styleGroupCard.css';
import {Button} from 'reactstrap';
import StyleGroupCards from '../../components/styleGroups/StyleGroupCards';
import {connect} from 'react-redux'
import * as actionTypes from '../../redux/StyleGroups/action';

  class StyleGroups extends Component {
    constructor(props){
        super(props); 
    }
    state = {
        ItemList:[]
    }

    componentDidMount(){
        // const data = {
        //     "EnterpriseCode":this.state.EnterpriseCode,
        //      "ApiName":this.state.ApiName
        // }
        // const ent = JSON.stringify(data.EnterpriseCode);
        // const reqData = {
        //     method:"POST",
        //     url:`http://localhost:5000/api`,
        //     data:JSON.stringify(data),
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // }
        // axios(reqData).then(res => {
        //     {  this.props.onIncBtnClick(res.data.Item)
        //     }
        // })
        this.props.onIncBtnClick();
        
    }

    loadItems = () => {
       
        console.log("Itemlist:",this.props.ItemList);
        console.log(typeof(this.props.ItemList));
        const len = this.props.ItemList.length;
        console.log("length:",len); 
        
        console.log("Naya wala console:");
        if(this.props.ItemList){
            console.log("inside if cond")
            return this.props.ItemList.map(function(Itemid,index){
                const {ItemID,ItemKey} = Itemid
                return(
                    <StyleGroupCards key = {ItemKey} itemid = {ItemID}/>
                )
            })
        }
    


    }
    render(){
        return(
            <div>
            <Container fluid={true}>
            <div>
            
                    <Row>
                <Col md="6"><h3>Style Groups (AKA Subscription Items)</h3></Col>
                <Col md="6">
                <div className="def">
                    <Button outline color="secondary" >Add New</Button>
                    <Button outline color="secondary">Upload</Button>
                    <Button  outline color="secondary">ListView</Button>
                </div>
                <div className="def">
                    <Input className="form" type="text" name="search" id="searchText" placeholder="Type to Search" />
                </div>
                </Col>
              
                </Row>        
                </div>
                <div>
                <div className="card">
                <div className="card-group">        
                    {this.loadItems()}
                </div>
                </div>
                {console.log("Once")}
                </div>
            </Container>   
            </div>        
            );
    }
}
const mapStateToProps=state=>{
    console.log(state);
    return{
            ItemList:state.styleGrp.ItemList
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onIncBtnClick: ()=>dispatch({type: actionTypes.ADD_DATA,payload:""})
        // 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(StyleGroups);