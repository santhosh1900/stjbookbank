import { LOGIN_USER , LOGOUT_USER } from "./action";

const initialState = {
    userData        : null
};

export default (state = initialState , action) => {
    switch (action.type){
        case LOGIN_USER : 
            return {
                ...state,
                userData    : action.user
            }
        case LOGOUT_USER :
            return {
                ...state,
                userData    : null
            }
        default : 
            return state;
    }
}