import { useEffect, useState } from "react";

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
                <input type="text" onChange={onSearchTextChange} placeholder="search by name, code or flight number..."></input>
            </form>
            <button>Search</button>
            <ul>
                {airports.map((airport) => <li><a href="#">{airport.name}</a></li>)}
            </ul>
        </div>
    );
}

export default SearchBar;