import React, { Component, } from 'react';
import {Card,CardBody,CardTitle} from 'reactstrap';
import graph from '../../components/dashboard/images/graph.png';
import './dashboard.css';


class RecentCustomeres extends Component {
    constructor(props){
        super(props);
        this.state={
            
                  Customers:[{
                    CustomerId:'1',
                    First_Name:"Vibhuti",
                    LastName:'Ranjan',
                    City:"Bangalore",
                    State:"Karnatka"
                    },
                    {
                      CustomerId:'2',
                      First_Name:"Satyam",
                      LastName:'Kumar',
                      City:"Bangalore",
                      State:"Karnatka"
                      },
                      {
                       CustomerId:'3',
                       First_Name:"Prityanshu",
                       LastName:'Singh',
                       City:"Bangalore",
                       State:"Karnatka"
                      },
                      {
                     CustomerId:'4',
                      First_Name:"Saurabh",
                      LastName:'Jain',
                      City:"Bangalore",
                      State:"Karnatka"
                    },
                    {
                        CustomerId:'5',
                        First_Name:"Rajshree",
                        LastName:'Bhatt',
                        City:"Bangalore",
                        State:"Karnatka"
}]
    }};
    getCustomerDetails=()=>{
           return( <div>
              {
              this.state.Customers.slice(0,5).map((CustomersDetails,index) =>
              <ul key={index}>  
                  <li>
                    <p className="paragraph">{CustomersDetails.First_Name}{CustomersDetails.LastName} ,
                             {CustomersDetails.City}/{CustomersDetails.State}</p>
                 </li>
              </ul>
                )
              
              }

              
            </div>)
    }
    render() { 
        return ( <div>
      <Card className="recentCustCard">
  
                <CardBody className="stylerecomend">
                <CardTitle className="title"><img className="imgSize" src={graph} alt="img"/> <b> RECENT CUSTOMERS</b></CardTitle><br/>   
                    {
                    this.getCustomerDetails()  
                    }
             </CardBody>
            </Card>
        </div>);
    }
}
 
export default RecentCustomeres ;