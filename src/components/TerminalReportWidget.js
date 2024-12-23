import { useEffect, useState } from "react";
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { ValidTokenContext } from "../context/ValidTokenContext";
import { useNavigate } from "react-router-dom";
import checkmark from "../assets/checkmark.png";
import warning from "../assets/warning.png";
import logoSmall from "../assets/logoSmall.png"
import ConfigData from "../config.json"

const TerminalReportWidget = ({terminalToReport}) =>{

    const scannerReportType = 1;
    const checksReportType = 2;

    const navigation = useNavigate();

    const [terminal] = useState(terminalToReport);
    const accountDetails = useContext(AccountContext);
    const tokenValid = useContext(ValidTokenContext);
    const bearerTokenData = JSON.parse(localStorage.getItem('accessToken'));
    const [scannerButtonChecked,setScannerChecked] = useState(false);
    const [checkButtonChecked,setCheckChecked] = useState(false);
    const [airportDataReports] = useState(null);
    const [reportAlerts,setReportAlerts] = useState(null);
    const [widgetOpen,setWidgetOpen] = useState(false);

    useEffect(() => {

        //get terminal open from session
        const savedSession = sessionStorage.getItem('airport');
        if (savedSession !== null && savedSession.length > 0){
            const data = JSON.parse(savedSession);
            if (data.id === terminal.airportId){
                data.terminals.forEach((t) => {
                    if (t.id === terminal.id){
                        setWidgetOpen(t.isOpen);
                    };
                });
            }
        }

        fetch(`${ConfigData.PROD_API_URL}/report/alerts?`+ new URLSearchParams({
            terminalId: terminal.id
        }).toString())
        .then((response) => {
            if (!response.ok){
                return null;
            }
            return response.json();
        })
        .then ((data) => setReportAlerts(data));

        if (tokenValid !== true || accountDetails === null){
            return;
        }

        const updateReporting = async () =>{

            const scannerReport = await getReport(terminal.id,accountDetails.id,scannerReportType);
            if (scannerReport !== null){
                setScannerChecked(true);
            }

            const checkReport = await getReport(terminal.id,accountDetails.id,checksReportType);
            if (checkReport !== null){
                setCheckChecked(true);
            }
        }

        const getReport = async (terminalId, accountId, reportType) =>{
            const report = await fetch(`${ConfigData.PROD_API_URL}/report?` + new URLSearchParams({
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

        fetch(`${ConfigData.PROD_API_URL}/report`,{
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

    const OkayReport = (text) =>{
        return(
            <div className="report-list-item">
                <img src={checkmark} alt="checkmark"></img>
                <p>{text}</p>
            </div>
        );
    }

    const WarningReport = (text) =>{
        return(
            <div className="report-list-item">
                <img src={warning} alt="warning"></img>
                <p>{text}</p>
            </div>
        );
    }

    const AirportDataList = ({airportData}) =>{

        if (airportData === null || airportData === undefined){
            return (
                <div className="report-data-list">
                    {WarningReport("No official data, use caution!")}
                </div>
            );
        }else if (airportData.length === 0){
            return (
                <div className="report-data-list">
                    {WarningReport("No official data, use caution!")}
                </div>
            );
        }
        else{
        return(
            <div className="report-data-list">
                {airportData.map((report) => {
                        if (report.warning === true){
                            return WarningReport(report.text);
                        }else{
                            return OkayReport(report.text);
                        }
                    }
                )}
            </div>
        );
        }
    }

    const ReportDataList = ({airportData}) =>{

        if (airportData === null || airportData === undefined){
            return (
                <div className="report-data-list">
                    {OkayReport("Nothing to report.")}
                </div>
            );
        }else if (airportData.length === 0){
            return (
                <div className="report-data-list">
                    {OkayReport("Nothing to report.")}
                </div>
            );
        }
        else{
        return(
            <div className="report-data-list">
                {airportData.map((report) => WarningReport(report.text))}
            </div>
        );
        }
    }

    const onOpenPressed = () =>{

        var isOpened = false;

        if (widgetOpen){
            isOpened = false;
        }else{
            isOpened = true;
        }

        setWidgetOpen(isOpened);

        //save widget open to session
        const sessionData = JSON.parse(sessionStorage.getItem('airport'));
        if (sessionData !== null){
            if(sessionData.id === terminal.airportId){
                sessionData.terminals.forEach((t) => {
                    if (t.id === terminal.id){
                        t.isOpen = isOpened;
                    };
                });
            }

            sessionStorage.setItem('airport',JSON.stringify(sessionData));
        }
    }

    const onReportPressed = (e,type) =>{
        if (e.target.value === "yes"){
            onReportClick(type);
        }
    }

    if (widgetOpen === false){
            return (
                <div className="terminal-report-widget-closed">
                    <div className="terminal-grid-container">
                        <div className="name-item"><h3>{terminal.name}</h3></div>
                        <div onClick={onOpenPressed} className="expand-button-item"><FontAwesomeIcon icon={faCaretDown} /></div>
                    </div>
                </div>
            );
    }else{
        return (
            <div className="terminal-report-widget">
                <div className="terminal-grid-container">
                    <div className="name-item"><h3>{terminal.name}</h3></div>
                    <div onClick={onOpenPressed} className="expand-button-item"><FontAwesomeIcon icon={faCaretUp} /></div>
                    <div className="airport-data-item">
                        <p>Official Data</p>
                        <AirportDataList airportData={airportDataReports}></AirportDataList>
                    </div>
                    <div className="reports-item">
                        <div className="our-reports-container">
                            <img src={logoSmall} alt="small logo"></img>
                            <p>Our Reports</p>
                        </div>
                        <ReportDataList airportData={reportAlerts}></ReportDataList>
                    </div>
                    <div className="make-report-item">
                        <div className="make-report-container">
                            <p>Have you spotted CT scanners at this terminals?</p>
                            <div className="review-radio-buttons">
                                <input checked={scannerButtonChecked} onChange={(event) => {onReportPressed(event,scannerReportType)}} id={terminal.name + "radio-btn-scanner"} type="radio" className="radio-input" name={terminal.name + "-scanner"} value="yes"></input>
                                <label for={terminal.name + "radio-btn-scanner"} className="radio-button"><FontAwesomeIcon icon={faThumbsUp} />Yes</label>
                            </div>
                        </div>
                        <div className="make-report-container">
                            <p>Have you been denied a hand-check?</p>
                            <div className="review-radio-buttons">
                                <input checked={checkButtonChecked} onChange={(event) => {onReportPressed(event,checksReportType)}} id={terminal.name + "radio-btn-checks"} type="radio" className="radio-input" name={terminal.name + "-checks"}value="yes"></input>
                                <label for={terminal.name + "radio-btn-checks"} className="radio-button"><FontAwesomeIcon icon={faThumbsUp} />Yes</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TerminalReportWidget;