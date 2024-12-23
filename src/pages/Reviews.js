import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AirportInfoWidget from "../components/AirportInfoWidget.js";
import { Link } from 'react-router-dom'
import AirportReviewWidget from "../components/AirportReviewWidget";
import '../styles.css';
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import AccountProvider from "../providers/AccountProvider";
import NavBar from "../components/NavBar.js";
import ConfigData from "../config.json"

const ReviewsPage = () =>{

    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [reviews,setReviews] = useState([]);
    const [isTokenValid,setIsTokenValid] = useState(false);
    const [accountDetails,setAccountDetails] = useState(null);

    useEffect(() => {

        setAirport(null);
        setReviews(null);

        const getAccountDetails = async () =>{
            //Verify token
            const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));

            if (bearerTokenData === null){
                setIsTokenValid(false);
                return;
            }

            const isValid = await TokenVerifyService(bearerTokenData.tokenType,bearerTokenData.accessToken);
            setIsTokenValid(isValid);

            //Get account details
            if (isValid){
                const details = await GetAccountDetails(bearerTokenData.tokenType,bearerTokenData.accessToken);
                setAccountDetails(details);
            }            
        }

        getAccountDetails();
    
        fetch(`${ConfigData.PROD_API_URL}/airports/${id}`)
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch(() =>{

        });
        
        fetch(`${ConfigData.PROD_API_URL}/reviews?` + new URLSearchParams({
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
        return <></>;
    }else{
        return (
            <div className="page-container">
                <div className="content">
                    <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                        <NavBar enableSearch={true}></NavBar>
                            <div className="airport-section">
                                <AirportInfoWidget airportToDisplay={airport}></AirportInfoWidget>
                                <div className="airport-menu">
                                    <ul>
                                        <Link className="airport-menu-link" to={`/airports/${id}/`}>Terminals</Link>
                                        <Link className="airport-menu-link-active" to={`/airports/${id}/reviews`}>Reviews</Link>
                                    </ul>
                                </div>
                            </div> 
                            <div className="reviews-section">
                                <ul>
                                    {reviews.map((review) => <AirportReviewWidget key={review.id} airportReview={review} airportId={id}></AirportReviewWidget>)}
                                </ul> 
                            </div>
                    </AccountProvider>
                </div>
                <div className="footer">
                    <p>privacy policy</p>
                </div>
            </div>
        );
    }
}

export default ReviewsPage;