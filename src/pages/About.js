import HeaderSearch from "../components/HeaderSearch";
import AccountProvider from "../providers/AccountProvider";
import NavBar from "../components/NavBar";
import { useEffect,useState } from "react";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"

const AboutPage = () => {

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
                <NavBar enableSearch={true}></NavBar>
            </AccountProvider>
            <div className="content">
            </div>
            <div className="footer">
                <p>privacy policy</p>
            </div>
        </div>
    );
}

export default AboutPage;