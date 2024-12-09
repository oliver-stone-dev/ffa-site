import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";

const AccountProvider = ({accountDetails,isTokenValid, children}) =>{
    return (
        <ValidTokenContext.Provider value={isTokenValid}>
            <AccountContext.Provider value={accountDetails}>
                {children}
            </AccountContext.Provider>
        </ValidTokenContext.Provider>
    );
}

export default AccountProvider;