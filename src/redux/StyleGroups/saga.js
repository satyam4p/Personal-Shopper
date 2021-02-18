
import {
  call,
  put,
  takeEvery,
} from "redux-saga/effects";
import axios from 'axios';


const fetchData = () => {
  const data = {
    InputXML:{
      EnterpriseCode:"S-MART"
    },    
     ApiName:"getItemList",
     IsService:"N"
}
// var postObject = {"CommandName":"getItemList"};
// 			postObject.InputXml = {EnterpriseCode:"S-MART"};
// 			postObject.Template = {};
// 			postObject.IsService = "N";
// const reqData = {
//       method:"POST",
//       url:`http://localhost:5000/api`,
//       data:JSON.stringify(data),
//       headers:{
//           "Content-Type":"application/json"
//       }
//   }
console.log("Post object is: ",data);
  const reqData = {
    method:"POST",
    // url:`http://localhost:8080/Rabbit/proxy/service/Httpinvoke`,
    //url:`http://localhost:5000/api`,
    url: `http://207.148.123.221:5000/api`,
    data:JSON.stringify(data),
    headers:{
        "Content-Type":"application/json",
        // "X-CSRFToken":window.AppInfo.bridgecsrftoken
    }
  
}
 return axios(reqData)
 .then(res => {
  const response = res.data.Item;    
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
      console.log(error);
  }
}



 export default function* watchAddData(){
  console.log("yessssssss");
  yield takeEvery('ADD_DATA',fetchSubscriptionData);
}