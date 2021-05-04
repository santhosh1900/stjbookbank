import React,{ useState ,useEffect} from "react";
import "./login.css";
import { Link , useHistory } from "react-router-dom";
import {AddUser} from "../store/action";
import { useDispatch } from "react-redux";
import * as M from "materialize-css";

function Login() {
    const [ password, setPassword ]     = useState("");
    const [ email, setEmail ]           = useState("");
    const [disableButton , setDisableButton]        = useState(true);
    const history           = useHistory();

    const dispatch                      = useDispatch();

    const PostData = async (e) => {
        try{
            e.preventDefault();
            let data = {
                email,
                password
            }
        await dispatch(AddUser("login" , data));
        history.push("/");
        }catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        }        
    };

    const passwordRegex  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const emailRegex     = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        if(emailRegex.test(email) && passwordRegex.test(password)){
            setDisableButton(false);
        }else{
            setDisableButton(true);
        }
    },[email,password]);

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h4 className="H">STJ Book Bank Login</h4>
                <form onSubmit={PostData}>
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange= {(e)=>setEmail(e.target.value)}
                    />
                    <input 
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange= {(e)=>setPassword(e.target.value)}
                    />
                    <button
                    className="btn waves-effect waves-light #645bf6 blue darken-1"
                    disabled={disableButton}
                    >Login</button>
                </form>
                
                <h5><Link to="/signup">Dont have an account?</Link></h5>                 
            </div>
        </div>
    )
}

export default Login
