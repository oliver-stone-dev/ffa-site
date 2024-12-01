import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const TerminalReportWidget = ({terminalToReport}) =>{

    const [terminal,setTerminal] = useState(terminalToReport);

    return (
        <div className="terminal-report-widget">
            <h3>{terminal.name}</h3>
            <p>Updated: TODAY</p>
            <h2>CT scanners is use!</h2>
            <h2>Hand checks allowed!</h2>

            <p>Have you spotted CT scanners at this terminal?</p>
            <button className="custom-button">
                <FontAwesomeIcon icon={faThumbsUp} />YES
            </button>
            <button className="custom-button">
                <FontAwesomeIcon icon={faThumbsDown} />NO
            </button>
            <p>Does this terminal allow hand checks?</p>
            <button className="custom-button">
                <FontAwesomeIcon icon={faThumbsUp} />YES
            </button>
            <button className="custom-button">
                <FontAwesomeIcon icon={faThumbsDown} />NO
            </button>
        </div>
    );
}

export default TerminalReportWidget;