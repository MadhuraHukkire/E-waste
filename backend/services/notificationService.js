import admin from '../config/firebaseAdmin.js';
import TokenModel from '../models/fcmtoken.model.js';

class NotificationService {
  // Send notification to all users
  async broadcastToAllUsers(title, body, data = null) {
    try {
      const tokens = await TokenModel.find().distinct("token");
      
      if (!tokens.length) {
        return { success: false, message: 'No users found' };
      }

      const message = {
        notification: { title, body },
        tokens,
      };

      // Add data payload if provided
      if (data) {
        message.data = data;
      }

      // Platform-specific configurations
      message.android = {
        priority: 'high',
        notification: {
          sound: 'default',
          color: '#4CAF50',
        }
      };

      message.apns = {
        payload: {
          aps: {
            alert: { title, body },
            sound: 'default',
            badge: 1
          }
        }
      };

      const response = await admin.messaging().sendMulticast(message);

      // Cleanup invalid tokens
      await this.cleanupInvalidTokens(response.responses, tokens);

      return {
        success: true,
        sent: response.successCount,
        failed: response.failureCount,
        total: tokens.length
      };

    } catch (error) {
      console.error('❌ Broadcast notification error:', error);
      return { success: false, error: error.message };
    }
  }

  async cleanupInvalidTokens(responses, tokens) {
    const invalidTokens = [];
    
    responses.forEach((response, index) => {
      if (!response.success && response.error?.code === 'messaging/invalid-registration-token') {
        invalidTokens.push(tokens[index]);
      }
    });

    if (invalidTokens.length > 0) {
      await TokenModel.deleteMany({ token: { $in: invalidTokens } });
      console.log(`🧹 Cleaned up ${invalidTokens.length} invalid tokens`);
    }
  }

  // Get user count for notifications
  async getUserCount() {
    return await TokenModel.countDocuments();
  }
}

// Export a single instance
const notificationService = new NotificationService();
export default notificationService;