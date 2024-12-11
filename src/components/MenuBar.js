import { Link } from 'react-router-dom'
import '../styles.css'
import AccountMenuButton from './AccountMenuButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'; 
import { useState } from 'react';

const MenuBar = () => {

    const [menuClassName,setMenuClassName] = useState("menu-bar");

    const onHamburgerClick = () =>{
        if (menuClassName === "menu-bar"){
            setMenuClassName("menu-bar-vertical");
        }else{
            setMenuClassName("menu-bar");
        }
    }

    return (
        <div>
            <ul className={menuClassName}>
                <li>
                    <Link className="button-link" to={"/about"}>About</Link>
                </li>
                <li>
                    <AccountMenuButton></AccountMenuButton>
                </li>
            </ul>
            {/* <Link className="button-link" onClick={onHamburgerClick}>
                <FontAwesomeIcon className='menu-icon' icon={faBars} ></FontAwesomeIcon>
            </Link> */}
        </div>
    );
}

export default MenuBar;