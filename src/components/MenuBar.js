import { Link } from 'react-router-dom'
import '../styles.css'
import AccountMenuButton from './AccountMenuButton';

const MenuBar = () => {
    return (
        <div className='menu-bar'>
            <ul>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                <li>
                    <AccountMenuButton></AccountMenuButton>
                </li>
            </ul>
        </div>
    );
}

export default MenuBar;