import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";
import checkmark from "../assets/checkmark.png";
import warning from "../assets/warning.png";
import AirportRatingWidget from "./AirportRatingWidget";

const AirportInfoWidget = ({airportToDisplay}) =>{

    const [airport,setAirport] = useState(airportToDisplay);
    const [status,setStatus] = useState(true);
    const [rating,setRating] = useState(0);
    const [reviewCount,setReviewCount] = useState(0);
    const [approved,setApproved] = useState(false);
    const [stats,setStats] = useState(null);

    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    useEffect(() =>{
        fetch(`http://localhost:5115/airports/${airport.id}/stats`)
        .then((response) => response.json())
        .then((data) => {
            setStats(data);
            if(data !== null){
                setRating(data.averageRating);
                setReviewCount(data.totalReviews);
            }
        })
        .catch(() => {

        })
    },[airport]);

    return (
        <div className="airport-info-widget">
            <div className="airport-grid-container">
                <div className="code-item"><p>{airport.code}</p></div>
                <div className="web-item"><Link to={airport.website}>{airport.website}</Link></div>
                <div className="name-item"><h1>{airport.name}</h1></div>
                <div className="country-item"><p>{airport.country}</p></div>
                <div className="reviews-item"><AirportRatingWidget airportToDisplay={airport}></AirportRatingWidget></div>                <div className="write-item">
                    { // Check login
                        (tokenValid === true && accountDetails !== null)
                        ? <Link className="button-link" to={`/airports/${airport.id}/writereview`}>Write a review</Link>
                        : <Link className="button-link" to={`/auth`}>Login to write a review</Link>
                    }
                </div>
                {/* { //approved
                    (approved) ?
                    <div className="alert-item">
                        <img src={checkmark} alt="checkmark"></img>
                        <p>Friendly to film!</p>
                    </div> :
                    <div className="alert-item">    
                        <img src={warning} alt="warning"></img>
                        <p>Use caution!</p>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default AirportInfoWidget;