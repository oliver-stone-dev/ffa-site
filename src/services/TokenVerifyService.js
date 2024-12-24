import ConfigData from "../config.json"

const IsAccessTokenValid = async (tokenType, accessToken) => {
    try{
        const response = await fetch(`${ConfigData.PROD_API_URL}/manage/info`, {
            headers:{
                "Content-type": "application/json",
                "accept": "text/plain",
                "Authorization": tokenType + " " + accessToken
            }
        });

        return response.ok;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

export default IsAccessTokenValid;