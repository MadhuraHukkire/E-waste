// src/config/api.js



export const API = {
  GET_SHOPS: `${import.meta.env.VITE_BASEURL}/api/shops/get-shops`,
  ADD_SHOP : `${import.meta.env.VITE_BASEURL}/api/shops/addShop`,
  message_chat : `${import.meta.env.VITE_BASEURL}/api/ai/chat`,
  SAVE_FCM_TOKEN : `${import.meta.env.VITE_BASEURL}/api/notification/save-fcm-token`,
  USER_LOGIN : `${import.meta.env.VITE_BASEURL}/api/user/login`,
  USER_Profile : `${import.meta.env.VITE_BASEURL}/api/user/profile`,
  REFRESH_TOKEN: `${import.meta.env.VITE_BASEURL}/api/users/refresh-token`,
  USER_LOGOUT: `${import.meta.env.VITE_BASEURL}/api/user/logout`,
  GET_MY_SHOPS : `${import.meta.env.VITE_BASEURL}/api/shops/get-my-shops`,
  SEARCH_SHOPS: `${import.meta.env.VITE_BASEURL}/api/shops/search`,
  
  GET_PENDING_SHOPS: `${import.meta.env.VITE_BASEURL}/api/shops/pending-shops`,
  APPROVE_SHOP: `${import.meta.env.VITE_BASEURL}/api/shops/approve-shop`,
  REJECT_SHOP: `${import.meta.env.VITE_BASEURL}/api/shops/reject-shop`,
  SIGN_UP : `${import.meta.env.VITE_BASEURL}/api/user/register`
};

