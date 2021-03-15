import React,{ useEffect ,useState , useRef , useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import "./userprofile.css";
import M from "materialize-css";
import { RequestFunction } from "../store/action";
import Spinner from "../Components/Spinner";


function Userprofile() {
    const dispatch              = useDispatch();
    const userdata              = useSelector(state => state.auth.userData);
    const UserAddress           = useSelector(state => state.auth.address);
    const tolltip               = useRef(null);
    const AddressModal          = useRef(null);
    const PurchaseHistoryModal  = useRef(null);
    const [AddressInputs , setInputs]            = useState("");
    const UserPurchaseHistory   = useSelector(state => state.auth.PurchaseHistory);
    const [ historyLoading , setHistoryLoading ] = useState(true);
    let values;

    useEffect(async () => {
        try{
            !UserAddress && await dispatch(RequestFunction("get" , "useraddress"));
            
        }catch(err){
            return M.toast({html: "Something went wrong" , classes:"#c62828 red darken-3"});
        }
    },[]);

    useEffect(async () => {
        await setInputs({
            AddressForm : [
                { Title : "Line 1",   Value : UserAddress ? UserAddress.Line1 : "" , Type : "text" },
                { Title : "Line 2",   Value : UserAddress ? UserAddress.Line2 : "" , Type : "text" },
                { Title : "City",     Value : UserAddress ? UserAddress.City : "" , Type : "text" },
                { Title : "Pincode",  Value : UserAddress ? UserAddress.Pincode : "" , Type : "number" },
                { Title : "State",    Value : UserAddress ? UserAddress.State : "" , Type : "text" },
                { Title : "Landmark", Value : UserAddress ? UserAddress.Landmark : "" , Type : "text" }
            ],
            FormIsValid : false
        });  
        M.Tooltip.init(tolltip.current);
        M.Modal.init(AddressModal.current); 
        M.Modal.init(PurchaseHistoryModal.current); 
    },[UserAddress , userdata]);

    const TimeFormat = (date) => {
        var d = new Date(date);
        return d.toDateString()
    }

    const openAddressModal =  async() => {
        try{
            return M.Modal.getInstance(AddressModal.current).open();
        }catch(err){
            return M.toast({html: "Something went wrong" , classes:"#c62828 red darken-3"});
        }
    }

    const ChangeAddressValue = (index , event ) => {
        try{
            values = {...AddressInputs};
            values["AddressForm"][index]["Value"] = event.target.value;
            values["FormIsValid"] = true;
            for(let i of values["AddressForm"]){
                values["FormIsValid"] = values["FormIsValid"] && ( i["Value"].length >= 5 && values["AddressForm"][3]["Value"].length === 6 );
            }
            return setInputs(values);
        }catch(err){
            return M.toast({html: "Something went wrong" , classes:"#c62828 red darken-3"});
        }
    };

    const submitAddressForm = async() => {
        try{
            await dispatch(RequestFunction("post", "addaddress" , AddressInputs["AddressForm"]));
            await M.toast({html: "Address changed successfully" , classes:"#43a047 green darken-1"});
            return;
        }
        catch(err){
            return M.toast({html: "Something went wrong" , classes:"#c62828 red darken-3"});
        }
    }

    const OpenPurchaseHistoryModal = useCallback(async ()=>{
        try{
            await M.Modal.getInstance(PurchaseHistoryModal.current).open();
            UserPurchaseHistory.length <= 0 && await dispatch(RequestFunction("get","getuserpurchasehistory"));
            return setHistoryLoading(false);
        }
        catch(err){
            setHistoryLoading(false);
            return M.toast({html: err.message , classes:"#c62828 red darken-3"});
        }
    },[ UserPurchaseHistory ]);

    return (
        <div className="profile">
            { (userdata && AddressInputs) ? 
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={userdata.ProfilePic} />
                                        <span className="card-title">{ userdata.Username }</span>
                                        <a className="btn-floating halfway-fab waves-effect waves-light red tooltipped" 
                                            data-position="bottom"
                                            ref={tolltip} 
                                            data-tooltip="Change Profile Picture">
                                                <i className="material-icons">camera</i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col s12 m8">
                                <div className="card blue-grey darken-1">
                                    <div className="card-content white-text">
                                    <span className="card-title"> Delivery Address </span>
                                    <p>Line 1   : { UserAddress ? UserAddress.Line1 : "" }   </p>
                                    <p>Line 2   : { UserAddress ? UserAddress.Line2 : "" }   </p>
                                    <p>City     : { UserAddress ? UserAddress.City : "" }   </p>
                                    <p>Pincode  : { UserAddress ? UserAddress.Pincode : "" }   </p>
                                    <p>State    : { UserAddress ? UserAddress.State : "" }   </p>
                                    <p>Email    : { userdata.Email } </p>
                                    </div>
                                    <div className="card-action">
                                    <a onClick={openAddressModal}>{UserAddress ? "Update Address" : "Add Address ?"}</a>
                                    <a onClick={OpenPurchaseHistoryModal}> Purchase History </a>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    {/* Address modal  */}
                    <div className="modal" ref={AddressModal}>
                        <div className="row container">
                            <form className="col s12">
                                <div className="row">
                                    {
                                        AddressInputs.AddressForm.map((val , i) => (
                                            <div className="input-field col s12" key={i}>
                                                <input 
                                                    placeholder={val.Title} 
                                                    type={val.Type} 
                                                    value={val.Value}
                                                    onChange={(e) => ChangeAddressValue(i,e)}
                                                    className="validate" 
                                                />
                                            </div> )
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="close-btn modal-close waves-effect waves-green btn-flat left-align">Close</a>
                            {
                                AddressInputs.FormIsValid ? 
                                <a onClick={submitAddressForm} className="modal-close waves-effect waves-green btn-flat">
                                    {UserAddress ? "Update Address" : "Add Address"}
                                </a> 
                                : 
                                <p style={{color : "red"}}>
                                    *Length of Pincode must be exact 6 characters
                                </p>
                            }
                        </div>
                    </div>


                    {/* Purchase History */}

                    <div className="modal modal-fixed-footer" ref={PurchaseHistoryModal}>
                        <div className="modal-content">
                            <h5> Purchase History </h5><br/>
                            {
                                historyLoading ?
                                ( <div className="progress #eceff1 blue-grey lighten-5">
                                    <div className="indeterminate #1565c0 blue darken-3"></div>
                                </div> )
                                :
                                (
                                    <div className="row">
                                        <div className="col s12">
                                            <ul className="collection">
                                                {
                                                    (UserPurchaseHistory) && (UserPurchaseHistory.map((val,i) => (
                                                        <li className="collection-item avatar" key={i}>
                                                            <img src={val.BookId.Image} alt="" className="circle" />
                                                            <span className="title"> Title : {val.BookId.Name} </span>
                                                            <p> 
                                                                <span> Ordered Date : {TimeFormat(val.OrderedDate)} </span>
                                                                <br />
                                                                <span> Return By :  {TimeFormat(val.ReturnDate)} </span>
                                                                <br />
                                                                <span> Book Status : { val.Status=="NOT_RETURNED" ? 
                                                                    <span style={{color : "red"}}> Not Returned </span> 
                                                                    :
                                                                    <span style={{color : "green"}}> Returned </span> } 
                                                                </span>
                                                            </p>
                                                            { ( val.Status ==="NOT_RETURNED" ) && (
                                                                <div>
                                                                    <br />
                                                                    <a className="btn red waves-effect waves-white">
                                                                        Return The Book
                                                                    </a> 
                                                                </div> )
                                                            }
                                                        </li>
                                                    ))
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                            
                            
                        </div>
                        <div className="modal-footer">
                            <a className="modal-close waves-effect waves-green btn-flat">Close</a>
                        </div>
                    </div>

                </div>
                :
                <Spinner/>
            }
        </div>
    )
}

export default Userprofile
