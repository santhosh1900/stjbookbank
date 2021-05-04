import { ADD_NOTIFICATION, ADD_SOCKET_NOTIFICATION } from "./action";

const initialState = {
    Notifications : []
};

export default (state = initialState , action) => {
    switch (action.type){
        case ADD_NOTIFICATION:
            return{
                ...state,
                Notifications : action.data
            }
        case ADD_SOCKET_NOTIFICATION:
            return{
                ...state,
                Notifications : [action.data, ...state.Notifications]
            }
        default:
            return state
    }
}