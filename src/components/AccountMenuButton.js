import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';
import { ValidTokenContext } from '../context/ValidTokenContext';

const AccountMenuButton = () =>{

    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    // const [accountName, setAccountName] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() =>{
    //     //use access toke (if exists) to get profile name and icon
    //     //if success output name and icon with link to profile
    //     //otherwise output link to login page
    //     const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));
    //     if (bearerTokenData){
    //         getAccountDetails(bearerTokenData.tokenType,bearerTokenData.accessToken);
    //     }else{
    //         setIsLoggedIn(false);
    //     }
    // },[accountName])

    // const getAccountDetails = (tokenType,token) =>{
    //     fetch("http://localhost:5115/manage/info", {
    //         headers:{
    //             "Content-type": "application/json",
    //             "accept": "text/plain",
    //             "Authorization": tokenType + " " + token
    //         }
    //     })
    //     .then((response) => {
    //         if (!response.ok){
    //             throw new Error(`Issue logging on. Status: ${response.status}`);
    //         }

    //         return response;
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setAccountName(data.email);
    //         setIsLoggedIn(true);
    //     })
    //     .catch(() => {
            
    //     })
    // }

    if (tokenValid === true && accountDetails !== null){
        return (
            <div>
                <Link to={"/"}>{accountDetails.email}</Link>
            </div>
        )
    }else{
        return (
            <div>
                <Link to={"/auth"}>Login</Link>
            </div>
        )
    }
}

export default AccountMenuButton;