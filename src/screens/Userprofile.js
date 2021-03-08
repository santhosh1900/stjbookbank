import React,{ useEffect ,useState } from "react";
import { useParams } from "react-router-dom";

function Userprofile() {
    const [userProfile , setProfile]   = useState(null);
    const { userid }  = useParams();
    useEffect(()=>{
        console.log(userid);
    },[]);



    return (
        <div>
            userprofile
        </div>
    )
}

export default Userprofile
