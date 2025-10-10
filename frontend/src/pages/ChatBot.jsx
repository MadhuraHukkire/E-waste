// // import React, { useState, useRef, useEffect } from 'react';
// // import { FaRobot, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';
// // import { API } from '../config/api';

// // const predefinedResponses = [
// //   {
// //     keywords: ['hello', 'hi', 'hey'],
// //     response: "Hello! I'm EcoBot, your e-waste management assistant. I can help you find recycling centers, understand disposal methods, or learn about environmental impact."
// //   },
// //   {
// //     keywords: ['recycl', 'center', 'location'],
// //     response: "You can find verified e-waste recycling centers on our 'Find Shops' page. All shops are approved by our admin team and show ratings, services, and locations."
// //   },
// //   {
// //     keywords: ['shop', 'store', 'business'],
// //     response: "Browse all verified e-waste shops on our platform. Each shop shows services offered, contact information, and customer ratings. Go to the Shops page to explore!"
// //   },
// //   {
// //     keywords: ['register', 'add shop', 'verify'],
// //     response: "To register your e-waste shop, visit the 'Register Shop' page. Fill out the application form with your details, and our admin team will verify your business within 24-48 hours."
// //   },
// //   {
// //     keywords: ['reminder', 'alert', 'notification'],
// //     response: "Set up smart reminders for e-waste disposal in the Reminders section. We'll notify you when it's time to responsibly dispose of your electronics based on your schedule."
// //   },
// //   {
// //     keywords: ['environment', 'impact', 'benefit'],
// //     response: "Proper e-waste management prevents toxic substances (lead, mercury) from contaminating soil/water, conserves valuable resources, reduces energy consumption, and supports circular economy."
// //   },
// //   {
// //     keywords: ['service', 'offer', 'provide'],
// //     response: "Our verified shops typically offer: Mobile Repair, Laptop Refurbishing, Battery Recycling, Data Destruction, Component Recovery, and Safe Disposal services."
// //   },
// //   {
// //     keywords: ['price', 'cost', 'fee'],
// //     response: "Pricing varies by service and shop. Please contact the specific recycling center directly for accurate pricing information. You can find their contact details on their shop page."
// //   },
// //   {
// //     keywords: ['thank', 'thanks'],
// //     response: "You're welcome! I'm always here to help with your e-waste management needs. Feel free to ask anything else!"
// //   },
// // ];

// // const Chatbot = () => {
// //   const navigate = useNavigate();
// //   const messagesEndRef = useRef(null);
// //   const [messages, setMessages] = useState([
// //     { 
// //       text: "Hello! I'm EcoBot, your e-waste management assistant. How can I help you today?", 
// //       isBot: true,
// //       timestamp: new Date()
// //     }
// //   ]);
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [isTyping, setIsTyping] = useState(false);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   // Check predefined responses
// //   const getPredefinedResponse = (message) => {
// //     const lower = message.toLowerCase();
// //     for (let item of predefinedResponses) {
// //       if (item.keywords.some(k => lower.includes(k))) {
// //         return item.response;
// //       }
// //     }
// //     return null;
// //   };

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (inputMessage.trim() === '') return;

// //     // Add user message
// //     const userMessage = { text: inputMessage, isBot: false, timestamp: new Date() };
// //     setMessages(prev => [...prev, userMessage]);
// //     setInputMessage('');

// //     // Check predefined responses first
// //     const predefined = getPredefinedResponse(userMessage.text);
// //     if (predefined) {
// //       setMessages(prev => [
// //         ...prev,
// //         { text: predefined, isBot: true, timestamp: new Date() }
// //       ]);
// //     } else {
// //       // Otherwise, call AI
// //       await handleOpenAiResponse(userMessage.text);
// //     }
// //   };

// //   const handleOpenAiResponse = async (message) => {
// //     try {
// //       setIsTyping(true);

// //       const res = await fetch(API.message_chat, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt: message })
// //       });

// //       const data = await res.json();
// //       setMessages(prev => [
// //         ...prev,
// //         { text: data.reply.content, isBot: true, timestamp: new Date() }
// //       ]);

// //     } catch (error) {
// //       console.log(error);
// //       setMessages(prev => [
// //         ...prev,
// //         { text: "Sorry, something went wrong. Please try again.", isBot: true, timestamp: new Date() }
// //       ]);
// //     } finally {
// //       setIsTyping(false);
// //     }
// //   };

// //   const formatTime = (timestamp) => {
// //     return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
// //       <div className="max-w-4xl mx-auto px-4">
// //         {/* Header */}
// //         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-4">
// //               <button 
// //                 onClick={() => navigate(-1)}
// //                 className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition duration-300"
// //               >
// //                 <FaArrowLeft />
// //               </button>
// //               <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
// //                 <FaRobot className="text-white text-2xl" />
// //               </div>
// //               <div>
// //                 <h1 className="text-3xl font-bold text-gray-800">EcoBot Assistant</h1>
// //                 <p className="text-gray-600">Your e-waste management expert</p>
// //               </div>
// //             </div>
// //             <div className="text-right">
// //               <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
// //                 Online
// //               </div>
// //               <p className="text-gray-500 text-sm mt-1">Always here to help</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Chat Container */}
// //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //           {/* Messages Area */}
// //           <div className="h-96 overflow-y-auto p-6 bg-gray-50">
// //             <div className="space-y-4">
// //               {messages.map((message, index) => (
// //                 <div
// //                   key={index}
// //                   className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
// //                 >
// //                   <div
// //                     className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
// //                       message.isBot
// //                         ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
// //                         : 'bg-green-600 text-white rounded-tr-none'
// //                     }`}
// //                   >
// //                     <div className="whitespace-pre-line">{message.text}</div>
// //                     <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-green-200'}`}>
// //                       {formatTime(message.timestamp)}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //               {isTyping && (
// //                 <div className="flex justify-start">
// //                   <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none italic">
// //                     EcoBot is typing...
// //                   </div>
// //                 </div>
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
// //           </div>

// //           {/* Input Area */}
// //           <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
// //             <div className="flex space-x-4">
// //               <input
// //                 type="text"
// //                 value={inputMessage}
// //                 onChange={(e) => setInputMessage(e.target.value)}
// //                 placeholder="Type your e-waste question here..."
// //                 className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               />
// //               <button
// //                 type="submit"
// //                 className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-700 transition duration-300"
// //               >
// //                 <FaPaperPlane className="text-sm" />
// //               </button>
// //             </div>
// //             <p className="text-center text-gray-500 text-sm mt-3">
// //               Ask about recycling, shops, registration, or environmental impact
// //             </p>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chatbot;
// // pages/Chatbot.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { FaRobot, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { API } from '../config/api';

// const predefinedResponses = [
//   { keywords: ['hello', 'hi', 'hey'], response: "Hello! I'm EcoBot, your e-waste management assistant. I can help you find recycling centers, understand disposal methods, or learn about environmental impact." },
//   { keywords: ['recycl', 'center', 'location'], response: "You can find verified e-waste recycling centers on our 'Find Shops' page. All shops are approved by our admin team and show ratings, services, and locations." },
//   { keywords: ['shop', 'store', 'business'], response: "Browse all verified e-waste shops on our platform. Each shop shows services offered, contact information, and customer ratings. Go to the Shops page to explore!" },
//   { keywords: ['register', 'add shop', 'verify'], response: "To register your e-waste shop, visit the 'Register Shop' page. Fill out the application form with your details, and our admin team will verify your business within 24-48 hours." },
//   { keywords: ['reminder', 'alert', 'notification'], response: "Set up smart reminders for e-waste disposal in the Reminders section. We'll notify you when it's time to responsibly dispose of your electronics based on your schedule." },
//   { keywords: ['environment', 'impact', 'benefit'], response: "Proper e-waste management prevents toxic substances (lead, mercury) from contaminating soil/water, conserves valuable resources, reduces energy consumption, and supports circular economy." },
//   { keywords: ['service', 'offer', 'provide'], response: "Our verified shops typically offer: Mobile Repair, Laptop Refurbishing, Battery Recycling, Data Destruction, Component Recovery, and Safe Disposal services." },
//   { keywords: ['price', 'cost', 'fee'], response: "Pricing varies by service and shop. Please contact the specific recycling center directly for accurate pricing information. You can find their contact details on their shop page." },
//   { keywords: ['thank', 'thanks'], response: "You're welcome! I'm always here to help with your e-waste management needs. Feel free to ask anything else!" },
// ];

// const Chatbot = () => {
//   const navigate = useNavigate();
//   const messagesEndRef = useRef(null);
//   const previousLengthRef = useRef(0);

//   const [messages, setMessages] = useState([
//     { text: "Hello! I'm EcoBot, your e-waste management assistant. How can I help you today?", isBot: true, timestamp: new Date() }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   // Scroll only when new messages are added
//   useEffect(() => {
//     if (messages.length > previousLengthRef.current) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//     previousLengthRef.current = messages.length;
//   }, [messages]);

//   // Check predefined responses
//   const getPredefinedResponse = (message) => {
//     const lower = message.toLowerCase();
//     for (let item of predefinedResponses) {
//       if (item.keywords.some(k => lower.includes(k))) {
//         return item.response;
//       }
//     }
//     return null;
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (inputMessage.trim() === '') return;

//     const userMessage = { text: inputMessage, isBot: false, timestamp: new Date() };
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');

//     // Check predefined responses first
//     const predefined = getPredefinedResponse(userMessage.text);
//     if (predefined) {
//       setMessages(prev => [...prev, { text: predefined, isBot: true, timestamp: new Date() }]);
//     } else {
//       await handleOpenAiResponse(userMessage.text);
//     }
//   };

//   const handleOpenAiResponse = async (message) => {
//     try {
//       setIsTyping(true);
//       const res = await fetch(API.message_chat, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: message })
//       });
//       const data = await res.json();
//       setMessages(prev => [...prev, { text: data.reply.content, isBot: true, timestamp: new Date() }]);
//     } catch (error) {
//       console.error(error);
//       setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", isBot: true, timestamp: new Date() }]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const formatTime = (timestamp) => timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button onClick={() => navigate(-1)} className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition duration-300">
//                 <FaArrowLeft />
//               </button>
//               <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
//                 <FaRobot className="text-white text-2xl" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-800">EcoBot Assistant</h1>
//                 <p className="text-gray-600">Your e-waste management expert</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Online</div>
//               <p className="text-gray-500 text-sm mt-1">Always here to help</p>
//             </div>
//           </div>
//         </div>

//         {/* Chat Container */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="h-96 overflow-y-auto p-6 bg-gray-50">
//             <div className="space-y-4">
//               {messages.map((message, idx) => (
//                 <div key={idx} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
//                   <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.isBot ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none' : 'bg-green-600 text-white rounded-tr-none'}`}>
//                     {/* <div className="whitespace-pre-line">{message.text}</div> */}
//                     <div>
//                       {message.text.split('\n').map((line, i) => {
//                         const boldMatch = line.match(/\*\*(.*?)\*\*/); // detect bold headings
//                         if (boldMatch) {
//                           return (
//                             <p key={i} className="font-bold mt-1">
//                               {boldMatch[1]}: <span className="font-normal">{line.replace(boldMatch[0], '')}</span>
//                             </p>
//                           );
//                         } else if (line.startsWith('* ')) {
//                           // detect bullet points
//                           return (
//                             <p key={i} className="ml-4 list-disc before:content-['•']">
//                               {line.replace('* ', '')}
//                             </p>
//                           );
//                         } else {
//                           return <p key={i}>{line}</p>;
//                         }
//                       })}
//                     </div>

//                     <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-green-200'}`}>{formatTime(message.timestamp)}</div>
//                   </div>
//                 </div>
//               ))}
//               {isTyping && (
//                 <div className="flex justify-start">
//                   <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none italic">
//                     EcoBot is typing...
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Input Area */}
//           <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
//             <div className="flex space-x-4">
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 placeholder="Type your e-waste question here..."
//                 className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//               <button type="submit" className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-700 transition duration-300">
//                 <FaPaperPlane className="text-sm" />
//               </button>
//             </div>
//             <p className="text-center text-gray-500 text-sm mt-3">Ask about recycling, shops, registration, or environmental impact</p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API } from '../config/api';

const predefinedResponses = [
  { keywords: ['hello', 'hi', 'hey'], response: "Hello! I'm EcoBot, your e-waste management assistant. I can help you find recycling centers, understand disposal methods, or learn about environmental impact." },
  { keywords: ['recycl', 'center', 'location'], response: "You can find verified e-waste recycling centers on our 'Find Shops' page. All shops are approved by our admin team and show ratings, services, and locations." },
  { keywords: ['shop', 'store', 'business'], response: "Browse all verified e-waste shops on our platform. Each shop shows services offered, contact information, and customer ratings. Go to the Shops page to explore!" },
  { keywords: ['register', 'add shop', 'verify'], response: "To register your e-waste shop, visit the 'Register Shop' page. Fill out the application form with your details, and our admin team will verify your business within 24-48 hours." },
  { keywords: ['reminder', 'alert', 'notification'], response: "Set up smart reminders for e-waste disposal in the Reminders section. We'll notify you when it's time to responsibly dispose of your electronics based on your schedule." },
  { keywords: ['environment', 'impact', 'benefit'], response: "Proper e-waste management prevents toxic substances (lead, mercury) from contaminating soil/water, conserves valuable resources, reduces energy consumption, and supports circular economy." },
  { keywords: ['service', 'offer', 'provide'], response: "Our verified shops typically offer: Mobile Repair, Laptop Refurbishing, Battery Recycling, Data Destruction, Component Recovery, and Safe Disposal services." },
  { keywords: ['price', 'cost', 'fee'], response: "Pricing varies by service and shop. Please contact the specific recycling center directly for accurate pricing information. You can find their contact details on their shop page." },
  { keywords: ['thank', 'thanks'], response: "You're welcome! I'm always here to help with your e-waste management needs. Feel free to ask anything else!" },
];

const Chatbot = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const previousLengthRef = useRef(0);

  const [messages, setMessages] = useState([
    { text: "Hello! I'm EcoBot, your e-waste management assistant. How can I help you today?", isBot: true, timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Scroll only when new messages are added
  useEffect(() => {
    if (messages.length > previousLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    previousLengthRef.current = messages.length;
  }, [messages]);

  // Check predefined responses
  const getPredefinedResponse = (message) => {
    const lower = message.toLowerCase();
    for (let item of predefinedResponses) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.response;
      }
    }
    return null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Check predefined responses first
    const predefined = getPredefinedResponse(userMessage.text);
    if (predefined) {
      setMessages(prev => [...prev, { text: predefined, isBot: true, timestamp: new Date() }]);
    } else {
      await handleOpenAiResponse(userMessage.text);
    }
  };

  const handleOpenAiResponse = async (message) => {
    try {
      setIsTyping(true);
      const res = await fetch(API.message_chat, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply.content, isBot: true, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", isBot: true, timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp) => timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <button onClick={() => navigate(-1)} className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition duration-300">
                <FaArrowLeft />
              </button>
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <FaRobot className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">EcoBot Assistant</h1>
                <p className="text-gray-600 text-sm sm:text-base hidden sm:block">Your e-waste management expert</p>
              </div>
            </div>
            <div className=" hidden sm:block">
              <div className="bg-green-100 text-green-800 px-3 py-1  rounded-full text-sm font-semibold">Online</div>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-[calc(100vh-200px)] sm:h-96 overflow-y-auto p-4 sm:p-6 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div key={idx} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] sm:max-w-md px-4 py-3 rounded-2xl ${message.isBot ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none' : 'bg-green-600 text-white rounded-tr-none'}`}>
                    <div>
                      {message.text.split('\n').map((line, i) => {
                        const boldMatch = line.match(/\*\*(.*?)\*\*/); // detect bold headings
                        if (boldMatch) {
                          return (
                            <p key={i} className="font-bold mt-1">
                              {boldMatch[1]}: <span className="font-normal">{line.replace(boldMatch[0], '')}</span>
                            </p>
                          );
                        } else if (line.startsWith('* ')) {
                          return (
                            <p key={i} className="ml-4 list-disc before:content-['•']">
                              {line.replace('* ', '')}
                            </p>
                          );
                        } else {
                          return <p key={i}>{line}</p>;
                        }
                      })}
                    </div>
                    <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-green-200'}`}>{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] sm:max-w-md px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none italic">
                    EcoBot is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your e-waste question here..."
                className="w-full sm:flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button type="submit" className="bg-green-600 text-white rounded-full w-full sm:w-12 h-12 flex items-center justify-center hover:bg-green-700 transition duration-300">
                <FaPaperPlane className="text-sm" />
              </button>
            </div>
            <p className="text-center text-gray-500 text-sm mt-3">Ask about recycling, shops, registration, or environmental impact</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
