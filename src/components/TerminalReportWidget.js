import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const TerminalReportWidget = ({terminalToReport}) =>{

    const [terminal,setTerminal] = useState(terminalToReport);

    const onReportClick = (reportTypeId, result) =>{
        fetch('http://localhost:5115/report',{
                method: "POST",
                body: JSON.stringify({
                    "typeId": reportTypeId,
                    "accountId": "91ad693d-6446-4f65-ac09-546b72754046",
                    "terminalId": terminal.id,
                    "timeStamp": new Date(),
                    "result": result
                }),
                headers: {
                    "Content-type": "application/json",
                    "accept": "text/plain",
                }
            })
            .catch(() =>{

            });
    }

    return (
        <div className="terminal-report-widget">
            <h3>{terminal.name}</h3>
            <p>Updated: TODAY</p>
            <h2>CT scanners is use!</h2>
            <h2>Hand checks allowed!</h2>

            <p>Have you spotted CT scanners at this terminal?</p>
            <button onClick={() => onReportClick(1,true)} className="custom-button">
                <FontAwesomeIcon icon={faThumbsUp} />YES
            </button>
            <button onClick={() => onReportClick(1,false)} className="custom-button">
                <FontAwesomeIcon icon={faThumbsDown} />NO
            </button>
            <p>Does this terminal allow hand checks?</p>
            <button onClick={() => onReportClick(2,true)} className="custom-button">
                <FontAwesomeIcon icon={faThumbsUp} />YES
            </button>
            <button onClick={() => onReportClick(2,false)} className="custom-button">
                <FontAwesomeIcon icon={faThumbsDown} />NO
            </button>
        </div>
    );
}

export default TerminalReportWidget;