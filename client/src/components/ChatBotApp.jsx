import React, { useState, useEffect, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const ChatBotApp = () => {
  const STORAGE_KEY = 'onroad-chatbot'; // Change key per project

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatEndRef = useRef(null);
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleEmojiSelect = (emoji) => {
    setInput((prevInput) => prevInput + emoji.native);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'prompt',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
          max_tokens: 2048,
        }),
      });

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || 'I am not sure how to respond.';

      const aiMessage = {
        type: 'response',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {!isOpen && (
        <div className="chat-bubble" onClick={toggleChat}>
          💬
        </div>
      )}

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-title">
            <span>Chat Bot</span>
            <span className="close-widget" onClick={toggleChat}>✖</span>
          </div>

          <div className="chat">
            {messages.map((msg, index) => (
              <div key={index} className={msg.type === 'prompt' ? 'prompt' : 'response'}>
                {msg.text} <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
            {isTyping && <div className="typing">AI is typing...</div>}
            <div ref={chatEndRef}></div>
          </div>

          <div className="msg-form">
            <button className="emoji-btn" onClick={() => setShowEmojiPicker((prev) => !prev)}>
              😊
            </button>
            {showEmojiPicker && (
              <div className="picker">
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}

            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />

            <button onClick={sendMessage}>Send</button>
            <button className="clear-btn" onClick={clearChat}>Clear</button>
          </div>
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        /* Chat Bubble */
        .chat-bubble {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #0056ff;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Chat Widget */
        .chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 400px;
          height: 600px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 10000;
        }

        /* Chat Header */
        .chat-title {
          background: #0056ff;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        .close-widget {
          cursor: pointer;
        }

        /* Chat Body */
        .chat {
          flex-grow: 1;
          padding: 15px;
          overflow-y: auto;
          background: #f9f9f9;
        }

        .prompt {
          text-align: right;
          color: #0056ff;
          margin-bottom: 10px;
        }

        .response {
          text-align: left;
          color: #333;
          margin-bottom: 10px;
        }

        .timestamp {
          display: block;
          font-size: 12px;
          color: #888;
        }

        /* Typing Indicator */
        .typing {
          color: #888;
          padding: 5px;
          font-style: italic;
        }

        /* Chat Input */
        .msg-form {
          display: flex;
          padding: 5px;
          background: white;
          border-top: 1px solid #ddd;
        }

        .msg-form input {
          flex-grow: 1;
          padding: 3px;
          border: none;
          outline: none;
          font-size: 15px;
        }

        .msg-form button {
          padding: 10px 15px;
          margin-left: 5px;
          background: #0056ff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .emoji-btn {
          background: none;
          border: none;
          cursor: pointer;
          
          
        }

        /* Emoji Picker */
        .picker {
          position: absolute;
          bottom: 60px;
          left: 10px;
          z-index: 10001;
        }
          
      `}</style>
    </div>
  );
};

export default ChatBotApp;
