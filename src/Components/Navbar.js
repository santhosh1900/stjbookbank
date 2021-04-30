import React , { useEffect ,useRef , useState} from 'react'
import "./navbar.css";
import * as $ from "jquery";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import { useSelector , useDispatch } from "react-redux";
import cookies from "universal-cookie";
import { LogoutUser } from "../store/action";
import { RequestFunction } from "../store/action";

function Navbar() {
    const slide__out                     = useRef(null);

    const history                        = useHistory();

    const Cookie                         = new cookies;

    const dispatch                       = useDispatch();

    const userdata                       = useSelector(state => state.auth.userData) || localStorage.getItem("userdata");

    const [search , setSearch]           = useState("");

    const Categorys                      = ["All Books" , "Engineering" , "Computer Science" , "Comics" , "Novels"];

    const [category , setCategory]       = useState("Select Category");

    const [formSubmitted, setFormSubmitted] = useState(false);

    const ScrollFunction = () =>{
        window.addEventListener("scroll", function(){
          if(window.scrollY == 0){
            $(".navbar").removeClass("animate__fadeInDown");
          }else {
            $(".navbar").addClass("animate__fadeInDown");
          }
        });
    };

    useEffect(() => {       
        ScrollFunction();
    },[]);

    useEffect(() => {       
        materialInit();
    },[userdata]);

    const logoutUser = () => {
        localStorage.clear();
        Cookie.remove("token");
        dispatch(LogoutUser());
        history.push("/login");
    }

    const submitSearch = (e) => {
        e.preventDefault();
        let data = {
            search
        };
        dispatch(RequestFunction("post","searchbooks",data));
        setFormSubmitted(true);
    }

    const SelectCategory = async(category) => {
        try{
            await dispatch( RequestFunction("get" , `getselectedbooks/${category}`));
            setCategory(category);
            history.push("/");
        }catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"}); 
        }
        
    }

    const materialInit = () => {
        const dropdownsElements = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdownsElements, {
            inDuration : 500,
            alignment : "right",
            coverTrigger : false,
            closeOnClick : false
        });
        M.Sidenav.init(slide__out.current, {})
    };

    const CancelSearchAndGetAllBooks = async () => {
        try{
            $(".navbar__form").toggleClass("width100");
            if(formSubmitted){
                await dispatch(RequestFunction("get", "getAllBooks"));
            }
            setFormSubmitted(false);
            setSearch("");           
        }
        catch(err){
            return M.toast({html: err , classes:"#c62828 red darken-3"}); 
        } 
    }

    const Non_Admin_Navbar_Buttons = () => {
        if(!userdata.IsAdmin){
            return [
                <li key="1">
                    <form onSubmit={submitSearch} className="slide_form">
                        <div className="input-field mb-0">
                            <input 
                                className="mb-0"
                                id="search" 
                                type="search" 
                                maxLength="30" 
                                placeholder="search books" 
                                value={search} 
                                onChange={e => setSearch(e.target.value)} 
                            />
                            {(formSubmitted) && (
                                <a 
                                    className="btn btn-small red center-align w-100"
                                    onClick={CancelSearchAndGetAllBooks}> Cancel Search 
                                </a>
                            )}
                        </div>
                    </form>
                </li>,
                <li key="3"> 
                    <a 
                        className="dropdown-trigger options" 
                        href="dropdown2" 
                        data-target="dropdown2">
                            Notification
                        <i className="material-icons right">arrow_drop_down</i>
                    </a> 
                </li>,
                <li key="4"><div className="divider"></div></li>,
                <li key="5">
                    <a 
                        className="dropdown-trigger options" 
                        id="drop"
                        href="Categorydropdown2" 
                        data-target="Categorydropdown2">
                            { category }
                        <i className="material-icons right">arrow_drop_down</i>
                    </a>
                </li>,
                <li key="6"><div className="divider"></div></li>
            ]
        }else{
            return [];
        }
    }

    return (
        <div>
            { userdata && (
                <div>
                    <nav className="animate__animated navbar">
                        <div className="nav-wrapper">
                            <Link to = "/" className="brand-logo">STJ Book Bank</Link>
                            {
                                !userdata.IsAdmin && (
                                    <form onSubmit={submitSearch} className="navbar__form hide-on-small-only">
                                        <div className="input-field">
                                            <input id="search" type="search" value={search} onChange={e => setSearch(e.target.value)} />
                                            <label 
                                                className="label-icon"
                                                onClick={() => $(".navbar__form").addClass("width100")}
                                                htmlFor="search">
                                                    <i className="material-icons">search</i>
                                            </label>
                                            <i className="material-icons" onClick={CancelSearchAndGetAllBooks}>close</i>
                                        </div>
                                    </form>
                                )
                            }
                            
                            <a href="slide-out" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                <li><Link to = {`/profile`}>{ userdata.Username }</Link></li>
                                {
                                    !userdata.IsAdmin && (
                                        <li>
                                            <a 
                                                className="dropdown-trigger" 
                                                id="drop"
                                                href="dropdown1" 
                                                data-target="dropdown1">
                                                    Notification
                                                <i className="material-icons right">arrow_drop_down</i>
                                            </a>
                                        </li>
                                    )
                                }
                                {
                                    !userdata.IsAdmin && (
                                        <li>
                                            <a 
                                                className="dropdown-trigger" 
                                                id="drop"
                                                href="Categorydropdown1" 
                                                data-target="Categorydropdown1">
                                                    { category }
                                                <i className="material-icons right">arrow_drop_down</i>
                                            </a>
                                        </li>
                                    )
                                }
                                <li><a onClick={logoutUser}> Logout </a></li>
                            </ul>
                        </div>
                    </nav>

                    <ul id="Categorydropdown1" className="dropdown-content">
                        {
                            Categorys.map((val , i )=>(
                                <div key={i} onClick={() => SelectCategory(val)}>
                                    <li><a> { val } </a></li>
                                    <li className="divider"></li>
                                </div>
                            ))
                        }
                    </ul>

                    <ul id="Categorydropdown2" className="dropdown-content">
                        {
                            Categorys.map((val , i )=>(
                                <div key={i} onClick={() => SelectCategory(val)}>
                                    <li><a> { val } </a></li>
                                    <li className="divider"></li>
                                </div>
                            ))
                        }
                    </ul>

                    <ul id="dropdown1" className="dropdown-content">
                        <li><a>one</a></li>
                        <li className="divider"></li>
                        <li><a>two</a></li>
                        <li className="divider"></li>
                        <li><a>three</a></li>
                    </ul>


                    <ul id="dropdown2" className="dropdown-content">
                        <li><a>one</a></li>
                        <li className="divider"></li>
                        <li><a>two</a></li>
                        <li className="divider"></li>
                        <li><a>three</a></li>
                    </ul>


                    <ul id="slide-out" className="sidenav" ref={slide__out}>
                        <li>
                            <div className="user-view">
                                <div className="background">
                                    <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=841&q=80" />
                                </div>
                                <Link to = {`/profile`}><img className="circle" src={userdata.ProfilePic} /></Link>
                                <a href="#name"><span className="white-text name">{userdata.Username}</span></a>
                                <a href="#email"><span className="white-text email">{userdata.Email}</span></a>
                            </div>
                        </li>

                        { Non_Admin_Navbar_Buttons() }
                        
                        <li> <a className='options' onClick={logoutUser}>  Logout </a> </li>
                    </ul>
                </div> )
            }
        </div>
    )
}

export default Navbar
