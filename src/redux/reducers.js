import { combineReducers } from 'redux'
import productReducer from './Product/reducer'
import styleGrpReducer from './StyleGroups/reducer'
import orderDetailsReducer from './OrderDetails/reducer';
const rootReducer = combineReducers({
    product:productReducer,
    styleGrp:styleGrpReducer,
    orderdetails:orderDetailsReducer
})
export default rootReducer