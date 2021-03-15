import React , {useEffect , useRef , useCallback , useState} from 'react';
import * as M from "materialize-css";
import "./slider.css";

function Slider() {

    const Slider_M    = useRef(null);

    useEffect(() => {
        MaterialInit();
    },[]);

    var MaterialInit = useCallback(async() => {
        try{
            M.Carousel.init(Slider_M.current, {
                dist : 0,
                fullWidth : true,
                duration : 2500
            });
            var instance = M.Carousel.getInstance(Slider_M.current);
            setInterval(()=>{
                instance.next();
            },3000);
        }catch(err){
            return M.toast({html: "Something went wrong" , classes:"#c62828 red darken-3"});
        }
    },[]);

    return (
        <div className="carousel carousel-slider center" id="amazon__slider" ref={Slider_M}>
            <a className="carousel-item"> <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" /></a>
            <a className="carousel-item"> <img src="https://images.unsplash.com/photo-1606311698062-21c4f57cb27f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=695&q=80" /></a>
            <a className="carousel-item"> <img src="https://miro.medium.com/max/3840/1*MykufWg6D_3BWuV8lG2xbg.jpeg" /></a>
            <a className="carousel-item"> <img src="https://miro.medium.com/max/1200/1*TdhtA5VrcJiXgC1AwUC1Xw.png" /></a>
        </div>
    )
}

export default Slider
