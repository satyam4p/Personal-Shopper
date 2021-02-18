import Dashboard from './container/Dashboard/dashboard';
import StyleGroups from './container/StyleGroup/StyleGroups';
import React, { Component } from 'react';
import {Link,Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import Subscriptions from './container/Subscriptions/Subscription'
import Customers from './container/Customers/Customer'
import ProductContainer from './container/Products/Product';
import NavbarComp from './components/navbar/navbar';
import OrderSearch from './components/OrderSearch/OrderSearchScr';
import OrderDetails from './components/OrderDetails/OrderDetails';

class Routes extends Component {
    constructor(props){
      super(props);
    }
    render() {
      
      

      
        return ( <Switch>
          
            <Router basename={this.props.baseName}>
            <Route exact={true} path="/">
              <Dashboard/>
            </Route>
            <Route path="/OrderSearch">
              <OrderSearch/>
            </Route>
            <Route path="/GetCompleteOrderDetails">
              <OrderDetails />
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
             </Route>
              <Route path="/stylegroups">
              <StyleGroups/>
            </Route>
            <Route path="/subscriptions">
              <Subscriptions/>
             </Route>
             <Route path="/customers">
              <Customers/>
            </Route>
            <Route path="/products">
              <ProductContainer/>
            </Route>
            </Router>
           
        
           </Switch> );
    }
}
 
export default Routes;
