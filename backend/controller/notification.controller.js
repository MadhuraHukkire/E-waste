import admin from "../config/firebaseAdmin.js";
import TokenModel from '../models/fcmtoken.model.js';
import notificationScheduler from '../services/notificationScheduler.js';





export const saveTokenController = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ success: false, error: true, message: "Token is required" });

    // Only create if it doesn't exist
    await TokenModel.updateOne(
      { token },          // filter
      { token },          // data to insert
      { upsert: true }    // insert if not exists
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Token saved successfully"
    });
  } catch (error) {
    console.error("Error saving token:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// export const sendNotificationController = async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     if (!title || !body) return res.status(400).json({ message: "Title & body required" });

//     const tokens = await TokenModel.find().distinct("token");
//     if (!tokens.length) return res.status(404).json({ message: "No tokens found" });

//     // Method 1: Using sendMulticast (Firebase Admin SDK v9+)
//     try {
//       const message = {
//         notification: { title, body },
//         tokens,
//       };

//       const response = await admin.messaging().sendMulticast(message);
      
//       return res.json({
//         success: true,
//         sent: response.successCount,
//         failed: response.failureCount,
//         response: response.responses
//       });
//     } catch (multicastError) {
//       console.log("Multicast failed, trying individual sends:", multicastError.message);
      
//       // Method 2: Fallback - Send individual messages
//       const results = {
//         successCount: 0,
//         failureCount: 0,
//         errors: []
//       };

//       // Send to each token individually
//       for (const token of tokens) {
//         try {
//           const individualMessage = {
//             notification: { title, body },
//             token: token
//           };
          
//           await admin.messaging().send(individualMessage);
//           results.successCount++;
//         } catch (individualError) {
//           results.failureCount++;
//           results.errors.push({
//             token: token.substring(0, 10) + '...', // Log partial token for security
//             error: individualError.message
//           });
//         }
//       }

//       return res.json({
//         success: true,
//         sent: results.successCount,
//         failed: results.failureCount,
//         errors: results.errors
//       });
//     }

//   } catch (err) {
//     console.error("Error sending notifications:", err);
//     return res.status(500).json({ 
//       success: false, 
//       error: err.message,
//       code: err.code 
//     });
//   }
// };


export const sendNotificationController = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ message: "Title & body required" });

    const tokens = await TokenModel.find().distinct("token");
    if (!tokens.length) return res.status(404).json({ message: "No tokens found" });

    // Try sendEachForMulticast first
    try {
      const message = {
        notification: { title, body },
        tokens,
      };

      const response = await messaging.sendEachForMulticast(message);
      
      return res.json({
        success: true,
        sent: response.successCount,
        failed: response.failureCount,
        response: response.responses
      });
    } catch (multicastError) {
      console.log("Multicast failed, trying individual sends:", multicastError.message);
      
      // Fallback to individual messages
      const results = {
        successCount: 0,
        failureCount: 0,
        errors: []
      };

      for (const token of tokens) {
        try {
          const individualMessage = {
            notification: { title, body },
            token: token
          };
          
          await messaging.send(individualMessage);
          results.successCount++;
        } catch (individualError) {
          results.failureCount++;
          results.errors.push({
            token: token.substring(0, 10) + '...',
            error: individualError.message
          });
        }
      }

      return res.json({
        success: true,
        sent: results.successCount,
        failed: results.failureCount,
        errors: results.errors
      });
    }

  } catch (err) {
    console.error("Error sending notifications:", err);
    return res.status(500).json({ 
      success: false, 
      error: err.message,
      code: err.code 
    });
  }
};
export const triggerHourlyNotificationController = async (req, res) => {
  try {
    console.log('🔔 Manually triggering hourly notification...');
    
    // Call the scheduler's method directly
    await notificationScheduler.sendHourlyNotifications();
    
    return res.json({
      success: true,
      message: 'Hourly notification triggered manually'
    });

  } catch (error) {
    console.error('Error in manual trigger:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get scheduler status - FIXED VERSION
export const getSchedulerStatusController = async (req, res) => {
  try {
    const userCount = await TokenModel.countDocuments();
    const schedulerStatus = notificationScheduler.getStatus();
    
    return res.json({
      success: true,
      schedulerStatus: schedulerStatus,
      totalUsers: userCount,
      message: 'Scheduler status retrieved successfully'
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Start/stop scheduler - FIXED VERSION
export const controlSchedulerController = async (req, res) => {
  try {
    const { action } = req.body; // 'start' or 'stop'
    
    if (action === 'start') {
      notificationScheduler.start();
      return res.json({ success: true, message: 'Scheduler started' });
    } else if (action === 'stop') {
      notificationScheduler.stop();
      return res.json({ success: true, message: 'Scheduler stopped' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};