import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const ThumbsUpButton = ({onClickCb}) =>{
    
    const [isActive,setIsActive] = useState(false);

    const buttonPressed = () =>{
        if (isActive){
            setIsActive(false);
        }else{
            setIsActive(true);
        }

        onClickCb();
    }

    return (
        <button onClick={buttonPressed} className={(isActive)? "toggle-button-active" : "toggle-button-inactive"} >
            <FontAwesomeIcon icon={faThumbsUp} />YES
        </button>
    )
}

export default ThumbsUpButton;