import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";

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
                <HeaderSearch className="header"></HeaderSearch>
                <div className="content">
                    <h1>{airport.name}</h1>
                </div>
                <div className="footer">
                    <p>privacy policy</p>
                </div>
            </div>
        );
    }   
}

export default AiportPage;