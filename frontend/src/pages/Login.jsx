// // // Login.jsx
// // import React from "react";
// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { loginUser } from "../store/userSlice";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //     const [email, setEmail] = useState("")
// //     const [password, setPassword] = useState("")

// //     // FIX: Add parentheses around the state selector
// //     const { loading, error } = useSelector((state) => state.user)
// //     const dispatch = useDispatch()
// //     const navigate = useNavigate()

// //     const handleLoginEvent = (e) => {
// //         e.preventDefault()
// //         let userCredentials = {
// //             email,
// //             password
// //         }
        
// //         // FIX: Use .then() instead of .the()
// //         dispatch(loginUser(userCredentials)).then((result) => {
// //             if (result.payload) {
// //                 setEmail("")
// //                 setPassword("")
// //                 navigate("/profile")
// //             }
// //         }).catch((error) => {
// //             console.log("Login error:", error)
// //         })
// //     }

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-md w-full space-y-8">
// //                 <div>
// //                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// //                         Sign in to your account
// //                     </h2>
// //                 </div>
// //                 <form className="mt-8 space-y-6" onSubmit={handleLoginEvent}>
// //                     <div className="rounded-md shadow-sm -space-y-px">
// //                         <div>
// //                             <label htmlFor="email" className="sr-only">Email address</label>
// //                             <input 
// //                                 id="email"
// //                                 name="email" 
// //                                 type="email" 
// //                                 autoComplete="email" 
// //                                 required 
// //                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// //                                 placeholder="Email address" 
// //                                 value={email} 
// //                                 onChange={(e) => setEmail(e.target.value)} 
// //                             />
// //                         </div>
// //                         <div>
// //                             <label htmlFor="password" className="sr-only">Password</label>
// //                             <input 
// //                                 id="password"
// //                                 name="password" 
// //                                 type="password" 
// //                                 autoComplete="current-password" 
// //                                 required 
// //                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// //                                 placeholder="Password" 
// //                                 value={password} 
// //                                 onChange={(e) => setPassword(e.target.value)} 
// //                             />
// //                         </div>
// //                     </div>

// //                     {error && (
// //                         <div className="rounded-md bg-red-50 p-4">
// //                             <div className="text-sm text-red-700">{error}</div>
// //                         </div>
// //                     )}

// //                     <div>
// //                         <button 
// //                             type="submit"
// //                             disabled={loading}
// //                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //                         >
// //                             {loading ? (
// //                                 <span>Logging in...</span>
// //                             ) : (
// //                                 <span>Sign in</span>
// //                             )}
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearError } from "../store/userSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const { loading, error, user } = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Clear error when component mounts
//     useEffect(() => {
//         dispatch(clearError());
//     }, [dispatch]);

//     // Redirect if user is already logged in
//     useEffect(() => {
//         if (user) {
//             navigate("/profile");
//         }
//     }, [user, navigate]);

//     const handleLoginEvent = async (e) => {
//         e.preventDefault();
        
//         if (!email || !password) {
//             dispatch(clearError());
//             return;
//         }

//         let userCredentials = {
//             email,
//             password
//         };
        
//         try {
//             const result = await dispatch(loginUser(userCredentials)).unwrap();
//             if (result.success) {
//                 setEmail("");
//                 setPassword("");
//                 navigate("/profile");
//             }
//         } catch (error) {
//             console.log("Login error:", error);
//             // Error is already handled in the slice
//         }
//     };
//      const from = location.state?.from || "/profile";
//   const message = location.state?.message;
//     const handleLoginSuccess = () => {
//     navigate(from, { replace: true });
//   };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         Sign in to your account
//                     </h2>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleLoginEvent}>
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div>
//                             <label htmlFor="email" className="sr-only">Email address</label>
//                             <input 
//                                 id="email"
//                                 name="email" 
//                                 type="email" 
//                                 autoComplete="email" 
//                                 required 
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder="Email address" 
//                                 value={email} 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="sr-only">Password</label>
//                             <input 
//                                 id="password"
//                                 name="password" 
//                                 type="password" 
//                                 autoComplete="current-password" 
//                                 required 
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder="Password" 
//                                 value={password} 
//                                 onChange={(e) => setPassword(e.target.value)} 
//                             />
//                         </div>
//                     </div>

//                     {error && (
//                         <div className="rounded-md bg-red-50 p-4">
//                             <div className="text-sm text-red-700">{error}</div>
//                         </div>
//                     )}

//                     <div>
//                         <button 
//                             type="submit"
//                             disabled={loading}
//                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//                         >
//                             {loading ? (
//                                 <span>Logging in...</span>
//                             ) : (
//                                 <span>Sign in</span>
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/userSlice";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Added useLocation hook

    // Clear error when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            const from = location.state?.from || "/profile";
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleLoginEvent = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            dispatch(clearError());
            return;
        }

        let userCredentials = {
            email,
            password
        };
        
        try {
            const result = await dispatch(loginUser(userCredentials)).unwrap();
            if (result.success) {
                setEmail("");
                setPassword("");
                // Navigation is handled by the useEffect above
            }
        } catch (error) {
            console.log("Login error:", error);
            // Error is already handled in the slice
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    {/* Show redirect message if available */}
                    {location.state?.message && (
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-blue-700 text-sm text-center">
                                {location.state.message}
                            </p>
                        </div>
                    )}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLoginEvent}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input 
                                id="email"
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password"
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    <div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? (
                                <span>Logging in...</span>
                            ) : (
                                <span>Sign in</span>
                            )}
                        </button>
                    </div>

                    {/* Additional signup link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a 
                                href="/signup" 
                                className="font-medium text-green-600 hover:text-green-500"
                            >
                                Sign up here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;