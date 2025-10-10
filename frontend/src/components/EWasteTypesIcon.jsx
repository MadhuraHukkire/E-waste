// components/EWasteTypesIcon.jsx
import React from 'react';
import { FaLaptop, FaMobile, FaTv } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EWasteTypesIcon = () => {
  const navigate = useNavigate();

  const handleEWasteTypesClick = () => {
    navigate('/e-waste-types');
  };

  return (
    <button
      onClick={handleEWasteTypesClick}
      className="fixed bottom-28 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl z-40 flex items-center justify-center transition-all duration-300 group"
      aria-label="Learn about E-Waste Types"
    >
      <div className="relative">
        <div className="flex items-center justify-center">
          <FaLaptop className="text-white text-xl" />
          <FaMobile className="text-white text-lg absolute -top-1 -right-1" />
        </div>
        
        {/* Ping animation */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></span>
        
        {/* Tooltip on hover */}
        <div className="absolute -top-8 -left-20 bg-white text-blue-600 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="flex items-center space-x-2 text-sm font-semibold">
            <FaTv className="text-xs" />
            <span>E-Waste Types</span>
          </div>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45"></div>
        </div>
      </div>
    </button>
  );
};

export default EWasteTypesIcon;