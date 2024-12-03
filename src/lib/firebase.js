'use client';

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlFmjPulSWwsWYZflQqdmnd85_W9-0jTw",
  authDomain: "realflutter-70d75.firebaseapp.com",
  projectId: "realflutter-70d75",
  storageBucket: "realflutter-70d75.firebasestorage.app",
  messagingSenderId: "403951280523",
  appId: "1:403951280523:web:aa22e18b4d39e2c1484f8e",
  measurementId: "G-37J7YZWT08"
};

let analytics = null;

// Initialize Firebase
try {
  console.log('[Firebase] Initializing Firebase with config:', {
    projectId: firebaseConfig.projectId,
    measurementId: firebaseConfig.measurementId
  });
  
  const app = initializeApp(firebaseConfig);
  console.log('[Firebase] Firebase app initialized successfully');

  // Initialize Analytics only on client side
  if (typeof window !== 'undefined') {
    // Check if analytics is supported
    isSupported().then(supported => {
      if (supported) {
        console.log('[Firebase] Analytics is supported, initializing...');
        analytics = getAnalytics(app);
        console.log('[Firebase] Analytics initialized successfully');
        
        // Log a test event to verify setup
        if (process.env.NODE_ENV === 'development') {
          const testEvent = {
            name: 'test_event',
            params: {
              test_param: 'test_value',
              timestamp: new Date().toISOString()
            }
          };
          console.log('[Firebase] Sending test event:', testEvent);
        }
      } else {
        console.warn('[Firebase] Analytics is not supported in this environment');
      }
    }).catch(error => {
      console.error('[Firebase] Error checking analytics support:', error);
    });
  } else {
    console.log('[Firebase] Running on server side, skipping analytics initialization');
  }
} catch (error) {
  console.error('[Firebase] Error initializing Firebase:', error);
}

export { analytics }; 