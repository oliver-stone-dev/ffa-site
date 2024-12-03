import Logo from "../components/Logo";
import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

const SignupPage = () => {

    const [emailAddress, setEmailAddress] = useState("");
    const nextPageNav = useNavigate();
    
    const onFormSubmit = (e) =>{
        e.preventDefault();

        //see if email exists
    }

    const onEmailTextChange = (e) =>{
        setEmailAddress(e.target.value)
    }

    return (
        <div>
            <div className="header">
                <Logo></Logo>
            </div>
            <div className="content">
                <div className="login-section">
                    <div className="login-container">
                        <h1>Enter your email</h1>
                        <form onSubmit={onFormSubmit}>
                            <input type="email" placeholder="Enter your email" onChange={onEmailTextChange} required></input>
                            <button type="submit">Sign-up or sign-in</button>
                        </form>
                        <p>or</p>
                        <button>Continue with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;