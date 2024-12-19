import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

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
                
        //search api call
        fetch("http://localhost:5115/airports?" + new URLSearchParams({
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
            <textarea value={searchText} onChange={onSearchTextChange} placeholder="search by name or code"></textarea>
            <div className="search-results">
                <ul>
                    {
                        (airports !== null || airports.length > 0)?
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