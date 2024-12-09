const GetAccountDetails = async (tokenType, accessToken) =>{
    try{
        const details = await fetch("http://localhost:5115/account", {
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