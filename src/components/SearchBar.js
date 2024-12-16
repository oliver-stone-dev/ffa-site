import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const SearchBar = ({style}) =>{
    const [airports,setAirports] = useState([]);

    const onSearchTextChange = (e) => {
        var text = e.target.value;
        
        if (text === ""){
            setAirports([]);
            return;
        }
        
        //search api call
        fetch("http://localhost:5115/airports?" + new URLSearchParams({
            search: text,
        }).toString())
         .then(response => response.json())
         .then(data => setAirports(data))
         .catch(error => {
            //errors
         });
    }

    return (
        <div className="search-bar" style={style} >
            <textarea onChange={onSearchTextChange} placeholder="search by name, code or flight..."></textarea>
            <div className="search-results">
                <ul>
                    {airports.map((airport) => <li key={airport.id}><Link className="result-link" to={`/airports/${airport.id}`}>{airport.name}</Link></li>)}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;