import Logo from "../components/Logo";
import { useState} from "react";
import { useNavigate} from "react-router-dom";
import ConfigData from "../config.json"

const AuthPage = () => {

    const [emailAddress, setEmailAddress] = useState("");
    const nextPageNav = useNavigate();
    
    const onFormSubmit = (e) =>{
        e.preventDefault();

        fetch(`${ConfigData.PROD_API_URL}/account/exists?` + new URLSearchParams({
            email: emailAddress
        }))
        .then((response) => response.json())
        .then((exists) => {
            if (exists){
                onEmailExists();
            }else{
                onEmailDoesntExist();
            }
        })
        .catch(() => {

        })
    }

    const onEmailExists = () =>{
        nextPageNav("/login",{ 
            state: {
                email: emailAddress
            }
        });
    }

    const onEmailDoesntExist = () =>{
        nextPageNav("/signup",{
            state: {
                email: emailAddress
            }
        });
    }

    const onEmailTextChange = (e) =>{
        setEmailAddress(e.target.value)
    }

    return (
        <div className="content">
            <div className="header">
                <Logo></Logo>
            </div>
                <div className="login-section">
                    <div className="login-container">
                        <h3>Enter your email</h3>
                        <form className="submit-form" onSubmit={onFormSubmit}>
                            <input type="email" placeholder="Enter your email" onChange={onEmailTextChange} required></input>
                            <button className="auth-button" type="submit">Sign-up or sign-in</button>
                        </form>
                        <p>or</p>
                        <button className="auth-button" >Continue with google</button>
                    </div>
                </div>
        </div>
    );
}

export default AuthPage;