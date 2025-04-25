import React, { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../../context/message-context";
import styles from "./MessageBoard.module.scss";

function MessageBoard() {
    const {messages, fetchMessages, removeMessage, updateMessages, addMessage } = useContext(MessageContext);
    const renderMessages = (data) => {
        return (
            <div>
                <p>something here</p>
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
                    {messages.map(renderMessages)}
                </div>
            </div>            
        </div>
    )
}

export default MessageBoard;