import React from 'react';
import "./BookManagementModel.css";

function BookManagementModel({ studentsList, CopiesLeft, copiesLeftValueChange = () => {}, actualCopiesLeft, submitUpdateCopies}) {
    return (
        <div className="bookManagementModel">
            <h4 className="center-align p-1">Students Having This Book</h4>
            <form onSubmit={submitUpdateCopies}>
                <label htmlFor="vol">Number Of Copies Left In Book Bank {CopiesLeft} </label>
                <input type="range" id="vol" min="1" max="100" value={CopiesLeft} onChange={(e) => copiesLeftValueChange(e.target.value)} />
                { actualCopiesLeft != CopiesLeft && <button type="submit" className="btn modal-close waves-effect waves-teal"> Update Book Copies </button> }
            </form>
            { studentsList.length == 0 && <h3 className="emptyList">No Students Having this book</h3>}
            { studentsList.length > 0 && <ul className="collection">
                {(
                    studentsList.map((val , i ) => ( 
                        <li className="collection-item avatar pt-15" key={i}>
                            <img src={val.ProfilePic} alt="" className="circle" />
                            <p className="user_desc">Name : <span> {val.Username} </span> </p>
                            <p className="user_desc">Email : <span> {val.Email} </span></p>
                        </li>
                    ))
                )}
            </ul>
            }
        </div>
    )
}

export default BookManagementModel
