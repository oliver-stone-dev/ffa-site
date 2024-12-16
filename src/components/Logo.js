import { Link } from 'react-router-dom'
import CompanyLogo from "../assets/logo.png"

const Logo = () =>{
    return (
        <div className="logo">
            <Link className="logo-link"  to={"/"}>
                <img className="logo-img" src={CompanyLogo} alt='logo'></img>
            </Link>
        </div>
    );
}

export default Logo;