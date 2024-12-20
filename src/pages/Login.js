import Logo from "../components/Logo";
import { useEffect, useState} from "react";
import { useNavigate ,Link} from "react-router-dom";
import { useLocation} from 'react-router-dom';

const LoginPage = () => {

    const naviation = useNavigate();
    const location = useLocation();
    const {email} = location.state || {};
    const [password,setPassword] = useState("");

    const navigation = useNavigate();
    
    const onFormSubmit = (e) =>{
        e.preventDefault();

        localStorage.removeItem('accessToken');
        
        fetch("http://localhost:5115/login",{
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json",
                "accept": "text/plain",
            }
        })
        .then((response) => {
            if (!response.ok){
                setPassword("");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('accessToken',JSON.stringify(data));
            navigation("/");
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
    },[email, naviation]);

    return (
        <div className="content">
            <div className="header">
                <Logo></Logo>
            </div>
                <div className="login-section">
                    <div className="login-container">
                        <h1> Enter your password</h1>
                        <h4>{email}</h4>
                        <form className="submit-form" onSubmit={onFormSubmit}>
                            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password" required></input>
                            <button className="auth-button" type="submit">Login</button>
                        </form>
                        <p>or</p>
                        <button className="auth-button" >Continue with google</button>
                        <br></br>
                        <Link to={"/passwordreset"} state={email}>Forget password?</Link>
                    </div>
                </div>
        </div>
    );
}

export default LoginPage;