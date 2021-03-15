import { ADD_BOOKS , UPDATE_ONE_BOOK } from "./action";

const initialState = {
    availableBooks      : [],
    TotalBooks          : [],
};

export default (state = initialState , action) => {
    switch(action.type) {
        case ADD_BOOKS:
            return{
                ...state,
                availableBooks      : action.data,
                TotalBooks          : action.data.length
            }
        case UPDATE_ONE_BOOK:
            let books = state.availableBooks;
            for(let i of books){
                if(i._id == action.data.bookId){
                    i.CopiesLeft = action.data.copiesLeft;
                }
            }
            return {
                ...state,
                availableBooks  : books,
                TotalBooks      : state.TotalBooks
            }
        default:
            return state
    }
}