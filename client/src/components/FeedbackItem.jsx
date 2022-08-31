import React, { useContext } from 'react';
import { FaTimes,FaEdit } from "react-icons/fa";
import {useState} from 'react';
import Card from './shared/Card';
import PropTypes from "prop-types";
import FeedbackContext from '../context/FeedbackContext';

function Feedbackitem({item}) {
    
    const {deleteFeedback, editFeedback}=useContext(FeedbackContext);
    return (
        <Card>
            <div className="num-display">
                {item.rating}
            </div>
            <button className='close' onClick={()=>deleteFeedback(item.id)}>
                <FaTimes color='purple' />
            </button>
            <button className='edit' onClick={()=>editFeedback(item)}>
                <FaEdit color='purple'/>
            </button>
            <div className="text-display">
                {item.text}
            </div>
        </Card>
    );
}

Feedbackitem.propTypes={
    item : PropTypes.object.isRequired
};


export default Feedbackitem;