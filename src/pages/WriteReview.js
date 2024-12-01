import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";
import AirportInfoWidget from "../components/AirportInfoWidget.js";
import { Link } from 'react-router-dom'
import AirportReviewWidget from "../components/AirportReviewWidget";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WriteReviewPage = () =>{

    const {id} = useParams();
    const [airport,setAirport] = useState(null);
    const [terminals,setTerminals] = useState([]);
    const [terminalNames,setTerminalNames] = useState([]);
    const [reviewText,setReviewText] = useState("");

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
            setTerminals(data);
            getTerminalNames(data);
        })
        .catch(() =>{

        });
    
    }
    ,[id]);

    const onReviewSubmit = () =>{

    }

    const getTerminalNames = (terminals) =>{

        var termNames = terminals.map(({id,name}) => ({id,name}));
        setTerminalNames(termNames);
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
                        <div className="review-section">
                                <div className="write-review-container">
                                    <h1>Rate your experience</h1>
                                    <h3>Terminal</h3>
                                    <select className="review-terminal-dropdown">
                                        {terminalNames.map((terminalName) =>  <option>{terminalName.name}</option>)}
                                    </select>
                                    <h3>Date of experience</h3>
                                    <DatePicker></DatePicker>
                                    <h3>Tell us about your experience!</h3>
                                    <textarea className="write-review-text"></textarea><br></br>
                                    <p>By pressing submit I confirm that I have read the privacy policy, and that this review is based on a genuine experience.</p>
                                    <button >Submit</button>
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