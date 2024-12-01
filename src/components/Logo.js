import { Link } from 'react-router-dom'

const Logo = () =>{
    return (
        <div className="logo">
            <Link to={"/"}>
                <h2>film friendly airports</h2>
            </Link>
        </div>
    );
}

export default Logo;