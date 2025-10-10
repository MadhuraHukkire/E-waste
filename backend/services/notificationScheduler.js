// // import cron from 'node-cron';
// // import admin from '../config/firebaseAdmin.js';
// // import TokenModel from '../models/fcmtoken.model.js';

// // class NotificationScheduler {
// //   constructor() {
// //     this.isRunning = false;
// //     this.task = null; // Store the cron task reference
// //   }

// //   // Function to send notifications to all users
// //   async sendHourlyNotifications() {
// //     try {
// //       console.log('⏰ [5-Minute Notification] Starting...');
      
// //       const tokens = await TokenModel.find().distinct("token");
      
// //       if (!tokens.length) {
// //         console.log('📭 No user tokens found');
// //         return { success: false, message: 'No tokens found' };
// //       }

// //       console.log(`📱 Found ${tokens.length} users to notify`);

// //       const message = {
// //         notification: { 
// //           title: 'E-Waste Connect ♻️',
// //           body: 'Remember to dispose of your e-waste responsibly! Help save our planet. 🌍'
// //         },
// //         tokens: tokens,
// //         android: {
// //           priority: 'high'
// //         },
// //         apns: {
// //           payload: {
// //             aps: {
// //               contentAvailable: true,
// //               badge: 1,
// //               sound: 'default'
// //             }
// //           }
// //         }
// //       };

// //       const response = await admin.messaging().sendMulticast(message);
      
// //       console.log('✅ [5-Minute Notification] Completed:', {
// //         success: response.successCount,
// //         failed: response.failureCount,
// //         total: tokens.length
// //       });

// //       // Remove invalid tokens
// //       await this.cleanupInvalidTokens(response.responses, tokens);

// //       return {
// //         success: true,
// //         sent: response.successCount,
// //         failed: response.failureCount,
// //         total: tokens.length
// //       };

// //     } catch (error) {
// //       console.error('❌ Error in 5-minute notification:', error);
// //       return { success: false, error: error.message };
// //     }
// //   }

// //   // Remove invalid tokens from database
// //   async cleanupInvalidTokens(responses, tokens) {
// //     const invalidTokens = [];
    
// //     responses.forEach((response, index) => {
// //       if (!response.success) {
// //         invalidTokens.push(tokens[index]);
// //         console.log(`❌ Invalid token: ${tokens[index].substring(0, 30)}...`);
// //       }
// //     });

// //     if (invalidTokens.length > 0) {
// //       await TokenModel.deleteMany({ token: { $in: invalidTokens } });
// //       console.log(`🧹 Removed ${invalidTokens.length} invalid tokens`);
// //     }
// //   }

// //   // Start the 5-minute scheduler - FIXED VERSION
// //   start() {
// //     if (this.isRunning) {
// //       console.log('⚠️ Scheduler is already running');
// //       return;
// //     }

// //     try {
// //       // Schedule to run every 5 minutes - STORE THE TASK REFERENCE
// //       this.task = cron.schedule('*/5 * * * *', async () => {
// //         console.log('🕐 Cron job triggered: Sending 5-minute notifications');
// //         await this.sendHourlyNotifications();
// //       }, {
// //         scheduled: true,
// //         timezone: "America/New_York" // Adjust to your timezone
// //       });

// //       this.isRunning = true;
// //       console.log('✅ 5-minute notification scheduler started');
// //       console.log('📅 Notifications will be sent every 5 minutes');
      
// //       // Send immediately on start (optional)
// //       this.sendHourlyNotifications();
      
// //     } catch (error) {
// //       console.error('❌ Failed to start scheduler:', error);
// //       this.isRunning = false;
// //     }
// //   }

// //   // Stop the scheduler - FIXED VERSION
// //   stop() {
// //     if (this.task) {
// //       this.task.stop();
// //       this.task = null;
// //     }
// //     this.isRunning = false;
// //     console.log('🛑 Notification scheduler stopped');
// //   }

// //   // Get scheduler status with more details
// //   getStatus() {
// //     return {
// //       isRunning: this.isRunning,
// //       schedule: 'Every 5 minutes',
// //       nextRuns: this.getNextRuns()
// //     };
// //   }

// //   getNextRuns() {
// //     // Simple implementation - you can enhance this with cron-parser later
// //     return 'Every 5 minutes (e.g., :00, :05, :10, etc.)';
// //   }
// // }

// // // Create single instance
// // const notificationScheduler = new NotificationScheduler();

// // export default notificationScheduler;

// import cron from 'node-cron';
// import { messaging } from '../config/firebaseAdmin.js'; // Import messaging directly
// import TokenModel from '../models/fcmtoken.model.js';

// class NotificationScheduler {
//   constructor() {
//     this.isRunning = false;
//     this.task = null;
//   }

//   async sendHourlyNotifications() {
//     try {
//       console.log('⏰ [5-Minute Notification] Starting...');
      
//       const tokens = await TokenModel.find().distinct("token");
      
//       if (!tokens.length) {
//         console.log('📭 No user tokens found');
//         return { success: false, message: 'No tokens found' };
//       }

//       console.log(`📱 Found ${tokens.length} users to notify`);

//       // METHOD 1: Try sendEachForMulticast first (available in v9+)
//       try {
//         const message = {
//           notification: { 
//             title: 'E-Waste Connect ♻️',
//             body: 'Remember to dispose of your e-waste responsibly! Help save our planet. 🌍'
//           },
//           tokens: tokens,
//         };

//         const response = await messaging.sendEachForMulticast(message);
        
//         console.log('✅ [5-Minute Notification] Completed:', {
//           success: response.successCount,
//           failed: response.failureCount,
//           total: tokens.length
//         });

//         // Clean up invalid tokens
//         await this.cleanupInvalidTokens(response.responses, tokens);

//         return {
//           success: true,
//           sent: response.successCount,
//           failed: response.failureCount,
//           total: tokens.length
//         };

//       } catch (multicastError) {
//         console.log('🔄 Multicast failed, trying individual messages...');
        
//         // METHOD 2: Fallback to individual messages
//         return await this.sendIndividualNotifications(tokens);
//       }

//     } catch (error) {
//       console.error('❌ Error in 5-minute notification:', error);
//       return { success: false, error: error.message };
//     }
//   }

//   // Send notifications individually
//   async sendIndividualNotifications(tokens) {
//     let successCount = 0;
//     let failureCount = 0;
//     const errors = [];

//     for (const token of tokens) {
//       try {
//         const message = {
//           notification: { 
//             title: 'E-Waste Connect ♻️',
//             body: 'Remember to dispose of your e-waste responsibly! Help save our planet. 🌍'
//           },
//           token: token,
//         };

//         await messaging.send(message);
//         successCount++;
        
//       } catch (error) {
//         failureCount++;
//         errors.push({
//           token: token.substring(0, 20) + '...',
//           error: error.message
//         });
        
//         console.log(`❌ Failed for token ${token.substring(0, 20)}...: ${error.message}`);
        
//         // Remove invalid tokens
//         if (error.code === 'messaging/invalid-registration-token' || 
//             error.code === 'messaging/registration-token-not-registered') {
//           await TokenModel.deleteOne({ token });
//           console.log(`🗑️ Removed invalid token: ${token.substring(0, 20)}...`);
//         }
//       }
//     }

//     console.log(`✅ Individual sending completed: ${successCount} success, ${failureCount} failed`);
//     return {
//       success: true,
//       sent: successCount,
//       failed: failureCount,
//       errors: errors
//     };
//   }

//   // Remove invalid tokens from database
//   async cleanupInvalidTokens(responses, tokens) {
//     const invalidTokens = [];
    
//     responses.forEach((response, index) => {
//       if (!response.success) {
//         invalidTokens.push(tokens[index]);
//       }
//     });

//     if (invalidTokens.length > 0) {
//       await TokenModel.deleteMany({ token: { $in: invalidTokens } });
//       console.log(`🧹 Removed ${invalidTokens.length} invalid tokens`);
//     }
//   }

//   // Start the 5-minute scheduler
//   start() {
//     if (this.isRunning) {
//       console.log('⚠️ Scheduler is already running');
//       return;
//     }

//     try {
//       this.task = cron.schedule('0 9 * * *', async () => {
//         console.log('🕐 Cron job triggered: Sending 9 am daily notifications');
//         await this.sendHourlyNotifications();
//       }, {
//         scheduled: true,
//         timezone: "America/New_York"
//       });

//       this.isRunning = true;
//       console.log('✅ 9 am daily notification scheduler started');
//       console.log('📅 Notifications will be sent every 9 am daily');
      
//       // Send immediately on start
//       this.sendHourlyNotifications();
      
//     } catch (error) {
//       console.error('❌ Failed to start scheduler:', error);
//       this.isRunning = false;
//     }
//   }

//   // Stop the scheduler
//   stop() {
//     if (this.task) {
//       this.task.stop();
//       this.task = null;
//     }
//     this.isRunning = false;
//     console.log('🛑 Notification scheduler stopped');
//   }

//   getStatus() {
//     return {
//       isRunning: this.isRunning,
//       schedule: 'Every 5 minutes'
//     };
//   }
// }

// const notificationScheduler = new NotificationScheduler();
// export default notificationScheduler;


import cron from 'node-cron';
import { messaging } from '../config/firebaseAdmin.js';
import TokenModel from '../models/fcmtoken.model.js';

class NotificationScheduler {
  constructor() {
    this.isRunning = false;
    this.task = null;
  }

  async sendHourlyNotifications() {
    try {
      console.log('⏰ [10-Minute Notification] Starting...');
      
      const tokens = await TokenModel.find().distinct("token");
      
      if (!tokens.length) {
        console.log('📭 No user tokens found');
        return { success: false, message: 'No tokens found' };
      }

      console.log(`📱 Found ${tokens.length} users to notify`);

      // METHOD 1: Try sendEachForMulticast first
      try {
        const message = {
          notification: { 
            title: 'E-Waste Connect ♻️',
            body: 'Remember to dispose of your e-waste responsibly! Help save our planet. 🌍'
          },
          tokens: tokens,
        };

        const response = await messaging.sendEachForMulticast(message);
        
        console.log('✅ [10-Minute Notification] Completed:', {
          success: response.successCount,
          failed: response.failureCount,
          total: tokens.length
        });

        // Clean up invalid tokens
        await this.cleanupInvalidTokens(response.responses, tokens);

        return {
          success: true,
          sent: response.successCount,
          failed: response.failureCount,
          total: tokens.length
        };

      } catch (multicastError) {
        console.log('🔄 Multicast failed, trying individual messages...');
        
        // METHOD 2: Fallback to individual messages
        return await this.sendIndividualNotifications(tokens);
      }

    } catch (error) {
      console.error('❌ Error in 10-minute notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send notifications individually
  async sendIndividualNotifications(tokens) {
    let successCount = 0;
    let failureCount = 0;
    const errors = [];

    for (const token of tokens) {
      try {
        const message = {
          notification: { 
            title: 'E-Waste Connect ♻️',
            body: 'Remember to dispose of your e-waste responsibly! Help save our planet. 🌍'
          },
          token: token,
        };

        await messaging.send(message);
        successCount++;
        
      } catch (error) {
        failureCount++;
        errors.push({
          token: token.substring(0, 20) + '...',
          error: error.message
        });
        
        console.log(`❌ Failed for token ${token.substring(0, 20)}...: ${error.message}`);
        
        // Remove invalid tokens
        if (error.code === 'messaging/invalid-registration-token' || 
            error.code === 'messaging/registration-token-not-registered') {
          await TokenModel.deleteOne({ token });
          console.log(`🗑️ Removed invalid token: ${token.substring(0, 20)}...`);
        }
      }
    }

    console.log(`✅ Individual sending completed: ${successCount} success, ${failureCount} failed`);
    return {
      success: true,
      sent: successCount,
      failed: failureCount,
      errors: errors
    };
  }

  // Remove invalid tokens from database
  async cleanupInvalidTokens(responses, tokens) {
    const invalidTokens = [];
    
    responses.forEach((response, index) => {
      if (!response.success) {
        invalidTokens.push(tokens[index]);
      }
    });

    if (invalidTokens.length > 0) {
      await TokenModel.deleteMany({ token: { $in: invalidTokens } });
      console.log(`🧹 Removed ${invalidTokens.length} invalid tokens`);
    }
  }

  // Start the 10-minute scheduler - UPDATED CRON EXPRESSION
  start() {
    if (this.isRunning) {
      console.log('⚠️ Scheduler is already running');
      return;
    }

    try {
      // Changed from '0 9 * * *' (daily at 9 AM) to '*/10 * * * *' (every 10 minutes)
      this.task = cron.schedule('*/10 * * * *', async () => {
        console.log('🕐 Cron job triggered: Sending 10-minute notifications');
        await this.sendHourlyNotifications();
      }, {
        scheduled: true,
        timezone: "America/New_York"
      });

      this.isRunning = true;
      console.log('✅ 10-minute notification scheduler started');
      console.log('📅 Notifications will be sent every 10 minutes');
      
      // Send immediately on start
      this.sendHourlyNotifications();
      
    } catch (error) {
      console.error('❌ Failed to start scheduler:', error);
      this.isRunning = false;
    }
  }

  // Stop the scheduler
  stop() {
    if (this.task) {
      this.task.stop();
      this.task = null;
    }
    this.isRunning = false;
    console.log('🛑 Notification scheduler stopped');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      schedule: 'Every 10 minutes'
    };
  }
}

const notificationScheduler = new NotificationScheduler();
export default notificationScheduler;