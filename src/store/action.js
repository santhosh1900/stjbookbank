import { apiCall} from "../service/api";
import cookies from 'universal-cookie';
const Cookie = new cookies();
const url  = "https://stjbookbankbackend.herokuapp.com";
// const url = "http://localhost:3001";


//========== auth ====================
export const LOGIN_USER             = "LOGIN_USER";
export const LOGOUT_USER            = "LOGOUT_USER";
export const ADD_ADDRESS            = "ADD_ADDRESS";
export const ADD_PURCHASE_HISTORY   = "ADD_PURCHASE_HISTORY";


// ================================book==================
export const ADD_BOOKS        = "ADD_BOOKS";
export const UPDATE_ONE_BOOK  = "UPDATE_ONE_BOOK";





export function setCurrentUser(user) {
    return dispatch => {
      dispatch({type: LOGIN_USER, user});
    };
}

export function LogoutUser(){
  return dispatch => {
    dispatch({type : LOGOUT_USER });
  }
}


export function AddUser(type, userData) {
    return async dispatch => {
      try{
        const responsedata = await apiCall("post", `${url}/${type}`, userData),
        token              = responsedata.token,
        token_user         = responsedata.token_user;
        localStorage.setItem("token", token);
        Cookie.set("token", token , {path : "/"});
        localStorage.setItem('userdata', JSON.stringify(token_user));
        return dispatch(setCurrentUser(token_user));
      }catch(err){
        throw(err);
      }
  };
};

export function RequestFunction (method , type , data="") {
  return async dispatch => {
    try{  
      let responseData; 
      if(method === "get" || method === "delete"){
        responseData = await apiCall(method , `${url}/${type}`);
      }else{
        responseData = await apiCall(method , `${url}/${type}`, { data });
      }  
      // console.log(responseData)
      if(responseData["action2"]){
        dispatch({
          type      : responseData["action2"],
          data      : {
              bookId      : responseData["BOOKID"],
              copiesLeft  : responseData["CopiesLeft"]
            }
        });
        if(responseData["message"]){
          throw(responseData["message"])
        }; 
      }    
      return dispatch({ 
        type      : responseData["action"],
        data      : responseData["data"]
      });
    }catch(err){
      throw(err);
    }
  }
}