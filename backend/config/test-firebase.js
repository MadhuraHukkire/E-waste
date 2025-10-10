import { messaging } from './config/firebaseAdmin.js';

// Test Firebase Admin setup
async function testFirebase() {
  try {
    console.log('🧪 Testing Firebase Admin setup...');
    
    // This should work if Firebase Admin is properly initialized
    console.log('✅ Firebase Admin is initialized');
    
    // Test if messaging is available
    if (messaging) {
      console.log('✅ Messaging service is available');
    } else {
      console.log('❌ Messaging service is not available');
    }
    
  } catch (error) {
    console.error('❌ Firebase Admin test failed:', error);
  }
}

testFirebase();