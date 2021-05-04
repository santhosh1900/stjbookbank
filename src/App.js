import './App.css';
import React  , { useEffect } from "react";
import cookies from 'universal-cookie';
import { Switch , Route , useHistory, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { setCurrentUser } from "./store/action";
import Login from "./screens/login";
import Home from "./screens/Home";
import Navbar from "./Components/Navbar";
import Signup from "./screens/signup";
import UserProfile from "./screens/Userprofile";
import Error from "./screens/Error";
import Admin from "./screens/Admin";
import { socketConnection } from "./store/Socket";



const Routing = () => {  
  const history   = useHistory();
  const Cookie    = new cookies();
  const dispatch  = useDispatch();
  let Socket      = useSelector(state => state.auth.Socket);
  useEffect(async ()=>{
    const token       = localStorage.getItem("token");
    let payload;
    if(token){
      payload         = token.split(".")[1];
      payload         = JSON.parse(window.atob(payload));
    }
    if(!payload){
      await localStorage.clear();
      await Cookie.remove("token");
      await history.push("/login");
    }else{
      if(!Socket){
        let userdata = await JSON.stringify(payload.data);
        await socketConnection(userdata, dispatch);
      }
      await dispatch(setCurrentUser(payload.data));
      if(payload.data.IsAdmin){
        history.push("/admin");
      }
    }
  },[]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <UserProfile />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routing/>  
    </BrowserRouter>
  )
  
};

export default App;
