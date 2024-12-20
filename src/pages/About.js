import AccountProvider from "../providers/AccountProvider";
import NavBar from "../components/NavBar";
import { useEffect,useState } from "react";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import { Link

 } from "react-router-dom";

const AboutPage = () => {

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
            <div className="content">
                <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                    <NavBar enableSearch={true}></NavBar>
                </AccountProvider>
                <div className="about-section">
                <div className="about-container">
                            <h1>Purpose of this site</h1>
                            <p>
                                Despite the widespread use of digital cameras and smartphones, film photography is making a big comeback.
                            </p>
                            <p>
                                With air travel more accessible and affordable than ever, it has become increasingly common for photographers to bring rolls of film on their flights.
                            </p>
                            <p>
                                The purpose of this site is to catalog and rate airports based on their accessibility and attitude toward film, as well as their treatment of photographers 
                                carrying film. With a quick search, we aim to help users determine if the airport they are traveling to will allow them to pass through security with their film undamaged.
                            </p>
                            <p>
                                While we attempt to keep information about airport procedures and equipment accurate and up-to-date, the experiences of you the traveller, are the most valuable resource. 
                            </p>
                            <p>
                                So if you happen to go through security and notice that they are using CT scanners or do not allow hand checks, please report it here so we can help inform other travelers!
                            </p>
                    </div>
                    <div className="about-container">
                            <h1>Why should I be worred?</h1>
                            <p>
                                Until recently, travelling with film was a simple matter, as most standard x-ray machines do not affect film under ISO 800.
                                However, with the introduction of powerful new scanners and stricter policies on hand-checking, taking film onto a flight has
                                become more difficult.
                            </p>
                            <p>
                                These new scanners can dramatically reduce wait times at security, as travellers no longer need to remove items from their bag. However,
                                as stated in an article from 2021 
                                "<Link to="https://emulsive.org/articles/experiments/testing-ct-scanners-heres-how-badly-they-can-damage-your-film"> 
                                these scanners lead to significantly fogged film, colour shifts, loss in shadow detail and a substantial increase in grain."
                                </Link>
                            </p>
                            <Link to="https://kodakprofessional.com/en-gb/photographers/resources/ct-scanning-x-ray-technology-and-film">Article by Kodak warning about risks to film </Link>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>privacy policy</p>
            </div>
        </div>
    );
}

export default AboutPage;