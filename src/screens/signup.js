import React , {useState , useEffect} from 'react';
import "./login.css";
import { Link , useHistory } from "react-router-dom";
import * as authAction from "../store/action";
import { useDispatch} from "react-redux";
import M from "materialize-css";


function Signup() {
    const dispatch = useDispatch();
    const history  = useHistory();
    const [ password, setPassword ]                 = useState("");
    const [ confirmPassword, setConfirmPassword ]   = useState("");
    const [ email, setEmail ]                       = useState("");
    const [ username, setUsername ]                 = useState("");
    const [ disableButton , setDisableButton ]        = useState(true);

    const passwordRegex  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const emailRegex     = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const usernameRegex  = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    

    useEffect(() => {
        if(emailRegex.test(email) && passwordRegex.test(password) && usernameRegex.test(username)){
            setDisableButton(false);
        }else{
            setDisableButton(true);
        }
    },[email , password , username]);

    const signup = async (e) => {
        try{
            e.preventDefault();
            let userdata = {
                email,
                password,
                username
            }
            await dispatch(authAction.AddUser("signup" , userdata));
            await M.toast({html: "Wellcome to STJ BookBank" , classes:"#43a047 green darken-1"});
            return history.push("/");
        }catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"});
        } 
    }
    
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h4 className="H">STJ Book Bank Signup</h4>
                <form onSubmit={signup}>
                    <input
                    type="email"
                    required={true}
                    placeholder="Email"
                    value={email}
                    onChange= {(e)=>setEmail(e.target.value)}
                    />
                    <input
                    type="text"
                    required={true}
                    placeholder="Username"
                    value={username}
                    onChange= {(e)=>setUsername(e.target.value)}
                    />
                    <p className="password_alert"> *Only contains alphanumeric characters, underscore and dot.</p>

                    <input 
                    type="password"
                    required={true}
                    placeholder="Password" 
                    value={password}
                    onChange= {(e)=>setPassword(e.target.value)}
                    />
                    {   !passwordRegex.test(password) &&
                        <p className="password_alert"> *Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.</p>
                    }

                    <input 
                    type="password"
                    required={true}
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange= {(e)=>setConfirmPassword(e.target.value)}
                    />
                    {   password !== confirmPassword && (
                        <p className="password_alert">* Passwrd and confirmPassword should match</p> )
                    }
                    <button
                    className="btn waves-effect waves-light #645bf6 blue darken-1"
                    disabled={disableButton || password !== confirmPassword}
                    >Signup</button>
                </form>

                <h5><Link to="/login">Have an account?</Link></h5>                 
            </div>
        </div>
    )
}

export default Signup
