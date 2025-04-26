import React, { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../../context/message-context";
import styles from "./MessageBoard.module.scss";

function MessageBoard() {
    const {messages, fetchMessages, likeMessage, removeMessage, updateMessages, addMessage } = useContext(MessageContext);
    const [sentMessage, setSentMessage] = useState();
    const likeMessageUpdate = async(id) =>{
        await likeMessage(id);
        await fetchMessages();
    }
    const editMessage = async(id, text) => {
        await updateMessages(id, text)
        await fetchMessages();
    }
    const remove = async(id) => {
        await removeMessage(id);
        await fetchMessages();
    }
    const sendMessage = async() => {
        if(sentMessage != null || sentMessage == "") {
            await addMessage(sentMessage);
            await fetchMessages();
        }else {
            window.alert("Please input a value before submitting.");
        }
    }
    const renderMessages = (message) => {
        return (
            <div className={styles.container}>
                <div className={styles.MessageContainer}>
                    <h1>{message.id}</h1>
                    <p>{message.content}</p>
                </div>
                <div className={styles.likeContainer}>
                    <button onClick={() => likeMessageUpdate(message.id)}>{message.likes} Likes</button>
                </div>
                <div className={styles.removeContainer}>
                    <button onClick={() => remove(message.id)}>Remove message</button>
                </div>
                <div className={styles.editContainer}>
                    <button onClick={() => editMessage(message.id, text)}>edit</button>
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
                {messages.map((message) => renderMessages(message))}
                </div>
                <div className={styles.buttonContainer}>
                    <input onChange={(e) => setSentMessage(e.target.value)}/><button onClick={sendMessage}>submit</button>
                </div>
            </div>            
        </div>
    )
}

export default MessageBoard;