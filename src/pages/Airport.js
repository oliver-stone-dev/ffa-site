import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";
import TerminalReportWidget from "../components/TerminalReportWidget";
import AirportInfoWidget from "../components/AirportInfoWidget.js";
import { Link } from 'react-router-dom'


const AiportPage = () =>{
    
    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [terminals,setTerminals] = useState([]);

    useEffect(() => {

        setAirport(null);
    
        fetch(`http://localhost:5115/airports/${id}`)
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch(() =>{

        });

        fetch(`http://localhost:5115/airports/${id}/terminals`)
        .then((response) => response.json())
        .then((data) => setTerminals(data))
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
                    <div className="airport-section">
                       <AirportInfoWidget airportToDisplay={airport}></AirportInfoWidget>
                        <div className="airport-menu">
                            <ul>
                                <Link to={`/airports/${id}/`}>Terminals</Link>
                                <Link to={`/airports/${id}/reviews`}>Reviews</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="terminals-section">
                        <ul>
                            {terminals.map((terminal) => <TerminalReportWidget key={terminal.id} terminalToReport={terminal}></TerminalReportWidget>)}
                        </ul>
                    </div>
                </div>
                <div className="footer">
                    <p>privacy policy</p>
                </div>
            </div>
        );
    }   
}

export default AiportPage;