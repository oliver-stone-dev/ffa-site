import Logo from "../components/Logo";
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import AccountMenuButton from './AccountMenuButton';


const NavBar = ({enableSearch}) =>{

    const [mobileNavDisplayed,setMobileNavDisplayed] = useState(false);
    const [mobileSearchDisplayed,setMobileSearchDisplayed] = useState(false);
    const [isSearchEnabled,setIsSearchEnabled] = useState(enableSearch);

    const onHamburgerClick =() =>{
        if (mobileNavDisplayed){
            setMobileNavDisplayed(false);
        }else{
            setMobileNavDisplayed(true);
        }
    }

    const onSearchButtonClick =() =>{
        setMobileSearchDisplayed(true);
    }

    const onSearchExitClick = () =>{
        setMobileSearchDisplayed(false);
    }

    return (
        <div class="nav-bar">
            <div class="nav-bar-main">
                <div class="nav-bar-left">
                    <Logo></Logo>
                    { // check if search enabled
                        (isSearchEnabled) ? 
                        <div className="search-container">
                            <SearchBar className="search" style={{ maxWidth: '1000px' }}></SearchBar>
                        </div>:<></>
                    }
                </div>
                <div class="nav-bar-right">
                    <ul>
                        <li>
                            <Link className="standard-link" to={"/about"}>About</Link>
                        </li>
                        <li>
                            <AccountMenuButton></AccountMenuButton>
                        </li>
                    </ul>
                    { // check if search enabled
                        (isSearchEnabled) ? 
                        <div className="search-container-mobile">
                            <Link className="standard-link">
                                <FontAwesomeIcon className='menu-icon' icon={faMagnifyingGlass} onClick={onSearchButtonClick}></FontAwesomeIcon>
                            </Link>
                        </div>:<></>
                    }
                    <Link className="standard-link">
                        <FontAwesomeIcon className='menu-icon' icon={faBars} onClick={onHamburgerClick}></FontAwesomeIcon>
                    </Link>
                </div>
                {// mobile search bar enabled
                    (mobileSearchDisplayed) ?
                    <div className="search-container-view">
                        <SearchBar className="search"></SearchBar>
                        <div className="search-mobile-exit">
                            <Link className="standard-link">
                                <FontAwesomeIcon className='menu-icon' icon={faXmark} onClick={onSearchExitClick}></FontAwesomeIcon>
                            </Link>
                        </div>
                    </div>:<></>  
                }
            </div>
            { // display mobile nav bar 
                (mobileNavDisplayed) ? 
                <div class="nav-bar-mobile">
                    <ul>
                        <li>
                            <Link className="standard-link" to={"/about"}>About</Link>
                        </li>
                        <li>
                            <AccountMenuButton></AccountMenuButton>
                        </li>
                    </ul>
                </div> 
                :<div></div>
            }
        </div>
    );
}

export default NavBar;