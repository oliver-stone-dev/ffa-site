import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";
import TerminalReportWidget from "../components/TerminalReportWidget";
import AirportInfoWidget from "../components/AirportInfoWidget.js";
import { Link } from 'react-router-dom'
import '../styles.css';
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import AccountProvider from "../providers/AccountProvider";

const AiportPage = () =>{
    
    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [terminals,setTerminals] = useState([]);
    const [isTokenValid,setIsTokenValid] = useState(false);
    const [accountDetails,setAccountDetails] = useState(null);

    useEffect(() => {

        setAirport(null);

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
    }
    ,[id]);

    if (airport === null) {
        return <p>Loading...</p>
    }else{
        return(
            <div>
                <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
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
                        <div className="terminals-section">
                            <ul>
                                {terminals.map((terminal) => <TerminalReportWidget key={terminal.id} terminalToReport={terminal}></TerminalReportWidget>)}
                            </ul>
                        </div>
                    </div>
                </AccountProvider>
                <div className="footer">
                    <p>privacy policy</p>
                </div>
            </div>
        );
    }   
}

export default AiportPage;