import { io } from "socket.io-client";
import React, {
    createContext,
    useState,
    useMemo,
    useCallback,
    useEffect
} from "react";

const socket = io('http://localhost:3000');
sessionStorage.setItem("userID", Math.floor(Math.random() * 1000000));
const userID = sessionStorage.getItem("userID");
export const MessageContext = createContext();

export function MessageConextProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [likes, setLikes] = useState();
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/messages", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                    },
                    cache: "no-store"
                });
                if (!response.ok) {
                    throw new Error(`HTTP ERROR! Status: ${response.status}`);
                }
                const data = await response.json();
                setMessages(data);
                setLikes(data.likes);
            } catch (error) {
                console.error('Failed to retieve messages', e)
            }
        }
        
    useEffect(() => {
        fetchMessages();
        socket.on('new_message', (newMessage) => {
            setMessages(prev => [...prev, newMessage]);
        });
        socket.on('updated_message', () => {
            fetchMessages();
        })
        socket.on('new_like', (likes) => {
            setLikes(likes);
        });
        socket.on('message_removed', () => {
            fetchMessages();
        })
        socket.on('new_reply', () => {
            fetchMessages();
        })

        return () => {
            socket.off('new_message');
            socket.off('new_like');
            socket.off('updated_message');
            socket.off('message_removed');
            socket.off('new_reply');
        }

    }, [likes]);

    const commentOnPost = async(id, content) => {
        try{
            const response = await fetch("http://localhost:3000" + `/api/user/${userID}/comment/${id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({message: content}),
            });
            if(!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error commenting on message on message board', error);
        }
    }   
    const updateMessages = async (id, content) => {
        try{
            const response = await fetch("http://localhost:3000" + `/api/user/${userID}/edit/message/${id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({message: content}),
            });
            if(!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error editing message on message board', error);
        }
    }

    const addMessage = async (message) => {

        try{
            const response = await fetch("http://localhost:3000" + `/api/user/${userID}/add/message`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({message: message}),
            });
            if(!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding message to message board', error);
        }
    }

    const likeMessage = async(id) => {
        const response = await fetch("http://localhost:3000" + `/api/like/message/${id}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error(`HTTP ERROR! Status: ${response.status}`);
        }
        setLikes(response);
    }
    
    const removeMessage = async (id) => {
        try{
            const response = await fetch("http://localhost:3000" + `/api/user/${userID}/remove/message/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if(!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error removing message from message board', error);
        }
    }

    const contextValue = useMemo(
        () =>({
            messages,
            fetchMessages,
            commentOnPost,
            removeMessage,
            likeMessage,
            addMessage,
            updateMessages,
        }),
        [messages],
    );

    return (
        <MessageContext.Provider value ={contextValue}>{children}</MessageContext.Provider>
    );
}