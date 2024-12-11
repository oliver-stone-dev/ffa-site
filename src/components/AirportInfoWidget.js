import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";

const AirportInfoWidget = ({airportToDisplay}) =>{

    const [airport,setAirport] = useState(airportToDisplay);
    const [country,setCountry] = useState("United Kingdom");
    const [status,setStatus] = useState(true);
    const [rating,setRating] = useState(4.9);
    const [reviewCount,setReviewCount] = useState(250);

    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    return (
        <div className="airport-container">
            <div className="airport-container">
            <h1>{airport.name}</h1>
            <h3>{airport.code}</h3>
            <p>https://www.heathrow.com/</p>
            <p>Reviews: {reviewCount}</p>
            <p>{rating}</p>
            { // Check login
            (tokenValid === true && accountDetails !== null)
             ? <Link to={`/airports/${airport.id}/writereview`}>Write a review</Link>
             : <Link to={`/auth`}>Login to write a review</Link>
            }
        </div>
    </div>
    )
}

export default AirportInfoWidget;