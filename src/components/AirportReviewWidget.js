import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const AirportReviewWidget = ({airportReview}) =>{

    const [review,setReview] = useState(airportReview);
    const [terminal, setTerminal] = useState();
 
    return (
        <div className="airport-review-widget">
            <h3>Terminal 2</h3>
            <p>{review.comment}</p>
            
            <p>Helpful?</p>
            <button className="custom-button">
                <FontAwesomeIcon icon={faThumbsUp} />YES
            </button>
            <button className="custom-button">
                <FontAwesomeIcon icon={faThumbsDown} />NO
            </button>
        </div>
    );
}

export default AirportReviewWidget;