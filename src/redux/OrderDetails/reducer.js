import * as actionTypes from './action';
import { render } from '@testing-library/react';

const initialState={
    OrderDetails:[]
}

const reducer = (state=initialState,action) =>{

    console.log("inside reducer Order Details");
    if(action.type=="FETCH_ORDER_DETAILS"){
        console.log("inside iff condition of reducer!!");
        return {
            ...state,
        OrderDetails : action.payload
        }
    }
    return state

}
export default reducer;