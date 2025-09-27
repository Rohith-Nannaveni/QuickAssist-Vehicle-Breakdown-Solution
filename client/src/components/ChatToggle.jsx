import React, { useState } from 'react';
import ChatBotApp from './ChatBotApp';

const ChatToggle = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleNewChat = (inputValue) => {
    const newChat = {
      id: Date.now(),
      messages: [{ type: 'prompt', text: inputValue, timestamp: new Date().toLocaleTimeString() }],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChat(newChat.id);
  };

  return (
    <>
      {!isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#0056ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 9999,
          }}
          onClick={() => setIsChatOpen(true)}
        >
          💬
        </div>
      )}

      {isChatOpen && (
        <ChatBotApp
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={handleNewChat}
          closeChat={() => setIsChatOpen(false)} // Pass a close function to hide widget
        />
      )}
    </>
  );
};

export default ChatToggle;
