import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const SearchBar = () =>{
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
        <div>
            <form>
                <input className="searchField" type="text" onChange={onSearchTextChange} placeholder="search by name, code or flight number..."></input>
            </form>
            <ul>
                {airports.map((airport) => <li key={airport.id}><Link to={`/airports/${airport.id}`}>{airport.name}</Link></li>)}
            </ul>
        </div>
    );
}

export default SearchBar;