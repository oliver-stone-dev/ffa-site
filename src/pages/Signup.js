import Logo from "../components/Logo";
import { useEffect, useState} from "react";
import { useNavigate, useParams ,Link} from "react-router-dom";
import { Route, Routes, useLocation} from 'react-router-dom';

const SignupPage = () => {

    const naviation = useNavigate();
    const location = useLocation();
    const {email} = location.state || {};
    const [password,setPassword] = useState("");

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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            navigation("/login",{ 
                state: {
                    email: email
                }
            });
        })
        .catch(() =>{

        });
    }

    const onEmailNull = () =>{
        naviation('/auth');
    }

    useEffect(() =>{
        if (email == null){
            onEmailNull();
        }
    },[]);

    return (
        <div className="content">
            <div className="header">
                <Logo></Logo>
            </div>
            <div className="login-section">
                <div className="login-container">
                    <h1> Enter a password </h1>
                    <p>{email}</p>
                    <form onSubmit={onFormSubmit}>
                        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password" required></input>
                        <button type="submit">Create Account</button>
                    </form>
                    <p>or</p>
                    <button>Continue with google</button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;