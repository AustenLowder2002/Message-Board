import React, { act, useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../../context/message-context";
import styles from "./MessageBoard.module.scss";
import PopupComponent from "../Shared/PopupInput/PopupComponent";
import Card from 'react-bootstrap/card';

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
        return (
            <div className={styles.container} key={index}>
                <div className={styles.MessageContainer}>
                <h3>Post: {message.id}</h3>
                    <div className={styles.mainMessage}>
                    <p>{message.content}</p>
                        <div className={styles.subMessages}>
                            <p>
                                {replies?.map((reply, index) => (
                                    <p key={index}>{reply.content}</p>
                                ))}
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                <div className={styles.commentContainer}>
                    <button onClick={() => handleCommentClick(message.id)}>Add a comment</button>
                    {isCommentID && (
                        <PopupComponent
                            id={message.id}
                            comment={true}
                            onClose={() => setCommentID(null)} />
                    )}
                </div>
                <div className={styles.editContainer}>
                    <button onClick={() => handleButtonClick(message.id)}>edit</button>
                    {isActiveID && (
                        <PopupComponent
                            id={message.id}
                            comment={false}
                            onClose={() => setActiveId(null)} />
                    )}
                </div>
                <div className={styles.removeContainer}>
                    <button onClick={() => remove(message.id)}>Remove message</button>
                </div>
                <div className={styles.likeContainer}>
                <p>This post has: {message.likes} likes.</p>
                    <button onClick={() => likeMessageUpdate(message.id)} disabled={isDisabled}>
                        {isDisabled ? "Please wait..." : "Like"}
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