import * as actionTypes from './action'
import { render } from '@testing-library/react';

const initalState={
ProductList:[]   
};

const reducer =(state=initalState ,action)=>{

    if(action.type=="ADD_PRODUCT")
        return{
            ProductList : action.payload

        }
        return state
    
}

export default reducer;