import { LOGIN_USER , LOGOUT_USER , ADD_ADDRESS , ADD_PURCHASE_HISTORY } from "./action";

const initialState = {
    userData        : null,
    address         : null,
    PurchaseHistory : []
};

export default (state = initialState , action) => {
    switch (action.type){
        case LOGIN_USER : 
            return {
                ...state,
                userData        : action.user,
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
        default : 
            return state;
    }
}