'use client';

import { initializeApp, getApps } from "firebase/app";
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
let app = null;

const debug = true;

// Create a promise that resolves when analytics is ready
const analyticsPromise = typeof window !== 'undefined'
  ? new Promise(async (resolve) => {
      try {
        // Check if Firebase is already initialized
        if (!getApps().length) {
          if (debug) {
            console.log('[Firebase] Initializing Firebase with config:', {
              projectId: firebaseConfig.projectId,
              measurementId: firebaseConfig.measurementId
            });
          }
          
          app = initializeApp(firebaseConfig);
          if (debug) console.log('[Firebase] Firebase app initialized successfully');
        } else {
          app = getApps()[0];
          if (debug) console.log('[Firebase] Using existing Firebase app');
        }

        // Initialize Analytics only on client side
        const supported = await isSupported();
        if (supported) {
          if (debug) console.log('[Firebase] Analytics is supported, initializing...');
          analytics = getAnalytics(app);
          if (debug) console.log('[Firebase] Analytics initialized successfully');
          
          // Log a test event to verify setup
          if (debug) {
            const testEvent = {
              name: 'test_event',
              params: {
                test_param: 'test_value',
                timestamp: new Date().toISOString()
              }
            };
            console.log('[Firebase] Sending test event:', testEvent);
          }
          resolve(analytics);
        } else {
          console.warn('[Firebase] Analytics is not supported in this environment');
          resolve(null);
        }
      } catch (error) {
        console.error('[Firebase] Error initializing Firebase:', error);
        resolve(null);
      }
    })
  : Promise.resolve(null);

if (typeof window === 'undefined' && debug) {
  console.log('[Firebase] Running on server side, skipping initialization');
}

export { analytics, app, analyticsPromise }; 