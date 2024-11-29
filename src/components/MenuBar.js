import { Link } from 'react-router-dom'
import '../styles.css'

const MenuBar = () => {
    return (
        <div className='menuBar'>
            <ul>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
            </ul>
        </div>
    );
}

export default MenuBar;