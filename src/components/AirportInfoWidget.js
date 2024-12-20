import { useState } from "react";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";
import AirportRatingWidget from "./AirportRatingWidget";

const AirportInfoWidget = ({airportToDisplay}) =>{

    const [airport] = useState(airportToDisplay);

    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    return (
        <div className="airport-info-widget">
            <div className="airport-grid-container">
                <div className="code-item"><p>{airport.code}</p></div>
                <div className="web-item"><Link to={airport.website}>{airport.website}</Link></div>
                <div className="name-item"><h1>{airport.name}</h1></div>
                <div className="country-item"><p>{airport.country}</p></div>
                <div className="reviews-item"><AirportRatingWidget airportToDisplay={airport}></AirportRatingWidget></div>                
                <div className="write-item">
                    { // Check login
                        (tokenValid === true && accountDetails !== null)
                        ? <Link className="button-link" to={`/airports/${airport.id}/writereview`}>Write a review</Link>
                        : <Link className="button-link" to={`/auth`}>Login to write a review</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default AirportInfoWidget;