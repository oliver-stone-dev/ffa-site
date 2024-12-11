import { Link } from 'react-router-dom'

const Logo = () =>{
    return (
        <div className="logo">
            <Link className="logo-link"  to={"/"}>
                <h1>film friendly airports</h1>
            </Link>
        </div>
    );
}

export default Logo;