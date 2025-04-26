import React, { act, useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../../context/message-context";
import styles from "./MessageBoard.module.scss";
import PopupComponent from "../Shared/PopupInput/PopupComponent";

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
    }
    const renderMessages = (message, index) => {
        const isActiveID = activeId === message.id;
        const isCommentID = commentID === message.id;
        const replies = message?.replies;
        return (
            <div className={styles.container} key={index}>
                <div className={styles.MessageContainer}>
                    <h1>{message.id}</h1>
                    <p>{message.content}</p>
                    <div>
                        <p>
                            {replies.map((reply, index) => (
                                <p key={index}>{reply.content}</p>
                            ))}
                        </p>
                    </div>
                </div>
                <div className={styles.likeContainer}>
                    <button onClick={() => likeMessageUpdate(message.id)} disabled={isDisabled}>
                        {isDisabled ? "Please wait..." : "Like"}
                    </button>
                    <p>This post has: {message.likes} likes.</p>
                </div>
                <div>
                    <button onClick={() => handleCommentClick(message.id)}>Add a comment</button>
                    {isCommentID && (
                        <PopupComponent
                            id={message.id}
                            comment={true}
                            onClose={() => setCommentID(null)} />
                    )}
                </div>
                <div className={styles.removeContainer}>
                    <button onClick={() => remove(message.id)}>Remove message</button>
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
            </div>
        )
    }
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome to the message board!</h1>
                </div>
                <div className={styles.messages}>
                    {messages.map((message,index) => renderMessages(message, index))}
                </div>
                <div className={styles.buttonContainer}>
                    <input onChange={(e) => setSentMessage(e.target.value)} /><button onClick={sendMessage}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default MessageBoard;