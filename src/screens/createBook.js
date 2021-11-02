import React, { useEffect, useState } from 'react';
import "./createBook.css";
import { useHistory } from "react-router-dom";
import * as M from "materialize-css";
import { AdminFunction } from "../store/action";

function CreateBook() {

    useEffect(async () => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems,{});
    },[]);
    const history                   = useHistory();
    const [ name, setName ]         = useState("");
    const [ url, setUrl ]           = useState("");
    const [ category, setCategory ] = useState("Comics");
    const [ desc, setDesc ]         = useState("");
    const [ author, setAuthor ]     = useState("");
    const [ copies, setCopies ]     = useState(1);
    const [disableButton, setDisableButton] = useState(true);

    const urlRegex                  = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;

    useEffect(() => {
        if(name && urlRegex.test(url) && desc.length > 10 && author && Number(copies) > 0){
            setDisableButton(false);
        }else{
            setDisableButton(true);
        }
    },[name,url,desc,author,copies]);

    const submitCreateBook = async (e) => {
        try{
            e.preventDefault();
            var createBookBody = {
                image : url,
                name,
                description : desc,
                author,
                copies : Number(copies),
                category
            }
            const response = await AdminFunction("post", "addbook" , createBookBody);
            M.toast({html: response , classes:"green"});
            history.push("/admin");
        }catch(err){
            M.toast({html: 'Oops Something Went Wrong' , classes:"green"});
            throw(err);
        }
    }
    
    return (
        <div className="createBook container">
            <h2 className="center-align heading"> Create Book </h2>
             <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input 
                                id="first_name" 
                                type="text" 
                                value={name} 
                                className="validate" 
                                onChange = {(e) => setName(e.target.value)}
                            />
                            <label htmlFor="first_name">Book Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="book_url" 
                                type="text" 
                                value={url} 
                                className="validate" 
                                onChange = {(e) => setUrl(e.target.value)} />
                            <label htmlFor="book_url">Book Image Url</label>
                        </div>
                    </div>
                    <div className="input-field col s12 p-0">
                        <select defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Comics">Comics</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Novels">Novels</option>
                            <option value="Computer Science">Computer Science</option>
                        </select>
                        <label className="l-0">Choose Category</label>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="description" 
                                className="materialize-textarea"  
                                data-length="120" 
                                value={desc} 
                                onChange = {(e) => setDesc(e.target.value)}></textarea>
                            <label htmlFor="description">Book Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="author" 
                                type="text" 
                                className="validate" 
                                value={author} 
                                onChange = {(e) => setAuthor(e.target.value)} />
                            <label htmlFor="author">Author Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="copies" 
                                type="number" 
                                className="validate" 
                                min="1" value={copies} 
                                onChange = {(e) => setCopies(e.target.value)}/>
                            <label htmlFor="copies">Copies</label>
                        </div>
                    </div>
                    <div className="row btn-holder">
                        <button 
                            disabled={disableButton}
                            onClick={submitCreateBook}
                            className="btn waves-effect waves-light #645bf6 blue darken-1 center-align">
                            Create Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBook
