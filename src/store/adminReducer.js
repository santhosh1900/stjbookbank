import { ADD_RETURN_REQUESTED, 
    UPDATE_ONE_RETURN_REQUEST, 
    SHOW_ALL_BOOK_BANK_BOOKS, 
    UPDATE_BOOK_COPIES, 
    LIST_OF_USERS, 
    CURRENT_STUDENT_HISTORY, 
    CLEAR_CURRENT_STUDENT_HISTORY} 
from "./action";

const initialState = {
    returnRequest : [],
    bookBankBooks : [],
    trendingBook  : null,
    listOfUsers   : [],
    currentStudentHistory : []
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
        case SHOW_ALL_BOOK_BANK_BOOKS : 
            return {
                ...state,
                bookBankBooks : action.data,
                trendingBook  : action.data[0]
            }
        case UPDATE_BOOK_COPIES : 
            let allBookBankBooks = state.bookBankBooks;
            for(let book of allBookBankBooks){
                if(book._id == action.data._id){
                    book.Copies         = book.Copies + action.data.inc;
                    book.CopiesLeft     = book.CopiesLeft + action.data.inc;
                    book.RequestLimit   = book.RequestLimit + action.data.inc;
                    break;
                }
            }
            return {
                ...state,
                bookBankBooks : [...allBookBankBooks]
            }
        case LIST_OF_USERS :
            return{
                ...state,
                listOfUsers : action.data
            }
        case CURRENT_STUDENT_HISTORY:
            return {
                ...state,
                currentStudentHistory : action.data['PurchaseHistory']
            }
        case CLEAR_CURRENT_STUDENT_HISTORY :
            return{
                ...state,
                currentStudentHistory : []
            }
        default:
            return state
    }
}