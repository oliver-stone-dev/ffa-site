import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TokenVerifyService from "../services/TokenVerifyService"
import GetAccountDetails from "../services/AccountDetailsService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import ConfigData from "../config.json"

const WriteReviewWidget = ({airportToReview}) =>{

    const [airport] = useState(airportToReview);
    const [terminalNames,setTerminalNames] = useState([])
    const [reviewText,setReviewText] = useState("");
    const [reviewTerminal,setReviewTerminal] = useState(1);
    const [reviewDateTime,setReviewDateTime] = useState(new Date());
    const [reviewRecommendation,setReviewRecommendation] = useState(false);
    const [submitButtonDisabled,setSubmitDisabled] = useState(true);
    const [accountDetails,setAccountDetails] = useState(null);
    const [accessToken,setAccessToken] = useState();
    const navigation = useNavigate();

    const returnToAirportNav = useNavigate();

    useEffect(() => {

        const getAccountDetails = async () =>{
            //Verify token
            const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));

            if (bearerTokenData === null){
                return;
            }

            const isValid = await TokenVerifyService(bearerTokenData.tokenType,bearerTokenData.accessToken);
            setAccessToken(bearerTokenData);

            //Get account details
            if (isValid){
                const details = await GetAccountDetails(bearerTokenData.tokenType,bearerTokenData.accessToken);
                setAccountDetails(details);
                return true;
            }else{
                return false;
            }
        }

        const success = getAccountDetails();
        if (success === false){
            navigation('/auth');
        }

        fetch(`${ConfigData.PROD_API_URL}/airports/${airport.id}/terminals`)
        .then((response) => response.json())
        .then((data) => {
            mapTerminalNames(data);
            setReviewTerminal(data[0].id)
        })
        .catch(() =>{

        });
    }
    ,[navigation,airport]);

    const onReviewSubmit = () =>{

        const bodyString = JSON.stringify({
            terminalId: reviewTerminal,
            accountId: accountDetails.id,
            recommended: reviewRecommendation,
            dateTime: reviewDateTime,
            comment: reviewText
        });

        fetch(`${ConfigData.PROD_API_URL}/reviews`,{
            method: "POST",
            body: bodyString,
            headers: {
                "Content-type": "application/json",
                "accept": "text/plain",
                "Authorization": accessToken.tokenType + " " + accessToken.accessToken
            }
        })
        .then((response) =>{
            if (!response.ok){
                onSubmitFail();
            }else{
                onSubmitSuccess();
            }
        })
        .catch( () =>{

        })
    }

    const onChangeReviewText = (e) =>{
        var text = e.target.value;
        setReviewText(text);
    }

    const onChangeReviewTerminal = (e) =>{
        var terminalId = parseInt(e.target.value);
        setReviewTerminal(terminalId);
    }

    const mapTerminalNames = (terminals) =>{
        var termNames = terminals.map(({id,name}) => ({id,name}));
        setTerminalNames(termNames);
    }

    const onSubmitSuccess = () =>{
        returnToAirportNav(`/airports/${airport.id}`)
    }

    const onSubmitFail = () =>{

    }

    const recommendChange = (event) =>{
       var val = event.target.value;
       if (val === "yes"){
            setSubmitDisabled(false);
            setReviewRecommendation(true);
       }else if (val === "no"){
            setSubmitDisabled(false);
            setReviewRecommendation(false);
       }
    }

    return (
        <div className="write-review-widget">
                <div className="write-review-grid-container">
                    <div className="terminal-item">
                        <h3>Terminal</h3>
                        <select className="review-terminal-dropdown" onChange={onChangeReviewTerminal}>
                            {terminalNames.map((terminalName) =>  <option key={terminalName.id} value={terminalName.id}>{terminalName.name}</option>)}
                        </select>
                    </div>
                    <div className="date-item">
                        <h3>Date of experience</h3>
                        <DatePicker selected={reviewDateTime} onChange={(date) => setReviewDateTime(date)}></DatePicker>
                    </div>
                    <div className="comment-item">
                        <h3>Tell us about your experience! (Optional)</h3>
                        <textarea className="write-review-text" onChange={onChangeReviewText} 
                        placeholder="How easy was it getting your film through and were the staff helpful? What scanners did they use, and were hand checks allowed? Please be honest!"></textarea><br></br>
                    </div>
                    <div className="rating-item">
                        <h3>Would you recommend this airport?</h3>
                        <div className="review-radio-buttons">
                            <input onChange={recommendChange} id="radio-btn-yes" type="radio" className="radio-input" name="recommend" value="yes"></input>
                            <label for="radio-btn-yes" className="radio-button"><FontAwesomeIcon icon={faThumbsUp} />Yes</label>
                            <input onChange={recommendChange} id="radio-btn-no" type="radio" className="radio-input" name="recommend" value="no"></input>
                            <label for="radio-btn-no" className="radio-button"><FontAwesomeIcon icon={faThumbsDown} />No</label>
                        </div>
                    </div>
                    <div className="submit-item">
                        <p>By pressing submit I confirm that I have read the privacy policy, and that this review is based on a genuine experience.</p>
                        <button className="auth-button" onClick={onReviewSubmit} disabled={submitButtonDisabled}>Submit</button>
                    </div>
                </div>
        </div>
    );
}

export default WriteReviewWidget;