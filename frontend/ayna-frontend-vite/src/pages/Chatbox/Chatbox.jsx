import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Input, Button, Spin } from "antd";
import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER = "http://localhost:3001";

function Chatbox() {
    const { user } = useAuthContext();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [isConnecting, setIsConnecting] = useState(true);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!user?.username) return;

        socketRef.current = socketIOClient(SOCKET_SERVER);
        const socket = socketRef.current;

        socket.emit("join", { username: user.username });

        socket.on("welcome", (data) => {
            setMessages(prev => [...prev, { user: data.user, text: data.text }]);
            setIsConnecting(false);
        });

        socket.on("message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        socket.on("roomData", (data) => {
            setUsers(data.users);
        });

        return () => socket.disconnect();
    }, [user?.username]);

    const sendMessage = (e) => {
        e?.preventDefault();
        if (message.trim() && socketRef.current) {
            socketRef.current.emit("sendMessage", {
                message: message.trim(),
                user: user.username
            });
            socketRef.current.emit("sendMessage", {
                message: "You said " + message.trim(),
                user: "Bot"
            });
            setMessage("");
        }
    };

    if (isConnecting) {
        console.log("Connecting... If not running, please use 'npm run server' to run the websocket server to use this page.");
        console.log("websocket server will run on http://localhost:3001");
        return (
            <div className="h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-blue-600 text-white p-4 text-center text-xl font-semibold">
                Chat with Bot
            </div>
            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-blue-50">
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${msg.user === user.username ? 'text-right' : ''}`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg ${msg.user === user.username
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                    }`}
                            >
                                <div className="font-semibold">{msg.user}</div>
                                <div>{msg.text}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <form onSubmit={sendMessage} className="p-4 border-gray-200 bg-blue-50">
                    <div className="flex gap-2">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            size="large"
                        />
                        <Button
                            type="primary"
                            onClick={sendMessage}
                            size="large"
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            Send
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Chatbox;