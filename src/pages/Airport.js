import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import '../styles.css';

import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import AccountProvider from "../providers/AccountProvider";
import TerminalReportWidget from "../components/TerminalReportWidget";
import AirportInfoWidget from "../components/AirportInfoWidget.js";
import NavBar from "../components/NavBar";

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
        
        const updateTerminalSessionData = (terminalData) =>{
            
            if (terminalData === null || terminalData.length === 0){
                sessionStorage.clear('airport');
                return;
            }

            const savedSession = sessionStorage.getItem('airport');
            if (savedSession !== null && savedSession.length > 0){
                const data = JSON.parse(savedSession);
                if (data.id !== parseInt(id)){
                    writeAirportSessiondata(parseInt(id),terminalData);
                }
            }else{
                writeAirportSessiondata(parseInt(id),terminalData);
            }
        }

        const writeAirportSessiondata = (airportId, terminalData) =>{
            const newSession = {id: airportId,terminals: []};

            terminalData.map((terminal) => newSession.terminals.push({id:terminal.id,isOpen:false}));
            
            sessionStorage.clear('airport');
            sessionStorage.setItem('airport',JSON.stringify(newSession));
        }

        getAccountDetails();
    
        fetch(`http://localhost:5115/airports/${id}`)
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch(() =>{

        });

        fetch(`http://localhost:5115/airports/${id}/terminals`)
        .then((response) => response.json())
        .then((data) => {
            setTerminals(data);
            updateTerminalSessionData(data);
        })
        .catch(() =>{

        });
    }
    ,[id]);

    if (airport === null) {
        return <></>;
    }else{
        return(
            <div className="page-container">
                <div className="content">
                    <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                        <NavBar enableSearch={true}></NavBar>
                        <div className="airport-section">
                            <AirportInfoWidget airportToDisplay={airport}></AirportInfoWidget>
                            <div className="airport-menu">
                                <ul>
                                    <Link className="airport-menu-link-active" to={`/airports/${id}/`}>Terminals</Link>
                                    <Link className="airport-menu-link" to={`/airports/${id}/reviews`}>Reviews</Link>
                                </ul>
                            </div>
                        </div>
                        <div className="terminals-section">
                            <ul>
                                {terminals.map((terminal) => <TerminalReportWidget key={terminal.id} terminalToReport={terminal}></TerminalReportWidget>)}
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

export default AiportPage;