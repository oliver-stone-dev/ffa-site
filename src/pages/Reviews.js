import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";
import AirportInfoWidget from "../components/AirportInfoWidget.js";
import { Link } from 'react-router-dom'
import AirportReviewWidget from "../components/AirportReviewWidget";

const ReviewsPage = () =>{

    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [reviews,setReviews] = useState([]);
    const [terminals,setTerminals] = useState([]);

    useEffect(() => {

        setAirport(null);
        setTerminals(null);
        setReviews(null);
    
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

        fetch(`http://localhost:5115/reviews?` + new URLSearchParams({
            airport:parseInt(id),
            terminal:0,
            offset:0,
            results:10,
        }).toString())
        .then((response) => response.json())
        .then((data) => setReviews(data))
        .catch(() =>{

        });
    }
    ,[id]);

    if (reviews === null || airport === null) {
        return <p>Loading...</p>
    }else{
        return (
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
                        <div className="reviews-section">
                            <ul>
                                {reviews.map((review) => <AirportReviewWidget key={review.id} airportReview={review}></AirportReviewWidget>)}
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

export default ReviewsPage;