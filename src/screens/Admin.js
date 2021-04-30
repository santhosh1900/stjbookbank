import React, { useEffect } from 'react';
import "./Admin.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RequestFunction } from "../store/action";
import M from "materialize-css";

function Admin() {
    const userdata      = useSelector(state => state.auth.userData);
    const RequestList   = useSelector(state => state.admin);
    const history       = useHistory();
    const dispatch      = useDispatch();
    useEffect(async () => {
        if(userdata){
            !userdata.IsAdmin && history.push("/"); 
        }
        await dispatch(RequestFunction("get","returnrequests"));
    },[]);

    const TimeFormat = (date) => {
        var d = new Date(date);
        return d.toDateString()
    }

    const Mark_As_Received = async(id, index) =>{
        try{
            var data = {
                id,
                index
            }
            await dispatch(RequestFunction("put", "markasreceived", data));
        }catch(err){
            return M.toast({html: "Unkown error occured" , classes:"red"});
        }
    }


    return (
        <div className="Admin  container">
            <h3 className="center-align"> Admin Bench </h3>
            <ul className="collection">
                {
                   (userdata) && (
                       RequestList.returnRequest.map((val,i) => (
                            <li className="collection-item avatar" key={i}>
                                <img src={ val.BookId.Image } alt="" className="circle" />
                                <div className="heading">
                                    <span className="title">Book Name : { val.BookId.Name } </span>
                                </div>
                                <p>Requested User   : { val.UserId.Username } <br/>
                                    Requested Date  : { TimeFormat(val.Request_Date) } <br />
                                    Book Returned Date : { val.Book_Returned_Date ? TimeFormat(val.Book_Returned_Date) : "-" }
                                </p>
                                {
                                    !val.Request_Success && (
                                    <a 
                                        className="btn-small orange set_as_receive"
                                        onClick={ () => Mark_As_Received(val._id, i) }> 
                                        Set as Received 
                                    </a>
                                    )
                                }
                                <a href="#!" className="secondary-content status">
                                    Request Status : { val.Request_Success ? 
                                        <span className="green-text"> Book Returned </span>  :  <span className="orange-text"> Pending </span>  
                                    }
                                </a>
                                
                                
                            </li>
                       ))
                   ) 
                }
            </ul>
        </div>
    )
}

export default Admin
