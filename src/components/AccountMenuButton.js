import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';
import { ValidTokenContext } from '../context/ValidTokenContext';

const AccountMenuButton = () =>{

    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);

    return(
        <div>
            { // Check login
                (tokenValid === true && accountDetails !== null)
                ? <Link className="standard-link" to={`/account`}>{accountDetails.displayName}</Link>
                : <Link className="standard-link" to={"/auth"}>Login</Link>
            }
        </div>
    )
}

export default AccountMenuButton;