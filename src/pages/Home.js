import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AccountProvider from "../providers/AccountProvider";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import NavBar from "../components/NavBar";
import Snowfall from 'react-snowfall'

const HomePage = () =>{

    const [isTokenValid,setIsTokenValid] = useState(false);
    const [accountDetails,setAccountDetails] = useState(null);

    useEffect(() =>{

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
        
    },[])

    return (
        <div className="page-container">
            <Snowfall snowflakeCount={200} color="#F5F5F5"></Snowfall>
            <div className="homepage-content">
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
            </div>
        </div>
    );
}

export default HomePage;