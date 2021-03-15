import React from 'react';
import "./Card.css";

function card({select , Image , Name , Description , Author}) {
    return (
        <div className="col s6 m4 l3 card-temp">
            <div className="card">
                <div className="card-image">
                    <img className="card__Image" src={Image} />
                    <span className="card-title">{Name}</span>
                </div>
                <div className="card-content">
                    <p>{Description.substring(0, 100)}...<span><a onClick={select}>Read More</a></span></p>
                </div>
                <div className="card-action">
                    <a> By {Author} </a>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default card
