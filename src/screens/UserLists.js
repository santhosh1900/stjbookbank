import React, { useEffect, useRef } from 'react';
import "./UserList.css";
import { RequestFunction, CLEAR_CURRENT_STUDENT_HISTORY } from "../store/action";
import { useDispatch, useSelector} from "react-redux";
import Card from '../Components/Card';
import Spinner from "../Components/Spinner";
import M from "materialize-css";

function UserLists() {
    const dispatch          = useDispatch();
    const userlist          = useSelector(state => state.admin.listOfUsers);
    const userBookHistory   = useSelector(state => state.admin.currentStudentHistory);
    const modal             = useRef(null);
    useEffect(async () => {
        try{
            await dispatch(RequestFunction("get","listofusers"));
            M.Modal.init(modal.current,{
                outDuration : 200,
                onCloseEnd : clearCurrentStudentHistory
            });        
        }catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        }
    }, []);

    const clearCurrentStudentHistory  = async () => {
        await dispatch({type : CLEAR_CURRENT_STUDENT_HISTORY})
    }

    const openModal = async (user) => {
        var data = {id : user._id};
        await dispatch(RequestFunction("post", "usershistory", data));
        M.Modal.getInstance(modal.current).open();
    };

    const TimeFormat = (date) => {
        var d = new Date(date);
        return d.toDateString();
    }

    return (
        <div className="userList">
            <h4 className="center-align p-1"> List Of Students </h4>
            {
                userlist.length <= 0 ? ( <Spinner /> ) :
                <ul className="collection">
                    {(userlist.length > 0) && 
                        (userlist.map((val , i ) => (
                            <li className="collection-item avatar" key={i}>
                                <img src={val.ProfilePic} alt={val.ProfilePic} className="circle" />
                                <span className="title">{val.Username}</span>
                                <p> {val.Email} </p>
                                <a onClick={() => openModal(val)} className="secondary-content">List of books rented</a>
                            </li>
                        ))
                    )}
                </ul>
            }

            <div id="modal5" className="modal modal-fixed-footer" ref={modal}>
                <h4 className="center-align p-1"> Student Book History </h4>
                {(userBookHistory.length <= 0) ? 
                    <div className="progress #eceff1 blue-grey lighten-5">
                        <div className="indeterminate #1565c0 blue darken-3"></div>
                    </div>
                    :
                    <ul className="collection">
                        {userBookHistory.map((val , i ) => (
                            <li className="collection-item avatar userbookhistory" key={i}>
                                <img src={val.BookId.Image} alt={val.ProfilePic} className="circle userbookhistoryimage" />
                                <span className="title">{val.BookId.Name}</span>
                                <p>Order Date : {TimeFormat(val.OrderedDate)} </p>
                                <p> Status : {val.Status} </p>
                                <p>Return Date : {TimeFormat(val.ReturnDate)} </p>
                                { val.ReturnedOn && <p>Return On : {TimeFormat(val.ReturnedOn)} </p> }
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}

export default UserLists
