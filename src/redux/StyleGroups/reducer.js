

const initalState={
    ItemList:[]
}
const reducer =(state=initalState ,action)=>{

            console.log("inside reducer");
            if(action.type==="DATA"){
                console.log("inside ifff");
               
            const len = action.payload.length;
            console.log("length of payload",len);
          
             return {
                 ...state,
             ItemList : action.payload
             }
            }
             return state
}

export default reducer;