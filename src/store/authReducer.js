import { LOGIN_USER , LOGOUT_USER , ADD_ADDRESS , ADD_PURCHASE_HISTORY, SOCKET_INITILIZE } from "./action";

const initialState = {
    userData        : null,
    address         : null,
    PurchaseHistory : [],
    Socket          : false
};

export default (state = initialState , action) => {
    switch (action.type){
        case LOGIN_USER : 
            return {
                ...state,
                userData   : action.user,
            }
        case LOGOUT_USER :
            return {
                ...state,
                userData        : null,
                address         : null,
                PurchaseHistory : null
            }
        case ADD_ADDRESS : 
            return {
                ...state,
                address         : action.data,
                PurchaseHistory : state.PurchaseHistory
            }
        case ADD_PURCHASE_HISTORY :
            return{
                ...state,
                PurchaseHistory : action.data.PurchaseHistory
            }
        case SOCKET_INITILIZE :
            return{
                ...state,
                Socket : true
            }
        default : 
            return state;
    }
}