import { useState, useRef, useEffect } from 'react'
import { AiOutlineMessage, AiOutlineSend, AiOutlineClose } from 'react-icons/ai' // Using React Icons
import './Chatbot.css'; // Import the CSS file for styles

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [balance, setbalance] = useState(5000);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        setMessages([...messages, { text: input, isBot: false }]);
        setInput('');

        // Static responses based on keywords
        const lowercaseInput = input.toLowerCase();

        let botResponse = '';

        if (lowercaseInput.includes('balance')) {
            botResponse = "Your current account balance is 5000";
        } else if (lowercaseInput.includes('transaction history')) {
            botResponse = "Here are your last 3 transactions: \n1. 50rs to Grocery Store on 10/02/2024 \n2. $200 to Rent on 09/30/2024 \n3. $25 to Coffee Shop on 09/29/2024.";
        } else if (lowercaseInput.includes('transfer')) {
            botResponse = "To transfer funds, please provide the recipient's account number and the amount you want to transfer.";
        } else if (lowercaseInput.includes('loan')) {
            botResponse = "You are eligible for a personal loan of up to 1,50,000rs with a 5% interest rate. Would you like to proceed with the application?";
        } else if (lowercaseInput.includes('credit card')) {
            botResponse = "You have a credit card with a 50,000rs limit. Your current balance is $1,200. Would you like to make a payment?";
        } else if (lowercaseInput.includes('fraud alert')) {
            botResponse = "We have detected an unusual login attempt from a new device. Please confirm if this was you by checking your email for a verification code.";
        } else if (lowercaseInput.includes('support')) {
            botResponse = "Our customer support is available 24/7. How can we assist you today?";

        } else if (lowercaseInput.includes('hey')) {
            botResponse = "Our customer support is available 24/7. How can we assist you today?";
        } else if (lowercaseInput.includes('password recovery')) {
            botResponse = "To recover your password, please provide your registered email, and we will send you a password reset link.";
        } else if (lowercaseInput.includes('bank branches')) {
            botResponse = "we have 5 branches in Mumbai. Andheri, Borivali, Worli, Bandra, Churchgate.";
        }
        else {
            botResponse = "I'm Sorry I have no Response for Your Query."
        }

        // Simulate bot response
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: botResponse, isBot: true }]);
        }, 1000);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="bg-gray rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 chatbot-container">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                        <h2 className="text-lg font-semibold">ChatBot</h2>
                        <br />
                        <button onClick={toggleChat} className="text-white hover:bg-black-900 rounded-full p-2">
                            <AiOutlineClose className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 bg-gray-50">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`rounded-lg p-3 max-w-[80%] shadow-md ${message.isBot ? 'bg-white text-gray-800 border border-gray-200' : 'bg-blue-500 text-white'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="border-t p-4 bg-gray rounded-b-lg">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="submit" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white p-2">
                                <AiOutlineSend className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    className="rounded-full h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 p-2"
                >
                    <AiOutlineMessage className="h-6 w-6" />
                </button>
            )}
            <style jsx>{`
                .chatbot-container {
                    max-height: 600px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                }
                .chatbot-container::-webkit-scrollbar {
                    width: 8px;
                }
                .chatbot-container::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .chatbot-container::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
                .chatbot-container::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </div>
    );
}
