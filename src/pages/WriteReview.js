import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import AccountProvider from "../providers/AccountProvider";
import NavBar from "../components/NavBar";
import WriteReviewWidget from "../components/WriteReviewWidget";
import ConfigData from "../config.json"

const WriteReviewPage = () =>{

    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [isTokenValid,setIsTokenValid] = useState(false);
    const [accountDetails,setAccountDetails] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {

        setAirport(null);

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
                return true;
            }else{
                return false;
            }
        }

        const success = getAccountDetails();
        if (success === false){
            navigation('/auth');
        }

        fetch(`${ConfigData.PROD_API_URL}/airports/${id}`)
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch(() =>{

        });
    }
    ,[id,navigation]);
    
    if (airport === null) {
        return <p>Loading...</p>
    }else{
        return (
            <div className="page-container">
                <div className="content">
                    <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                        <NavBar enableSearch={true}></NavBar>
                            <div className="airport-section">
                                <div className="write-review-info-widget">
                                    <h1>{airport.name}</h1>
                                    <p>{airport.website}</p>
                                </div>
                                <div className="write-review-menu">
                                    <h2>Write a review</h2>
                                </div>
                            </div>
                            <div className="write-review-section">
                                <WriteReviewWidget airportToReview={airport}></WriteReviewWidget>
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

export default WriteReviewPage;