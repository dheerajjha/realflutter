'use client';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics = null;

// Only initialize analytics on the client side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
  // Log a test event to verify setup
  logEvent(analytics, 'app_initialized', {
    timestamp: new Date().toISOString()
  });
}

export { app, analytics }; 