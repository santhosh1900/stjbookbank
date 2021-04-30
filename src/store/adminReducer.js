import { ADD_RETURN_REQUESTED, UPDATE_ONE_RETURN_REQUEST } from "./action";

const initialState = {
    returnRequest : []
};

export default (state = initialState , action) => {
    switch (action.type){
        case ADD_RETURN_REQUESTED : 
            return {
                ...state,
                returnRequest  : action.data,
            }
        case UPDATE_ONE_RETURN_REQUEST :
            let all_requests    = state.returnRequest
            all_requests[action.data.index].Request_Success = true;
            all_requests[action.data.index].Book_Returned_Date = new Date();
            return {
                ...state,
                returnRequest  : all_requests,
            }
        default:
            return state
    }
}