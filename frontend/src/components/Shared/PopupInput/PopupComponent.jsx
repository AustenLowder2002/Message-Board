import React, { useState, useContext } from "react";
import { MessageContext } from "../../../context/message-context";

const PopupComponent = ({ id, onClose, comment }) => {
    const { updateMessages, fetchMessages, commentOnPost } = useContext(MessageContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClosePopup = () => {
        if(!comment){
            editMessage(id, inputValue);
        }else {
            addComment(id, inputValue);
        }
        setInputValue('');

        onClose();
    };

    const editMessage = async (id, text) => {
        await updateMessages(id, text)
        await fetchMessages();
    }

    const addComment = async (id, content) =>{
        await commentOnPost(id, content)
        await fetchMessages();
    }

    return (
        <div>
            <div className="popup-overlay">
                <div className="popup-content">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter value"
                    />
                    <button onClick={handleClosePopup}>Close and Submit</button>
                </div>
            </div>
        </div>
    );
}

export default PopupComponent