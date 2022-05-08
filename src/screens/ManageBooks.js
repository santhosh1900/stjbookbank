import React , { useEffect , useRef, useState } from 'react';
import "./ManageBooks.css";
import Card from "../Components/Card";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Components/Spinner";
import { RequestFunction } from "../store/action";
import BookManagementModel from '../Components/BookManagementModel';
import M from "materialize-css";
function ManageBooks() {
    const Books             = useSelector(state => state.admin.bookBankBooks);
    const trendingBook      = useSelector(state => state.admin.trendingBook);
    const modal             = useRef(null);
    const dispatch          = useDispatch();
    const [studentsList, setStudentsList]           = useState([]);
    const [copiesLeft, setCopiesLeft]               = useState(0);
    const [actualCopiesLeft, setActualCopiesLeft]   = useState(0);
    const [selectedBookId, setSelectedBookId]       = useState("");
    useEffect(async () => {
        await dispatch(RequestFunction("get","allbookbankbooks"));
        M.Modal.init(modal.current,{
            outDuration : 500
        });
    },[]);

    const openModal = (book) => {
        setSelectedBookId(book._id);
        setStudentsList(book.UsersHaveThatBook)
        setCopiesLeft(book.CopiesLeft);
        setActualCopiesLeft(book.CopiesLeft);
        M.Modal.getInstance(modal.current).open();
    }

    const copiesLeftValueChange = (copiesLeftValue) => {
        setCopiesLeft(copiesLeftValue);
    }

    const submitUpdateCopies = async (e) => {
        try{
            e.preventDefault();
            var data = {
                _id         : selectedBookId,
                addCopies   : (copiesLeft - actualCopiesLeft)
            }
            await dispatch(RequestFunction("post", "updatebookcopies", data));
            await M.toast({html: "Book Copies Successfully Updated" , classes:"green"});
        }catch(err){
            console.log(err);
            await M.toast({html: "Oops Something Went Wrong" , classes:"#c62828 red darken-3"});
            throw(err);
        }
    }

    return (
        <div className="managebooks">
            
            {
                (Books.length <= 0) ? <Spinner /> 
                :
                (<div>
                    <h4 className="center-align p-1"> Trending Book </h4>
                    <div className="row trendingBook">
                        <Card 
                            key         = {1} 
                            Image       = {trendingBook.Image} 
                            Name        = {trendingBook.Name}  
                            Description = {trendingBook.Description}
                            Author      = {trendingBook.Author}
                            cardClass   = {"col card-temp"}
                            orderCount  = {trendingBook.OrderCount}
                            select={() => {openModal(trendingBook)}}
                        />
                    </div>
                    <h4 className="center-align p-1"> Books Management </h4>
                    <div className="row">
                        {
                            (Books) && (Books.map((val , i )=>(
                                <Card 
                                    key         = {i} 
                                    Image       = {val.Image} 
                                    Name        = {val.Name}  
                                    Description = {val.Description}
                                    Author      = {val.Author}
                                    select={() => {openModal(val)}}
                                />
                            ))
                            )
                        }
                    </div> 
                </div>)
            }

            <div id="modal2" className="modal modal-fixed-footer" ref={modal}>
                <BookManagementModel 
                    studentsList = {studentsList}
                    CopiesLeft   = {copiesLeft}
                    copiesLeftValueChange = {copiesLeftValueChange}
                    actualCopiesLeft      = {actualCopiesLeft}
                    submitUpdateCopies    = {submitUpdateCopies}
                />
            </div>
        </div>
    )
}

export default ManageBooks
