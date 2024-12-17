import { useContext, useEffect } from "react";
import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";
import { useNavigate } from "react-router-dom";

const AccountWidget = () =>{

    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    const navigation = useNavigate();

    const onLogoutClick = () =>{
        const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));

        if (bearerTokenData === null || tokenValid !== true){
            navigation("/auth");
            return;
        }

        localStorage.clear('accessToken');
        navigation("/");
    }

    return (
        <div className="account-widget">
            <div className="account-grid-container">
                <h1>Hello!</h1>
                <h3>{accountDetails.displayName}</h3>
                <button onClick={onLogoutClick} className="auth-button">Logout</button>
            </div>
        </div>
    );
}

export default AccountWidget;