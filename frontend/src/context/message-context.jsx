import React, {
    createContext,
    useState,
    useMemo,
    useCallback,
    useEffect
} from "react";

export const MessageContext = createContext();

export function MessageConextProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:3000" + "/api/messages", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
            const data = response.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to retieve messages', e)
        }
    }

    const updateMessages = useCallback((newMessages) => {
        setMessages(newMessages);
    }, []);

    const addMessage = async (message) => {
        setMessages((prev) => ([
            ...prev,
            message
        ]));

        try{
            const response = await fetch("http://localhost:3000" + `/api/update/message/${message}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if(!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding message to message board', error);
        }
    }

    const removeMessage = async (message) => {
        setMessages((prev) => ([
            ...prev,
            message
        ]));

        try{
            const response = await fetch("http://localhost:3000" + `/api/remove/message/${message}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if(!response.ok) {
                throw new Error(`HTTP ERROR! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding message to message board', error);
        }
    }

    const contextValue = useMemo(
        () =>({
            messages,
            fetchMessages,
            removeMessage,
            addMessage,
            updateMessages,
        }),
        [messages],
    );

    return (
        <MessageContext.Provider value ={contextValue}>{children}</MessageContext.Provider>
    );
}