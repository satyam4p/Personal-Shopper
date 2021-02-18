
import {
    all,
    call,
    fork,
    put,
    take,
    takeEvery,
    delay
  } from "redux-saga/effects";
  import axios from 'axios';
  
  
  const fetchData = () => {
    const {orders}  = this.props.location.state;
        console.log("asd ",this.props)
        const key = window.location.search;
        const params = new URLSearchParams(key);
        const OrderHeaderKey = params.get('key');
        console.log("orderheaderKey: ",OrderHeaderKey);
        const inputData = {
            OrderHeaderKey:OrderHeaderKey,
            ApiName:"getOrderDetails"
        }
        const reqData = {
            method:"POST",
            //url:`http://localhost:5000/api`,
            url: `http://207.148.123.221:5000/api`,
            data:JSON.stringify(inputData),
            headers:{
                "Content-Type":"application/json",
                // "X-CSRFToken":window.AppInfo.bridgecsrftoken
            }
        }
        // axios(reqData).then(res =>{
        //     console.log("response data is: ",res.data);
        //     console.log("Orderline in data: ",res.data.OrderLines.OrderLine);
        //     this.setState({
        //         OrderDetails:res.data,
        //         OrderLines:res.data.OrderLines.OrderLine,
        //         OrderDate:res.data.OrderDate
        //     })
        // }).catch(err=>{
        //     this.setState({
        //         fetched:false
        //     })
        //     console.log("An error occured",err);
        // })
   return axios(reqData)
   .then(res => {
     console.log("api called");
    const response = res.data;    
    console.log("OrderDetails are:  ",response);
    return response;
  })
     
    }
  function* fetchSubscriptionData(){
    try {
      let response = yield call(
          fetchData
        );
        console.log("response: ",response);
    yield put({type: 'DATA',payload:response})
  }catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
  }
  }
  
  
   export default function* watchAddData(){
    console.log("Nailed it!!");
    yield takeEvery('FETCH_ORDER_DETAILS',fetchSubscriptionData);
  }