// import React, { useState, useEffect } from "react";
// import { 
//   FaRecycle, 
//   FaUser, 
//   FaMapMarkerAlt, 
//   FaRobot,
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaInfoCircle,
//   FaStore,
//   FaSignInAlt,
//   FaUserPlus,
//   FaEllipsisH,
//   FaSignOutAlt
// } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../store/userSlice"; // Change from 'logout' to 'logoutUser'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMoreOpen, setIsMoreOpen] = useState(false);
  
//   const { user } = useSelector((state) => state?.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Close menus when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.navbar-container')) {
//         setIsOpen(false);
//         setIsProfileOpen(false);
//         setIsMoreOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Priority navigation - always visible
//   const priorityNavigation = [
//     { name: "Home", href: "/", icon: <FaHome /> },
//     { name: "Shops", href: "/shops", icon: <FaMapMarkerAlt /> },
//     { name: "Register", href: "/register-shop", icon: <FaStore /> },
//   ];

//   // Secondary navigation - in "More" dropdown on medium screens
//   const secondaryNavigation = [
//     { name: "About", href: "/about", icon: <FaInfoCircle /> },
//     { name: "Chatbot", href: "/chatbot", icon: <FaRobot /> }
//   ];

//   // All navigation items combined
//   const allNavigation = [...priorityNavigation, ...secondaryNavigation];

//   const userNavigation = [
//     { name: "My Profile", href: "/profile" },
//     { name: "My Shops", href: "/my-shops" },
//     { name: "Settings", href: "/settings" },
//   ];

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       setIsProfileOpen(false);
//       setIsOpen(false);
//       navigate("/");
//     } catch (error) {
//       console.log("Logout error:", error);
//       // Even if API call fails, clear local state
//       setIsProfileOpen(false);
//       setIsOpen(false);
//       navigate("/");
//     }
//   };

//   // Rest of your component remains the same...
//   return (
//     <nav className="navbar-container bg-green-600 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <FaRecycle className="h-8 w-8 text-white" />
//               <span className="ml-2 text-white text-xl font-bold">E-Waste Connect</span>
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2 lg:space-x-4">
//               {/* Priority items - always visible */}
//               {priorityNavigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
//                   title={item.name}
//                 >
//                   {item.icon}
//                   <span className="ml-2 hidden xl:inline">{item.name}</span>
//                 </a>
//               ))}
              
//               {/* More dropdown for medium screens (md to xl) */}
//               <div className="hidden md:block xl:hidden relative">
//                 <button
//                   onClick={() => setIsMoreOpen(!isMoreOpen)}
//                   className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
//                   title="More options"
//                 >
//                   <FaEllipsisH />
//                 </button>

//                 {isMoreOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                     <div className="py-1">
//                       {secondaryNavigation.map((item) => (
//                         <a
//                           key={item.name}
//                           href={item.href}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 flex items-center"
//                           onClick={() => setIsMoreOpen(false)}
//                         >
//                           <span className="mr-3">{item.icon}</span>
//                           {item.name}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Secondary items - visible on xl screens and above */}
//               <div className="hidden xl:flex xl:items-center xl:space-x-4">
//                 {secondaryNavigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
//                   >
//                     {item.icon}
//                     <span className="ml-2">{item.name}</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right side items */}
//           <div className="flex items-center space-x-2 lg:space-x-4">
//             {/* Conditional rendering based on authentication */}
//             {user && user._id ? (
//               /* User Profile - Show when user IS logged in */
//               <div className="hidden md:flex md:items-center">
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="bg-green-700 hover:bg-green-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
//                     title="User Menu"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <div className="h-8 w-8 rounded-full bg-green-800 flex items-center justify-center">
//                       <FaUser className="text-white text-sm" />
//                     </div>
//                   </button>

//                   {isProfileOpen && (
//                     <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md border-none shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                       <div className="py-1">
//                         {/* User info */}
//                         <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                           <p className="font-medium">Welcome!</p>
//                           <p className="text-gray-500 truncate">{user.email || user.username}</p>
//                         </div>
                        
//                         {/* User navigation */}
//                         {userNavigation.map((item) => (
//                           <a
//                             key={item.name}
//                             href={item.href}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 flex items-center"
//                             onClick={() => setIsProfileOpen(false)}
//                           >
//                             <span className="mr-3">{item.icon}</span>
//                             {item.name}
//                           </a>
//                         ))}
                        
//                         {/* Logout button */}
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150 flex items-center border-t"
//                         >
//                           <FaSignOutAlt className="mr-3" />
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               /* Login/Signup - Show when user is NOT logged in */
//               <div className="hidden md:flex items-center space-x-2">
//                 <a
//                   href="/login"
//                   className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
//                   title="Login"
//                 >
//                   <FaSignInAlt />
//                   <span className="ml-2 hidden lg:inline">Login</span>
//                 </a>
//                 <a
//                   href="/signup"
//                   className="bg-white text-green-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
//                   title="Sign Up"
//                 >
//                   <FaUserPlus />
//                   <span className="ml-2 hidden lg:inline">Sign Up</span>
//                 </a>
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {isOpen ? (
//                   <FaTimes className="block h-6 w-6" />
//                 ) : (
//                   <FaBars className="block h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
//             {allNavigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.name}
//               </a>
//             ))}
            
//             {/* Conditional mobile login/signup or profile */}
//             {user && user._id ? (
//               /* Mobile User Menu - Show when user IS logged in */
//               <div className="border-t border-green-500 pt-4">
//                 <div className="px-3 py-2 text-sm text-green-200 font-medium mb-2">
//                   Welcome, {user.name || user.email}!
//                 </div>
//                 {userNavigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <span className="mr-3">{item.icon}</span>
//                     {item.name}
//                   </a>
//                 ))}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center border-t border-green-500 mt-2"
//                 >
//                   <FaSignOutAlt className="mr-3" />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               /* Mobile Login/Signup - Show when user is NOT logged in */
//               <div className="border-t border-green-500 pt-4">
//                 <a
//                   href="/login"
//                   className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <FaSignInAlt className="mr-3" />
//                   Login
//                 </a>
//                 <a
//                   href="/signup"
//                   className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <FaUserPlus className="mr-3" />
//                   Sign Up
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Overlay for More dropdown */}
//       {isMoreOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-0 z-40 md:hidden"
//           onClick={() => setIsMoreOpen(false)}
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { 
  FaRecycle, 
  FaUser, 
  FaMapMarkerAlt, 
  FaRobot,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaStore,
  FaSignInAlt,
  FaUserPlus,
  FaEllipsisH,
  FaSignOutAlt,
  FaCheckCircle, // Added for verify shops icon
  FaShieldAlt // Added for admin icon
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-container')) {
        setIsOpen(false);
        setIsProfileOpen(false);
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Priority navigation - always visible
  const priorityNavigation = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Shops", href: "/shops", icon: <FaMapMarkerAlt /> },
    { name: "Register", href: "/register-shop", icon: <FaStore /> },
  ];

  // Secondary navigation - in "More" dropdown on medium screens
  const secondaryNavigation = [
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Chatbot", href: "/chatbot", icon: <FaRobot /> }
  ];

  // All navigation items combined
  const allNavigation = [...priorityNavigation, ...secondaryNavigation];

  // Regular user navigation
  const userNavigation = [
    { name: "My Profile", href: "/profile", icon: <FaUser /> },
    { name: "My Shops", href: "/my-shops", icon: <FaStore /> },
    
  ];

  // Admin-only navigation
  const adminNavigation = [
    { name: "Verify Shops", href: "/verify-shops", icon: <FaCheckCircle /> },
    
  ];

  // Combine navigation based on user role
  const getUserNavigation = () => {
    if (user?.role === 'admin') {
      return [...userNavigation, ...adminNavigation];
    }
    return userNavigation;
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsProfileOpen(false);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
      // Even if API call fails, clear local state
      setIsProfileOpen(false);
      setIsOpen(false);
      navigate("/");
    }
  };

  return (
    <nav className="navbar-container bg-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <FaRecycle className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">E-Waste Connect</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2 lg:space-x-4">
              {/* Priority items - always visible */}
              {priorityNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  title={item.name}
                >
                  {item.icon}
                  <span className="ml-2 hidden xl:inline">{item.name}</span>
                </a>
              ))}
              
              {/* More dropdown for medium screens (md to xl) */}
              <div className="hidden md:block xl:hidden relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  title="More options"
                >
                  <FaEllipsisH />
                </button>

                {isMoreOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 flex items-center"
                          onClick={() => setIsMoreOpen(false)}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Secondary items - visible on xl screens and above */}
              <div className="hidden xl:flex xl:items-center xl:space-x-4">
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Admin-only navigation items (visible to admins) */}
              {user?.role === 'admin' && (
                <div className="hidden xl:flex xl:items-center xl:space-x-4">
                  <a
                    href="/admin/verify-shops"
                    className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                    title="Verify Shops"
                  >
                    <FaCheckCircle />
                    <span className="ml-2">Verify Shops</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Conditional rendering based on authentication */}
            {user && user._id ? (
              /* User Profile - Show when user IS logged in */
              <div className="hidden md:flex md:items-center">
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="bg-green-700 hover:bg-green-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                    title="User Menu"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-green-800 flex items-center justify-center relative">
                      <FaUser className="text-white text-sm" />
                      {/* Admin badge */}
                      {user?.role === 'admin' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-green-800"></div>
                      )}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md border-none shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        {/* User info */}
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Welcome!</p>
                            {user?.role === 'admin' && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <FaShieldAlt className="mr-1" />
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 truncate">{user.email || user.username}</p>
                        </div>
                        
                        {/* User navigation */}
                        {getUserNavigation().map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 flex items-center"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <span className="mr-3 text-gray-400">{item.icon}</span>
                            {item.name}
                          </a>
                        ))}
                        
                        {/* Logout button */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150 flex items-center border-t"
                        >
                          <FaSignOutAlt className="mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Login/Signup - Show when user is NOT logged in */
              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="/login"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  title="Login"
                >
                  <FaSignInAlt />
                  <span className="ml-2 hidden lg:inline">Login</span>
                </a>
                <a
                  href="/signup"
                  className="bg-white text-green-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  title="Sign Up"
                >
                  <FaUserPlus />
                  <span className="ml-2 hidden lg:inline">Sign Up</span>
                </a>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
            {allNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            ))}

            {/* Admin-only mobile navigation */}
            {user?.role === 'admin' && (
              <div className="border-t border-green-500 pt-2">
                <div className="px-3 py-2 text-sm text-yellow-200 font-medium mb-1">
                  Admin Options
                </div>
                <a
                  href="/admin/verify-shops"
                  className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <FaCheckCircle className="mr-3" />
                  Verify Shops
                </a>
                <a
                  href="/admin"
                  className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShieldAlt className="mr-3" />
                  Admin Panel
                </a>
              </div>
            )}
            
            {/* Conditional mobile login/signup or profile */}
            {user && user._id ? (
              /* Mobile User Menu - Show when user IS logged in */
              <div className="border-t border-green-500 pt-4">
                <div className="px-3 py-2 text-sm text-green-200 font-medium mb-2 flex items-center justify-between">
                  <span>Welcome, {user.name || user.email}!</span>
                  {user?.role === 'admin' && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                {getUserNavigation().map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </a>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center border-t border-green-500 mt-2"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </div>
            ) : (
              /* Mobile Login/Signup - Show when user is NOT logged in */
              <div className="border-t border-green-500 pt-4">
                <a
                  href="/login"
                  className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt className="mr-3" />
                  Login
                </a>
                <a
                  href="/signup"
                  className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserPlus className="mr-3" />
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay for More dropdown */}
      {isMoreOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-0 z-40 md:hidden"
          onClick={() => setIsMoreOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;