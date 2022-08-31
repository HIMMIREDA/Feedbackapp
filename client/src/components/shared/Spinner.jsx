import React, { useContext } from "react";
import FeedbackContext from "../../context/FeedbackContext";


function Spinner(){
    const {isLoading}=useContext(FeedbackContext);
    return(
        isLoading?(
        <div className={`loader ${isLoading?"show":""}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        )
        :null
    );
}


export default Spinner;