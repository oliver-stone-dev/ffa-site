import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import ConfigData from "../config.json"

const AirportReviewWidget = ({airportId, airportReview}) =>{

    const [reviewAiportId] = useState(parseInt(airportId));
    const [review] = useState(airportReview);
    const [terminal, setTerminal] = useState(null);
    const [accountName,setAccountName] = useState(null);
    const [accountReviews,setAccountReviews] = useState(0);

    const getFirstOrNull = (terminals) =>{
        if (terminals === null || terminals.length ===0){
            return null
        }else{
            return terminals[0];
        }
    }

    useEffect(() =>{
        fetch(`${ConfigData.PROD_API_URL}/airports/${reviewAiportId}/terminals?` + new URLSearchParams({
            terminalId: review.terminalId
        }))
        .then((response) => response.json())
        .then((data) => setTerminal(getFirstOrNull(data)))
        .catch(() =>{

        });
    
        fetch(`${ConfigData.PROD_API_URL}/reviews/${review.id}/details?` + new URLSearchParams({
            accountId: review.accountId
        }))
        .then((response) => response.json())
        .then((data) =>{
            setAccountName(data.username);
            setAccountReviews(data.userReviews);
        })
        .catch(() =>{

        });

    },[review,reviewAiportId])

    const PostDate = ({datetime}) =>{
       var reviewDateTime = new Date(datetime);
       var currentDatetime = new Date();

       console.log(reviewDateTime.getDate());

       if (reviewDateTime.getFullYear() !== currentDatetime.getFullYear()){
            return (
                <p className="review-date-year">Over a year ago</p>
            );
       }else if (currentDatetime.getMonth() - reviewDateTime.getMonth() > 0){
            return (
                <p className="review-date-year">Over a month ago</p>
            );
       }else if (currentDatetime.getMonth() - reviewDateTime.getMonth() === 0
                && (currentDatetime.getDate() - reviewDateTime.getDate() > 7)){
            return (
                <p className="review-date-year">This month</p>
            );
       }else{
        return (
            <p className="review-date-year">This week</p>
        );
       }
    }

    if (review === null || terminal === null) {
        return <p>Loading...</p>
    }
    else{
        return (
            <div className="airport-review-widget">
                <div className="review-grid-container">
                    <div className="name-item"><h4>{accountName}</h4><p>{accountReviews} reviews</p></div>
                    <div className="date-item"><PostDate datetime={review.dateTime}></PostDate></div>
                    <div className="terminal-item"><h3>{terminal.name}</h3></div>
                    <div className="comment-item"><p>{review.comment}</p></div>
                    {
                        (review.recommended) ? 
                        <div className="rating-item">
                            <FontAwesomeIcon className="thumbs-up-icon" icon={faThumbsUp} />
                            <h4>Recommended</h4>
                        </div>:
                        <div className="rating-item">
                            <FontAwesomeIcon className="thumbs-down-icon"  icon={faThumbsDown} />
                            <h4>Not Recommended</h4>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default AirportReviewWidget;