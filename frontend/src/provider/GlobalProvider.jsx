// import { createContext } from "react";
// import {useDispatch, useSelector, useNavigate} from "react-redux"
// import API from "../config/api.js"

// export const GlobalContext  = createContext(null)
// export  const useGlobalContext =()=> useContext(GlobalContext)

// const GlobalProvider = ({children}) =>{
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const user = useSelector(state =>state?.user)
//     const fetchUserProfile = async()=>{
//         try {
//             const res = await fetch(API.USER_PROFILE,{
//                 method : "GET",
//                 headers : {
//                     "Content-Type" : "application/json",
//                     "Authorization" : `Bearer ${user?.token}`
//                 }
                
//             })
//         } catch (error) {
            
//         }
//     }
// }
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logoutUser } from "../store/userSlice";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  // Auto-fetch user profile on app start if we have user in localStorage but not in state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  // Auto-refresh token mechanism
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch(API.REFRESH_TOKEN, {
          method: "POST",
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }
        
        console.log("Token refreshed successfully");
      } catch (error) {
        console.log("Token refresh failed, logging out...");
        dispatch(logoutUser());
      }
    };

    // Refresh token every 14 minutes (before 15min expiry)
    const interval = setInterval(refreshToken, 14 * 60 * 1000);

    // Initial refresh
    refreshToken();

    return () => clearInterval(interval);
  }, [dispatch]);

  const value = {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    logoutUser: () => dispatch(logoutUser())
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;