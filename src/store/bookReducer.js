import { ADD_BOOKS } from "./action";

const initialState = {
    availableBooks      : [],
    TotalBooks          : []
};

export default (state = initialState , action) => {
    switch(action.type) {
        case ADD_BOOKS:
            return{
                ...state,
                availableBooks      : action.books,
                TotalBooks          : action.books.length
            }
        default:
            return state
    }
}