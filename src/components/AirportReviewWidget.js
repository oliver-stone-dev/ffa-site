import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';
import { ValidTokenContext } from '../context/ValidTokenContext';

const AirportReviewWidget = ({airportId, airportReview}) =>{

    const [reviewAiportId,setAirportId] = useState(parseInt(airportId));
    const [review, setReview] = useState(airportReview);
    const [terminal, setTerminal] = useState(null);
    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    const getFirstOrNull = (terminals) =>{
        if (terminals === null || terminals.length ===0){
            return null
        }else{
            return terminals[0];
        }
    }

    useEffect(() =>{
        fetch(`http://localhost:5115/airports/${reviewAiportId}/terminals?` + new URLSearchParams({
            terminalId: review.terminalId
        }))
        .then((response) => response.json())
        .then((data) => setTerminal(getFirstOrNull(data)))
        .catch(() =>{

        });
    },[review,reviewAiportId])

    if (review === null || terminal === null) {
        return <p>Loading...</p>
    }
    else{
        return (
            <div className="airport-review-widget">
                <h2>John Doe</h2>
                <p>4 reviews</p>
                <p>1 week ago</p>
                <h4>Rating: {review.rating}</h4>
                <h2>{terminal.name}</h2>
                <p>{review.comment}</p>

                {/* <p>Helpful?</p>
                <button className="custom-button">
                    <FontAwesomeIcon icon={faThumbsUp} />YES
                </button> */}
            </div>
        );
    }
}

export default AirportReviewWidget;