// // import React, { useEffect } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import Navbar from "./components/Navbar.jsx";
// // import Home from "./pages/Home.jsx";
// // import About from "./pages/About.jsx";
// // import Footer from "./components/Footer.jsx";
// // import Shops from "./pages/Shops.jsx";
// // import RegisterShop from "./pages/Register-Shop.jsx";
// // import ChatbotIcon from "./components/ChatbotIcon.jsx";
// // import Chatbot from "./pages/ChatBot.jsx";
// // import EWasteTypesIcon from "./components/EWasteTypesIcon.jsx";
// // import EWasteTypes from "./pages/EWasteTypes.jsx";
// // import { generateToken , messaging } from "./config/firebase.js";
// // import { onMessage } from "firebase/messaging";
// // import Login from "./pages/Login.jsx";
// // import Profile from "./pages/Profile.jsx";


// // function App() {

// //     useEffect(() => {
// //     if ('serviceWorker' in navigator) {
// //       navigator.serviceWorker
// //         .register('/firebase-messaging-sw.js')
// //         .then((registration) => {
// //           console.log('Service Worker registered:', registration);
// //         })
// //         .catch(console.error);
// //     }
// //   }, []);


// //   useEffect(()=>{
// //     generateToken();
// //     onMessage(messaging,(payload)=>{
// //       console.log("payload🫠",payload)
// //     } )
// //   },[])


// //   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         {/* <Route path="/" element={<Home />} /> */}
// //         <Route path="/about" element={<About />} />
// //         <Route  path = "/" element= {<Home/>}/>
// //         <Route path="/shops" element={<Shops/>}/>
// //         <Route path="/register-shop" element={<RegisterShop/>}/>
// //         <Route path="/chatbot" element={<Chatbot/>} />
// //         <Route path="/e-waste-types" element={<EWasteTypes/>} />
// //         <Route path="/login" element={<Login/>}></Route>
// //         <Route path="/profile" element={<Profile/>} />
// //       </Routes>
// //       <Footer />
// //       <ChatbotIcon/>
// //       <EWasteTypesIcon/>
// //     </Router>
// //   );
// // }

// // export default App;
// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Footer from "./components/Footer.jsx";
// import Shops from "./pages/Shops.jsx";
// import RegisterShop from "./pages/Register-Shop.jsx";
// import ChatbotIcon from "./components/ChatbotIcon.jsx";
// import Chatbot from "./pages/ChatBot.jsx";
// import EWasteTypesIcon from "./components/EWasteTypesIcon.jsx";
// import EWasteTypes from "./pages/EWasteTypes.jsx";
// import { generateToken , messaging } from "./config/firebase.js";
// import { onMessage } from "firebase/messaging";
// import Login from "./pages/Login.jsx";
// import Profile from "./pages/Profile.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import ProtectedRoute

// function App() {

//     useEffect(() => {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker
//         .register('/firebase-messaging-sw.js')
//         .then((registration) => {
//           console.log('Service Worker registered:', registration);
//         })
//         .catch(console.error);
//     }
//   }, []);


//   useEffect(()=>{
//     generateToken();
//     onMessage(messaging,(payload)=>{
//       console.log("payload🫠",payload)
//     } )
//   },[])


//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/about" element={<About />} />
//         <Route path="/" element={<Home/>}/>
//         <Route path="/shops" element={<Shops/>}/>
//         <Route path="/register-shop" element={<RegisterShop/>}/>
//         <Route path="/chatbot" element={<Chatbot/>} />
//         <Route path="/e-waste-types" element={<EWasteTypes/>} />
//         <Route path="/login" element={<Login/>} />
        
//         {/* Protected Route - Only accessible after login */}
//         <Route 
//             path="/profile" 
//             element={
//                 <ProtectedRoute>
//                     <Profile />
//                 </ProtectedRoute>
//             } 
//         />
//       </Routes>
//       <Footer />
//       <ChatbotIcon/>
//       <EWasteTypesIcon/>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"; // Make sure this path is correct

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Shops from "./pages/Shops.jsx";
import RegisterShop from "./pages/Register-Shop.jsx";
import ChatbotIcon from "./components/ChatbotIcon.jsx";
import Chatbot from "./pages/ChatBot.jsx";
import EWasteTypesIcon from "./components/EWasteTypesIcon.jsx";
import EWasteTypes from "./pages/EWasteTypes.jsx";
// import { generateToken, messaging } from "./config/firebase.js";
// import { onMessage } from "firebase/messaging";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyShop from "./pages/MyShop.jsx";
import VerifyShops from "./pages/VerifyShops.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/firebase-messaging-sw.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered:', registration);
  //       })
  //       .catch(console.error);
  //   }
  // }, []);

  useEffect(() => {
    // generateToken();
    // onMessage(messaging, (payload) => {
    //   console.log("payload🫠", payload);
    // });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/register-shop" element={<RegisterShop />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/e-waste-types" element={<EWasteTypes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route 
                  path="/verify-shops" 
                  element={
                    <AdminRoute>
                      <VerifyShops />
                    </AdminRoute>
                  } 
                />
          <Route 
          path="/verify-shops" 
          element={
            
              <VerifyShops />
            
          } 
        />
          
          
          {/* Protected Route - Only accessible after login */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-shops" 
            element={
              <ProtectedRoute>
                <MyShop />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
        <ChatbotIcon />
        <EWasteTypesIcon />
      </Router>
    </Provider>
  );
}

export default App;