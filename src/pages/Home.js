import SearchBar from "../components/SearchBar";
import HeaderBasic from "../components/HeaderBasic";
import { createContext, useEffect } from "react";
import AccountProvider from "../providers/AccountProvider";
import { useState } from "react";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"

const HomePage = () =>{

    const [isTokenValid,setIsTokenValid] = useState(false);
    const [accountDetails,setAccountDetails] = useState(null);

    useEffect(() =>{

        const getAccountDetails = async () =>{
            //Verify token
            const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));
            const isValid = await TokenVerifyService(bearerTokenData.tokenType,bearerTokenData.accessToken);
            setIsTokenValid(isValid);

            //Get account details
            if (isValid){
                const details = await GetAccountDetails(bearerTokenData.tokenType,bearerTokenData.accessToken);
                setAccountDetails(details);
            }            
        }

        getAccountDetails();
        
    },[])

    return (
        <div>
            <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                <HeaderBasic></HeaderBasic>
            </AccountProvider> 
            <div className="content">
                <div className="search-banner">
                    <div className="search-container">
                        <h1>flying with film?</h1>
                        <h3>lets see if your airport is film friendly!</h3>
                        <SearchBar></SearchBar>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>privacy policy</p>
            </div>
        </div>
    );
}

export default HomePage;