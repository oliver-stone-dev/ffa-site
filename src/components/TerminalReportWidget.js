import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";
import { useNavigate } from "react-router-dom";
import checkmark from "../assets/checkmark.png";
import warning from "../assets/warning.png";

const TerminalReportWidget = ({terminalToReport}) =>{

    const scannerReportType = 1;
    const checksReportType = 2;

    const navigation = useNavigate();

    const [terminal,setTerminal] = useState(terminalToReport);
    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);
    const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));
    const [scannerReport,setScannerReport] = useState(null);
    const [checkReport,setCheckReport] = useState(null);
    const [scannerButtonDisabled,setScannerBtnDisabled] = useState(false);
    const [checksBtnPDisabled,setChecksBtnDisabled] = useState(false);

    useEffect(() => {

        if (tokenValid !== true || accountDetails === null){
            return;
        }

        const updateReporting = async () =>{

            const scannerReport = await getReport(terminal.id,accountDetails.id,scannerReportType);
            setScannerReport(scannerReport);
            if (scannerReport !== null){
                setScannerBtnDisabled(true);
            }

            const checkReport = await getReport(terminal.id,accountDetails.id,checksReportType);
            setCheckReport(checkReport);
            if (checkReport !== null){
                setChecksBtnDisabled(true);
            }
        }

        const getReport = async (terminalId, accountId, reportType) =>{
            const report = await fetch('http://localhost:5115/report?' + new URLSearchParams({
                accountId: accountId,
                terminalId: terminalId,
                type : reportType 
            }).toString())
            .then((response) => {
                if (!response.ok){
                    return null
                }
                return response.json();
            })
            .then((data) =>{
                if (data.length <= 0){
                    return null;
                }

                return data;
            });

            return report;
        }

        updateReporting();

    },[terminal,tokenValid,accountDetails]);

    const onReportClick = (reportTypeId) =>{

        if (tokenValid !== true || accountDetails === null){
            navigation('/auth');
            return;
        }

        fetch('http://localhost:5115/report',{
                method: "POST",
                body: JSON.stringify({
                    "typeId": reportTypeId,
                    "accountId": accountDetails.id,
                    "terminalId": terminal.id,
                    "timeStamp": new Date(),
                }),
                headers: {
                    "Content-type": "application/json",
                    "accept": "text/plain",
                    "Authorization": bearerTokenData.tokenType + " " + bearerTokenData.accessToken
                }
            })
            .then(() => navigation(0))
            .catch(() =>{

            });
    }

    const reportButton = (reportTypeId, disabled) =>{
        return(
            <button onClick={() => onReportClick(reportTypeId)} className="custom-button" disabled={true}  >
                <FontAwesomeIcon icon={faThumbsUp} />YES
            </button>
        );
    }

    return (
        <div className="terminal-report-widget">
            <div className="terminal-grid-container">
                <div className="name-item"><h3>{terminal.name}</h3></div>
                <div className="updated-item"><p>Updated: TODAY</p></div>
                <div className="scanner-alert-item">
                    <img src={warning} alt="warning"></img>
                    <h2>CT scanners is use!</h2> 
                </div>
                <div className="check-alert-item">
                    <img src={checkmark} alt="checkmark"></img>
                    <h2>Hand checks allowed!</h2>
                </div>
                <div className="scanner-report-item">
                    <p>Have you spotted CT scanners at this terminal?</p>
                    {reportButton(scannerReportType,scannerButtonDisabled)}
                </div>
                <div className="check-report-item">
                    <p>Does this terminal allow hand checks?</p>
                    {reportButton(checksReportType,checksBtnPDisabled)}
                </div>
            </div>
        </div>
    );
}

export default TerminalReportWidget;