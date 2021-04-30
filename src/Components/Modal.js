import React  from 'react';
import "./Modal.css";

function Modal({ modalItem , Addtocart , billingSection , UserAddress , orderTheBook }) {
    
    return (
        <div className="modal-template">
            <div className="modal-content">
                <h5> { modalItem.Name } </h5>

                <div className="row">
                    <div className="col s12 m6">
                        <img src= { modalItem.Image } />
                    </div>
                    { !billingSection ? (
                    <div className="col s12 m6">
                        <p> { modalItem.Description } </p>
                        <p className="cart_holder">
                            <a className="material-icons" onClick={() => Addtocart(modalItem)} >add_shopping_cart</a>
                        </p> 
                        <p>Number of copies : { modalItem.Copies }</p>
                        <p>Number of copies left : { modalItem.CopiesLeft }</p>
                    </div> )
                    : ( 
                    <div className="col s12 m6">
                        <div className="col s12">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                <span className="card-title"> Delivery Address </span>
                                <p>Line 1   : { UserAddress ? UserAddress.Line1 : "" }   </p>
                                <p>Line 2   : { UserAddress ? UserAddress.Line2 : "" }   </p>
                                <p>City     : { UserAddress ? UserAddress.City : "" }   </p>
                                <p>Pincode  : { UserAddress ? UserAddress.Pincode : "" }   </p>
                                <p>State    : { UserAddress ? UserAddress.State : "" }   </p>
                                </div>
                            </div>
                            {UserAddress ? (
                                <div>
                                    { UserAddress.UserId.CurrentBookIsReturned ? (
                                    <div>
                                        <a className="btn waves-effect waves-teal" onClick={() => orderTheBook(modalItem)}> Order The Book </a>
                                        <div className="instruction">
                                            * Door delivery  
                                            <div>  <i className="material-icons">home</i> </div>
                                        </div>
                                    </div> ) : ( <p style={{color:'red'}}> *You need return the old book to order books </p> )
                                    }
                                </div>
                                
                            ) :
                            ( <p style={{color:'red'}}> *You need home address to order books </p>) 
                            }
                        </div> 
                    </div> )}
                </div> 
            </div>
            <div className="modal-footer">
                <h3 className="waves-effect waves-red btn-flat left-align">By { modalItem.Author } </h3>
                <a className="modal-close waves-effect waves-teal btn-flat">Close</a>
            </div>
        </div>
    )
}

export default Modal
