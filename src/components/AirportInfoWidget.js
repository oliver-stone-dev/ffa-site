import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const AirportInfoWidget = ({airportToDisplay}) =>{

    const [airport,setAirport] = useState(airportToDisplay);
    const [country,setCountry] = useState("United Kingdom");
    const [status,setStatus] = useState(true);
    const [rating,setRating] = useState(4.9);
    const [reviewCount,setReviewCount] = useState(250);
    const [isLoggedIn, setIsLoggedIn]= useState(false); 

    useEffect (() =>{

        const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));
        if (bearerTokenData){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
        
    })

    return (
        <div className="airport-container">
            <h1>{airport.name}</h1>
            <h3>{airport.code}</h3>
            <p>https://www.heathrow.com/</p>
            <p>Reviews: {reviewCount}</p>
            <p>{rating}</p>
            <Link to={`/airports/${airport.id}/writereview`}>Write a review</Link>
        </div>
    );
}

export default AirportInfoWidget;