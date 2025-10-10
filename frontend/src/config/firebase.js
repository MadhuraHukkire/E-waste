// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken } from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBXT9f9VFGQ2wT0LwhIdSifUv-mOm9Y0dg",
//   authDomain: "e-waste-connect-8dd3b.firebaseapp.com",
//   projectId: "e-waste-connect-8dd3b",
//   storageBucket: "e-waste-connect-8dd3b.firebasestorage.app",
//   messagingSenderId: "757955846595",
//   appId: "1:757955846595:web:89120d3542c54cab97dd76",
//   measurementId: "G-FNB283NQXW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

// export const generateToken = async ()=>{
//     try {
//         const permission = await Notification.requestPermission();
//         console.log(permission)
//         //it shows only denied or granted
//         //the get token requires the 2 instances messaging and vapid kay that we generated
//         if(permission === "granted"){
//             const token  = await getToken(messaging , {
//             vapidKey : "BJHlVVIGm_zHc2l0R8RbV8Wqp1_YKhJ9xJ2y9YIGU706NncOWvgVaXd4nW5QiGBYjOdtPUaBIA376K-6T4zB9y0"
//         })
//         console.log("Use this token in Firebase Console → Cloud Messaging → Send test message:", token);
//         }
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// export { messaging, analytics };
// Firebase config and messaging setup
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import {API} from "../config/api.js"

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBXT9f9VFGQ2wT0LwhIdSifUv-mOm9Y0dg",
  authDomain: "e-waste-connect-8dd3b.firebaseapp.com",
  projectId: "e-waste-connect-8dd3b",
  storageBucket: "e-waste-connect-8dd3b.firebasestorage.app",
  messagingSenderId: "757955846595",
  appId: "1:757955846595:web:89120d3542c54cab97dd76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Generate FCM token
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BJHlVVIGm_zHc2l0R8RbV8Wqp1_YKhJ9xJ2y9YIGU706NncOWvgVaXd4nW5QiGBYjOdtPUaBIA376K-6T4zB9y0",
      });


      const res = await fetch(API.SAVE_FCM_TOKEN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      // Log the raw response
      console.log("Response status:", res.status, "OK:", res.ok);

      // Parse and log response JSON
      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) throw new Error("Failed to save FCM token to backend");

    }
  } catch (err) {
    console.error("FCM token error:", err);
  }
};

export { messaging };
