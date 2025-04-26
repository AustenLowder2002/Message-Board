import { io } from "socket.io-client";
import React, {
    createContext,
    useState,
    useMemo,
    useCallback,
    useEffect
} from "react";

const socket = io('http://localhost:3000');

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
        socket.on('new_like', (likes) => {
            setLikes(likes);
        });

        return () => {
            socket.off('new_message');
            socket.off('new_like');
        }

    }, [likes]);

    const updateMessages = useCallback((newMessages) => {
        setMessages(newMessages);
    }, []);

    const addMessage = async (message) => {

        try{
            const response = await fetch("http://localhost:3000" + `/api/add/message`, {
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
            const response = await fetch("http://localhost:3000" + `/api/remove/message/${id}`, {
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