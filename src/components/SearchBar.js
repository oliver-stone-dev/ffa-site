import { useState } from "react";
import { Link } from 'react-router-dom'
import ConfigData from "../config.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 

const SearchBar = ({style}) =>{
    const [airports,setAirports] = useState([]);
    const [searchText,setSearchText] = useState("");

    const maxSearchLength = 20;

    const onSearchTextChange = (e) => {
        var text = e.target.value;

        if (text === "" || text === '\n'){
            setSearchText("");
            setAirports([]);
            return;
        }

        if (text.charAt(text.length-1) === '\n' || text.length > maxSearchLength){
            return;
        }
        
        setSearchText(text);
        searchForAirports(text);
            
    }

    const searchForAirports = (text) =>{
        //search api call
        fetch(`${ConfigData.PROD_API_URL}/airports?` + new URLSearchParams({
            search: text,
        }).toString())
         .then(response => {
            if (!response.ok){
                return null;
            }
            return response.json();
         })
         .then(data => setAirports(data))
         .catch(error => {
            //errors
         });
    }

    return (
        <div className="search-bar" style={style} >
            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass}></FontAwesomeIcon>
            <textarea value={searchText} onChange={onSearchTextChange} onClick={onSearchTextChange} placeholder="search by name or code"></textarea>
            <div className="search-results">
                <ul>
                    {
                        (airports !== null)?
                        airports.map((airport) => <li key={airport.id}>
                            <Link className="result-link" to={`/airports/${airport.id}`}>
                            {airport.name}
                            </Link>
                            </li>): <></>
                    }
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;