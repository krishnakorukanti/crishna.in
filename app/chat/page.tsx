'use client';

// Temporarily commented out to fix build errors
// import { useAssistant, Message } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
    // Temporarily disabled chat functionality
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-zinc-900 to-zinc-800">
            <div className="max-w-md p-8 text-center bg-zinc-800 rounded-lg shadow-lg">
                <h1 className="mb-4 text-2xl font-bold text-white">Chat Coming Soon</h1>
                <p className="text-zinc-300">
                    The chat feature is currently under maintenance. Please check back later.
                </p>
            </div>
        </div>
    );
    
    /* Original implementation - temporarily commented out
    const { status, messages, input, submitMessage, handleInputChange } =
        useAssistant({ api: '/api/assistant' });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((m: Message) => (
                    <div key={m.id} className={`message ${m.role}`}>
                        <strong>{`${m.role}: `}</strong>
                        {m.role !== 'data' && m.content}
                        {m.role === 'data' && (
                            <>
                                {(m.data as any).description}
                                <br />
                                <pre className="bg-gray-200">
                                    {JSON.stringify(m.data, null, 2)}
                                </pre>
                            </>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {status === 'in_progress' && <div className="loading">Loading...</div>}
            <form
                className="input-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitMessage();
                }}
            >
                <input
                    className="input-field"
                    disabled={status !== 'awaiting_message'}
                    value={input}
                    placeholder="Type your message here..."
                    onChange={handleInputChange}
                />
                <button type="submit" className="send-button" disabled={status !== 'awaiting_message'}>
                    Send
                </button>
            </form>
            <style jsx>{`
                .chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .messages {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                    background-color: #f9f9f9;
                }
                .message {
                    margin-bottom: 16px;
                }
                .message.user {
                    text-align: right;
                }
                .message.assistant {
                    text-align: left;
                }
                .loading {
                    text-align: center;
                    padding: 16px;
                    background-color: #fff;
                }
                .input-form {
                    display: flex;
                    padding: 16px;
                    background-color: #fff;
                    border-top: 1px solid #ccc;
                }
                .input-field {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-right: 8px;
                }
                .send-button {
                    padding: 8px 16px;
                    border: none;
                    background-color: #007bff;
                    color: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .send-button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
    */
}