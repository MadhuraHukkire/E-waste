// // // import admin from "firebase-admin";
// // // import serviceAccount from "../config/e-waste-connect-8dd3b-firebase-adminsdk-fbsvc-d2c1272f92.json";

// // // // Initialize Admin SDK
// // // if (!admin.apps.length) {
// // //   admin.initializeApp({
// // //     credential: admin.credential.cert(serviceAccount),
// // //   });
// // // }

// // // export default admin;

// // import admin from "firebase-admin";
// // import fs from "fs";
// // import path from "path";

// // const __dirname = path.resolve(); // get project root

// // const serviceAccount = JSON.parse(
// //   fs.readFileSync(path.join(__dirname, "config/e-waste-connect-8dd3b-firebase-adminsdk-fbsvc-d2c1272f92.json"))
// // );

// // if (!admin.apps.length) {
// //   admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount),
// //   });
// // }

// // export default admin;
// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";

// const __dirname = path.resolve();

// // Load service account
// const serviceAccountPath = path.join(__dirname, "config/e-waste-connect-8dd3b-firebase-adminsdk-fbsvc-d2c1272f92.json");

// // Check if file exists
// if (!fs.existsSync(serviceAccountPath)) {
//   throw new Error(`Service account file not found at: ${serviceAccountPath}`);
// }

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// // Initialize Firebase Admin
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
//   console.log("Firebase Admin initialized successfully");
// }

// export default admin;


import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// Load service account
const serviceAccountPath = path.join(__dirname, "config/e-waste-connect-8dd3b-firebase-adminsdk-fbsvc-d2c1272f92.json");

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found at: ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin ONLY if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
  console.log("✅ Firebase Admin initialized successfully");
}

// Export the messaging instance directly
export const messaging = admin.messaging();
export default admin;