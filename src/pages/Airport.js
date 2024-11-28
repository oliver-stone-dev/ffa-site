import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { useParams } from "react-router-dom";

const AiportPage = () =>{
    
    const {id} = useParams();
    const [airport,setAirport] = useState(null);

    useEffect(() => {

        setAirport(null);
    
        fetch(`http://localhost:5115/airports/${id}`)
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch(() =>{

        });
    }
    ,[id]);

    if (airport === null) {
        return <p>Loading...</p>
    }else{
        return(
            <div>
                <SearchBar></SearchBar>
                <h1>{airport.name}</h1>
            </div>
        );
    }   
}

export default AiportPage;