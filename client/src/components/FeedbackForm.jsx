import Card from "./shared/Card";
import { useContext, useEffect, useState } from "react";

import RatingSelect from "./RatingSelect";

import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
    const [text,setText]=useState("");
    const [rating,setRating]=useState(10);
    const [btnDisabled,setBtnDisabled]=useState(true);
    const [message,setMessage]=useState("");

    const {updateFeedback,addFeedback,feedbackEdit,setFeedbackEdit}=useContext(FeedbackContext);
    

    useEffect(()=>{
        if(feedbackEdit.edit){
            setText(feedbackEdit.item.text);
        }else{
            setText("");
        }
    },[feedbackEdit]);


    const handleTextChange=(e)=>{
        setText(e.target.value);

    };

    useEffect(()=>{
        if(text === ""){
            setBtnDisabled(true);
            setMessage(null);
        }else if(text !== "" && text.trim().length <= 10){
            setBtnDisabled(true);
            setMessage("text must be at least 10 characters");
        }else{
            setMessage(null);
            setBtnDisabled(false);
        }
    },[text]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(text.trim().length > 10){
            const newFeedback={
                text,
                rating
            };
            if(!feedbackEdit.edit){
                addFeedback(newFeedback);
                setText("");
            }else{
                updateFeedback({
                    id : feedbackEdit.item.id,
                    ...newFeedback
                });
                setFeedbackEdit({
                    item : {},
                    edit : false
                });
            }

            
        }
    };


    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us ?</h2>
                <RatingSelect select={(rating)=>setRating(rating)} />
                <div className="input-group">
                    <input type="text" placeholder="Write a review" onChange={handleTextChange} value={text} />
                    
                    <Button type="submit" isDisabled={btnDisabled}>
                        {feedbackEdit.edit ? "Update" : "Send"}
                    </Button>
                </div>

                {message && <div className="message">{message}</div>}
                    
                    
            </form>
        </Card>
    );
}

export default FeedbackForm;