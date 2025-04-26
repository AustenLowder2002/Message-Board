import React, { useContext, useState } from "react";
import { MessageContext } from "../../context/message-context";
import styles from "./MessageBoard.module.scss";
import PopupComponent from "../Shared/PopupInput/PopupComponent";
import {ThumbsUp, ChatCircleText, Eraser, Pencil} from '@phosphor-icons/react';
function MessageBoard() {
    const { messages, likeMessage, removeMessage, addMessage } = useContext(MessageContext);
    const [sentMessage, setSentMessage] = useState();
    const [activeId, setActiveId] = useState(null);
    const [commentID, setCommentID] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleButtonClick = (id) => {
        setActiveId(id);
    };
    const handleCommentClick = (id) => {
        setCommentID(id);
    }

    const likeMessageUpdate = async (id) => {
        setIsDisabled(true);
        await likeMessage(id);
        setTimeout(() => {
            setIsDisabled(false);
        }, 2000);
    }

    const remove = async (id) => {
        await removeMessage(id);
    }
    const sendMessage = async () => {
        if (sentMessage != null || sentMessage == "") {
            await addMessage(sentMessage);
        } else {
            window.alert("Please input a value before submitting.");
        }
        setSentMessage('');
    }
    const renderMessages = (message, index) => {
        const isActiveID = activeId === message.id;
        const isCommentID = commentID === message.id;
        const replies = message?.replies;
        const id = message?.userID;
        return (
            <div className={styles.container} key={index}>
                <div className={styles.MessageContainer}>
                <h3>Anyomous-User {message.userID}</h3>
                    <div className={styles.mainMessage}>
                    <p>{message.content}</p>
                        <div className={styles.subMessages}>
                            <div>
                                {replies?.map(({ userID, content }, index) => (
                                    <div key={index}>
                                        <p><strong>Anyomous-User {userID}</strong></p>
                                        <p>{content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <p>This post has: {message.likes} likes.</p>
                </div>
                <div className={styles.lastEdit}>
                    <p>Last edited by: Anyomous-User {message.lastEditedBy}</p>
                </div>
                <div className={styles.buttonContainer}>
                <div className={styles.commentContainer}>
                    <button onClick={() => handleCommentClick(message.id)}>Comment <ChatCircleText size={18} /></button>
                    {isCommentID && (
                        <PopupComponent
                            id={message.id}
                            comment={true}
                            onClose={() => setCommentID(null)} />
                    )}
                </div>
                <div className={styles.editContainer}>
                    <button onClick={() => handleButtonClick(message.id)}>Edit <Pencil size={18} /></button>
                    {isActiveID && (
                        <PopupComponent
                            id={message.id}
                            comment={false}
                            onClose={() => setActiveId(null)} />
                    )}
                </div>
                <div className={styles.removeContainer}>
                    <button onClick={() => remove(message.id)}>Remove <Eraser size={18} /></button>
                </div>
                <div className={styles.likeContainer}>
                    <button 
                        onClick={() => likeMessageUpdate(message.id)} 
                        disabled={isDisabled}
                        >
                        {isDisabled ? "Please wait..." : "Like" } <ThumbsUp size={18} />
                    </button>
                </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome to the anonymous message board!</h1>
                    <h3>Where anything can be said...</h3>
                </div>
                <div className={styles.messages}>
                    {messages.map((message, index) => renderMessages(message, index))}
                </div>
                <div className={styles.buttonContainer}>
                    <input type="text" placeholder="type here" onChange={(e) => setSentMessage(e.target.value)} /><button onClick={sendMessage}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default MessageBoard;