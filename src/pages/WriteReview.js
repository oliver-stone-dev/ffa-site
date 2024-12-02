import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WriteReviewPage = () =>{

    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [terminalNames,setTerminalNames] = useState([])
    const [reviewText,setReviewText] = useState("");
    const [reviewTerminal,setReviewTerminal] = useState();
    const [reviewDateTime,setReviewDateTime] = useState(new Date());
    const [reviewRating,setReviewRating] = useState();

    const returnToAirportNav = useNavigate();

    useEffect(() => {

        setAirport(null);

        fetch(`http://localhost:5115/airports/${id}`)
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch(() =>{

        });

        fetch(`http://localhost:5115/airports/${id}/terminals`)
        .then((response) => response.json())
        .then((data) => {
            mapTerminalNames(data);
        })
        .then((response) => console.log(response))
        .catch(() =>{

        });
    
    }
    ,[id]);
    

    const onReviewSubmit = () =>{

        const bodyString = JSON.stringify({
            terminalId: reviewTerminal,
            accountId: "91ad693d-6446-4f65-ac09-546b72754046",
            rating: reviewRating,
            dateTime: reviewDateTime,
            comment: reviewText
        });

        fetch('http://localhost:5115/reviews',{
            method: "POST",
            body: bodyString,
            headers: {
                "Content-type": "application/json",
                "accept": "text/plain",
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

    const onChangeReviewRating = (e) =>{
        var rating = parseInt(e.target.value);
        setReviewRating(rating);
    }

    const mapTerminalNames = (terminals) =>{
        var termNames = terminals.map(({id,name}) => ({id,name}));
        setTerminalNames(termNames);
    }

    const onSubmitSuccess = () =>{
        returnToAirportNav(`/airports/${id}`)
    }

    const onSubmitFail = () =>{

    }

    if (airport === null || terminalNames === null) {
        return <p>Loading...</p>
    }else{
        return (
                <div>
                    <HeaderSearch className="header"></HeaderSearch>
                    <div className="content">
                        <div className="airport-section">
                            <div className="airport-container">
                                <h1>{airport.name}</h1>
                                <h3>{airport.website}</h3>
                            </div>
                            <div>
                                <p>Write a review</p>
                            </div>
                        </div>
                        <div className="write-review-section">
                                <div className="write-review-container">
                                    <h1>Rate your experience</h1>
                                    <select className="review-terminal-rating" onChange={onChangeReviewRating}>
                                        <option>5</option>
                                        <option>4</option>
                                        <option>3</option>
                                        <option>2</option>
                                        <option>1</option>
                                    </select>
                                    <h3>Terminal</h3>
                                    <select className="review-terminal-dropdown" onChange={onChangeReviewTerminal}>
                                        {terminalNames.map((terminalName) =>  <option key={terminalName.id} value={terminalName.id}>{terminalName.name}</option>)}
                                    </select>
                                    <h3>Date of experience</h3>
                                    <DatePicker selected={reviewDateTime} onChange={(date) => setReviewDateTime(date)}></DatePicker>
                                    <h3>Tell us about your experience!</h3>
                                    <textarea className="write-review-text" onChange={onChangeReviewText}></textarea><br></br>
                                    <p>By pressing submit I confirm that I have read the privacy policy, and that this review is based on a genuine experience.</p>
                                    <button onClick={onReviewSubmit}>Submit</button>
                                </div>
                        </div>
                    </div>
                    <div className="footer">
                        <p>privacy policy</p>
                    </div>
                </div>
        );
    }
}

export default WriteReviewPage;