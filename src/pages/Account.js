import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AccountProvider from "../providers/AccountProvider";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import AccountWidget from "../components/AccountWidget";
import { useNavigate } from "react-router-dom";

const AccountPage = () =>{

    const [isTokenValid,setIsTokenValid] = useState(false);
    const [accountDetails,setAccountDetails] = useState(null);
    const navigation = useNavigate();

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

        const success = getAccountDetails();
        if (success === false){
            navigation('/auth');
        }
        
    },[navigation])

    if (accountDetails === null) {
        return <p>Loading...</p>
    }else{
    return (
        <div className="page-container">
            <div className="content">
                <AccountProvider accountDetails={accountDetails} isTokenValid={isTokenValid}>
                    <NavBar enableSearch={true}></NavBar>
                    <div className="account-section">
                        <AccountWidget></AccountWidget>
                    </div>
                </AccountProvider>
            </div>
            <div className="footer">
                <p>privacy policy</p>
            </div>
        </div>
    )
    }
}

export default AccountPage;