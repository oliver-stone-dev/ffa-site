import Logo from "../components/Logo";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const SignupPage = () => {

    const naviation = useNavigate();
    const location = useLocation();
    const {email} = location.state || {};
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");

    const navigation = useNavigate();
    
    const onFormSubmit = (e) =>{
        e.preventDefault();

        fetch("http://localhost:5115/register",{
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json",
                "accept": "*/*",
            }
        })
        .then((response) => {
            if (!response.ok){
                setPassword("");
                setUsername("");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            updateDisplayName();
        })
        .catch(() =>{

        });
    }

    useEffect(() =>{

        const onEmailNull = () =>{
            naviation('/auth');
        }

        if (email == null){
            onEmailNull();
        }
    },[email,naviation]);

    const updateDisplayName = () =>{
        fetch("http://localhost:5115/account/displayname", {
            method: "POST",
            body : JSON.stringify({
                email: email,
                password: password,
                displayName: username
            }),
            headers: {
                "Content-type": "application/json",
                "accept": "*/*",
            }
        })
        .then((response) =>{
            if (!response.ok){
                setPassword("");
                setUsername("");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            navigation("/login",{ 
                state: {
                    email: email
                }
            });
        });
    }

    return (
        <div className="content">
            <div className="header">
                <Logo></Logo>
            </div>
            <div className="login-section">
                <div className="login-container">
                    <h2>Please enter a username and password</h2>
                    <h4>{email}</h4>
                    <form className="submit-form"  onSubmit={onFormSubmit}>
                        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter a password" required></input>
                        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Enter a username" required></input>
                        <button className="auth-button" type="submit">Create Account</button>
                    </form>
                    <p>or</p>
                    <button className="auth-button" >Continue with google</button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;