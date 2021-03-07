import { apiCall} from "../service/api";
import cookies from 'universal-cookie';
const Cookie = new cookies();
const url  = "https://stjbookbankbackend.herokuapp.com";

//========== auth ====================
export const LOGIN_USER    = "LOGIN_USER";
export const LOGOUT_USER   = "LOGOUT_USER";


// ================================book==================
export const ADD_BOOKS     = "ADD_BOOKS";





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

export function GetAllBooks (type) {
  return async dispatch => {
    try{  
      const responseData = await apiCall("get" , `${url}/${type}`);
      return dispatch({ 
        type      : ADD_BOOKS,
        books     : responseData
      });
    }catch(err){
      throw(err);
    }
  }
}