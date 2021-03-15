import React , { useEffect , useRef, useState } from 'react';
import "./home.css";
import Slider from "../Components/Slider";
import Card from "../Components/Card";
import { RequestFunction } from "../store/action";
import { useDispatch , useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import M from "materialize-css";
import ModalTag from "../Components/Modal";

function Home() {
    const dispatch                              = useDispatch();
    const Books                                 = useSelector(state => state.book.availableBooks);
    const UserAddress                           = useSelector(state => state.auth.address);
    const modal                                 = useRef(null);
    const [ modalItem , setModalItem ]          = useState("");
    const [ billingSection , setBillingSection ]  = useState(false);
    const [ error , setError ]                    = useState("");


    useEffect(async () => {
        try{
            if(Books.length <= 0){
                setTimeout(async () => {
                    try{
                        await dispatch(RequestFunction("get","getAllBooks"));
                    }catch(err){
                        return M.toast({html: err , classes:"#c62828 red darken-3"});
                    } 
                },1000);
            }
            M.Modal.init(modal.current,{
                outDuration : 500,
                onCloseEnd : closeModalFunction
            });           
        }
        catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        }
    },[]);


    const openModal = (val) => {
        setModalItem(val);
        M.Modal.getInstance(modal.current).open();
    };

    const Addtocart = async (modalItem) => {
        try{
            if(!UserAddress && !error){
                await dispatch(RequestFunction("get" , "useraddress")); 
            }
            await setBillingSection(true);
        }catch(err){
            setError(err);
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        }
    }

    const closeModalFunction = () => {
        setBillingSection(false);
    }

    const orderTheBook = async (bookDetails) => {
        try{
            await dispatch(RequestFunction("post", "orderbook" , { id : bookDetails._id }));
        }catch(err){
            console.log(err)
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        }
    }

    return (
        <div className="homePage">
            {   (Books.length <=0) ?
                ( <Spinner /> )
                :( <div>
                    <Slider />
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
                </div> )
            }

            <div id="modal1" className="modal modal-fixed-footer" ref={modal}>
                <ModalTag 
                    modalItem = {modalItem} 
                    Addtocart={Addtocart} 
                    billingSection={billingSection} 
                    UserAddress = {UserAddress}
                    orderTheBook = {orderTheBook}
                />
            </div>
        </div>
    )
}

export default Home
