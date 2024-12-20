import { useEffect, useState } from "react";

const AirportRatingWidget = ({airportToDisplay}) =>{

    const minReviewCount = 1;

    const [airport] = useState(airportToDisplay);
    const [rating,setRating] = useState(0);
    const [reviewCount,setReviewCount] = useState(0);

    useEffect(() =>{
        fetch(`http://localhost:5115/airports/${airport.id}/stats`)
        .then((response) => response.json())
        .then((data) => {
            if(data !== null){
                setRating(data.averageRating);
                setReviewCount(data.totalReviews);
            }
        })
        .catch(() => {

        })
    },[airport]);

    const OverallRating = ({rating}) =>{
        if (rating > 0.9){
            return (<p className="rating-vp">Very Positive</p>);
        }else if (rating > 0.75){
            return (<p className="rating-p">Positive</p>);
        }else if (rating > 0.5){
            return (<p className="rating-m">Mixed</p>);
        }else if (rating > 0.25){
            return (<p className="rating-n">Negative</p>);
        }else{
            return (<p className="rating-vn">Very Negative</p>);
        }
    }

    if (reviewCount < 0){
        <div className="airport-rating-widget">
            <p>No reviews</p>
        </div>
    }else{
        return (
            <div className="airport-rating-widget">
                {
                    (reviewCount < minReviewCount) ?
                    <p>{reviewCount} user reviews</p> :
                    <div>
                        <h4>Reviews: </h4>
                        <OverallRating rating={rating}></OverallRating>
                        <p className="review-count">({reviewCount} reviews)</p>
                    </div>

                }
            </div>
        )}
}

export default AirportRatingWidget;