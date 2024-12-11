import { useState } from "react";
import { createContext, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import HeaderBasic from "../components/HeaderBasic";
import AccountProvider from "../providers/AccountProvider";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import NavBar from "../components/NavBar";

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
        <div className="content">
            <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                <NavBar enableSearch={false}></NavBar>
            </AccountProvider> 
            <div className="search-banner">
                <div className="search-container">
                    <h1>Flying with film?</h1>
                    <h3>Lets see if your airport is film friendly!</h3>
                    <SearchBar id="searchBar"></SearchBar>
                </div>
            </div>
            <div className="footer">
                <p>privacy policy</p>
            </div>
        </div>
    );
}

export default HomePage;