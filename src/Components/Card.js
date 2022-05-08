import React, { useState } from 'react';
import "./Card.css";

function Card({select , Image , Name , Description , Author , cardClass = "col s6 m4 l3 card-temp", orderCount = 0}) {
    return (
        <div className={cardClass}>
            <div className="card">
                <div className="card-image">
                    <img className="card__Image" src={Image} />
                    <span className="card-title">{Name}</span>
                </div>
                <div className="card-content">
                    <p>{Description.substring(0, 100)}...<span><a onClick={select}>Read More</a></span></p>
                    { orderCount > 0 && <h6 className="orderCount">Order Count : {orderCount} </h6> }
                </div>
                <div className="card-action">
                    <a> By {Author} </a>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Card
