import React , { useEffect , useRef, useState } from 'react';
import "./home.css";
import Slider from "../Components/Slider";
import Card from "../Components/Card";
import { GetAllBooks } from "../store/action";
import { useDispatch , useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import M from "materialize-css";

function Home() {
    const dispatch          = useDispatch();
    const SelectCategory    = useSelector(state => state.book.SelectedCategory);
    const Books             = useSelector(state => state.book.availableBooks);
    const modal             = useRef(null);
    const [ modalName , setModalName ]          = useState("");
    const [ modalDesc , setModalDesc ]          = useState("");
    const [ modalAuthor , setModalAuthor ]           = useState("");
    const [ modalImage , setModalImage ]             = useState("");


    useEffect(async () => {
        try{
            setTimeout(async () => {
                await dispatch(GetAllBooks("getAllBooks"));
            },1000);
            M.Modal.init(modal.current,{
                outDuration : 500
            });
        }
        catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        }
    },[]);


    const openModal = (val) => {
        setModalAuthor(val.Author);
        setModalImage(val.Image);
        setModalDesc(val.Description);
        setModalName(val.Name);
        M.Modal.getInstance(modal.current).open();
    };



    return (
        <div className="homePage">
            {   Books.length <=0 ?
                ( <Spinner /> )
                :( <div>
                    <Slider />
                    <div className="row">
                        {
                            Books.map((val , i )=>(
                                <Card 
                                    key         = {i} 
                                    Image       = {val.Image} 
                                    Name        = {val.Name}  
                                    Description = {val.Description}
                                    Author      = {val.Author}
                                    select={() => {openModal(val)}}
                                />
                            ))
                        }
                    </div> 
                </div> )
            }

            <div id="modal1" className="modal modal-fixed-footer" ref={modal}>
                <div className="modal-content">
                <h5> { modalName } </h5>
                <div className="row">
                     <div className="col s12 m6">
                         <img src= { modalImage } />
                     </div>
                     <div className="col s12 m6">
                        <p> { modalDesc } </p>
                     </div>
                </div>
                </div>
                <div className="modal-footer">
                <h3 className="waves-effect waves-red btn-flat left-align">By { modalAuthor } </h3>
                <a className="modal-close waves-effect waves-teal btn-flat">Close</a>
                </div>
            </div>
        </div>
    )
}

export default Home
