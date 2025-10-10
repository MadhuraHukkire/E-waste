// components/ChatbotIcon.jsx
import React from 'react';
import { FaRobot, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatbotIcon = () => {
  const navigate = useNavigate();

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  return (
    <button
      onClick={handleChatbotClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full shadow-2xl z-40 flex items-center justify-center transition-all duration-300 group"
      aria-label="Chat with EcoBot"
    >
      <div className="relative">
        <FaRobot className="text-white text-2xl" />
        
        {/* Ping animation */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
        
        {/* Speech bubble icon on hover */}
        <div className="absolute -top-8 -left-8 bg-white text-green-600 px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center space-x-1 text-xs font-semibold">
            <FaComment className="text-xs" />
            <span>Need help?</span>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
        </div>
      </div>
    </button>
  );
};

export default ChatbotIcon;