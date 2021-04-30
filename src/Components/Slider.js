import React , {useEffect , useRef , useCallback , useState} from 'react';
import * as M from "materialize-css";
import "./slider.css";

function Slider() {
    return (
        <div id="slider">
            <figure>
                <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                <img src="https://miro.medium.com/max/1200/1*TdhtA5VrcJiXgC1AwUC1Xw.png" />
                <img src="https://miro.medium.com/max/3840/1*MykufWg6D_3BWuV8lG2xbg.jpeg" />
                <img src="https://i.annihil.us/u/prod/marvel/i/mg/b/f0/5d25ef21eaf31/clean.jpg" />
                <img src="https://images.unsplash.com/photo-1606311698062-21c4f57cb27f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=695&q=80" />
            </figure>
        </div>
    )
}

export default Slider
