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
                                Despite the wide use of digital cameras and smartphones, film photography is making a comeback, big time.
                            </p>
                            <p>
                                And with air-travel more accessful and affordable then ever, it is becoming common for photographers to bring
                                reels of film onto their flight.
                            </p>
                            <p>
                                The purpose of this site is a catalog and rate aiports on their accessbility and attitude towards film, and photographers
                                carrying film. With a quick search, we want users to be able to see if the airport they are travelling to will be
                                easy to get film through without damage.
                            </p>
                            <p>
                                While we will try to keep the procedures and equipment of each airport current and up-to-date, it is the experieces of you, 
                                the traveller that is most important. 
                            </p>
                            <p>
                                So you happen to be travelling through security and see that they are using CT scanners or they dont allow hand-checks, please report it
                                here, so other travellers are aware!
                            </p>
                    </div>
                    <div className="about-container">
                            <h1>Why should I be worred?</h1>
                            <p>
                                Until recently, this was for the most part a simple matter, with standard x-ray machines not effecting film under ISO 800.
                                However, with the introduction of powerful new scanners and stricter policies on hand-checking, taking film onto a flight is 
                                not so easy.
                            </p>
                            <Link to="https://kodakprofessional.com/en-gb/photographers/resources/ct-scanning-x-ray-technology-and-film">Article by Kodak</Link>
                            <p>
                                These new scanners can dramatically reduce wait times at security, as travellers no longer need to remove items from their bag. Great!
                            </p>
                            <p>
                                Now not all CT scanners are the same, so its not certain how your film would be effected if put through a CT scanner at your local airport.
                                However, it seems to be the case that "
                                <Link to="https://emulsive.org/articles/experiments/testing-ct-scanners-heres-how-badly-they-can-damage-your-film"> 
                                these scanners lead to significantly fogged film, colour shifts, loss in shadow detail and a substantial increase in grain.
                                </Link>"
                            </p>
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