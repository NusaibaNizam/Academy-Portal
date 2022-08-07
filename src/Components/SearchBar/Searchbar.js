import "./Searchbar.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
const SearchBar = (props) => {
    const [name, setName] = useState("")
    useEffect(()=>{
        setTimeout(() => {
            
            if(name!==""){
                props.setUrl("&name="+name)
            }else{
                props.setUrl("")
            }            
        }, 1000);

    },[name,props])
    return (
        <>
            <div id="cover">
                <div className="searchfrm">
                    <div className="tb">
                        <div className="td"><input className="input_search" type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} required/></div>
                        <div className="td" id="s-cover">
                            <div className="searchbtn">
                                <FontAwesomeIcon className="icon" icon={faSearch} size="2x" />
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBar;