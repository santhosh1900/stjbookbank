import { apiCall} from "../service/api";
import cookies from 'universal-cookie';
import {SocketSendBookReceived, socketConnection} from "./Socket";

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



// ==============================admin====================
export const ADD_RETURN_REQUESTED        = "ADD_RETURN_REQUESTED";
export const UPDATE_ONE_RETURN_REQUEST   = "UPDATE_ONE_RETURN_REQUEST";
export const SHOW_ALL_BOOK_BANK_BOOKS    = "SHOW_ALL_BOOK_BANK_BOOKS";
export const UPDATE_BOOK_COPIES          = "UPDATE_BOOK_COPIES";
export const LIST_OF_USERS               = "LIST_OF_USERS";
export const CURRENT_STUDENT_HISTORY     = "CURRENT_STUDENT_HISTORY";
export const CLEAR_CURRENT_STUDENT_HISTORY     = "CLEAR_CURRENT_STUDENT_HISTORY";


// ==============================sockets==========================
export const SOCKET_INITILIZE               = "SOCKET_INITILIZE";


// ================================== notification ==================
export const ADD_NOTIFICATION         = "ADD_NOTIFICATION";
export const ADD_SOCKET_NOTIFICATION  = "ADD_SOCKET_NOTIFICATION";


export function setCurrentUser(user) {
    return async dispatch => {
      await dispatch({ type: LOGIN_USER, user  });
      await dispatch({ type : SOCKET_INITILIZE });
    };
};


export function AddNotification(data){
  return async dispatch => {
    await dispatch({ type : ADD_SOCKET_NOTIFICATION , data});
  }
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
        await socketConnection (JSON.stringify(token_user));
        return dispatch(setCurrentUser(token_user));
      }catch(err){
        throw(err);
      }
  };
};

export async function AdminFunction(method, type, data = ""){
  try{  
    let responseData; 
    if(method === "get" || method === "delete"){
      responseData = await apiCall(method , `${url}/${type}`);
    }else{
      responseData = await apiCall(method , `${url}/${type}`, { data });
    } 
    if(responseData['message']){
      return responseData['message']
    }
    return "";      
  }catch(err){
    console.log(err);
    throw(err);
  }
}

export function RequestFunction (method , type , data="") {
  return async dispatch => {
    try{  
      let responseData; 
      if(method === "get" || method === "delete"){
        responseData = await apiCall(method , `${url}/${type}`);
      }else{
        responseData = await apiCall(method , `${url}/${type}`, { data });
      } 
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
      console.log(err);
      throw(err);
    }
  }
}