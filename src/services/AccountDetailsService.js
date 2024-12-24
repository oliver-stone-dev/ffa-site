import ConfigData from "../config.json"

const GetAccountDetails = async (tokenType, accessToken) =>{
    try{
        const details = await fetch(`${ConfigData.PROD_API_URL}/account`, {
            headers:{
                "Content-type": "application/json",
                "accept": "text/plain",
                "Authorization": tokenType + " " + accessToken
            }
        })
        .then((response) => {
            if (!response.ok){
                return null;
            }
    
            return response.json();
        })
        .then((data) => data);
    
        return details;
    }
    catch (error){
        return null;
    }
}

export default GetAccountDetails;