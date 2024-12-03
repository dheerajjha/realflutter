'use client';

import { logEvent, getAnalytics, setAnalyticsCollectionEnabled, setUserId, setUserProperties } from "firebase/analytics";
import { analytics as firebaseAnalytics } from "../firebase";

class AnalyticsService {
  constructor() {
    this.provider = 'firebase';
    this.debug = process.env.NODE_ENV === 'development';
    this.analytics = firebaseAnalytics;
    this.initialize();
  }

  initialize() {
    if (typeof window === 'undefined') {
      console.log('[Analytics] Running on server side, initialization skipped');
      return;
    }

    try {
      console.log('[Analytics] Initializing analytics service');
      
      // Enable analytics collection
      if (this.analytics) {
        setAnalyticsCollectionEnabled(this.analytics, true);
        console.log('[Analytics] Analytics collection enabled');
      }

      // Enable debug mode for real-time analytics in all environments
      window.localStorage.setItem('debug', 'true');
      console.log('[Analytics] Debug mode enabled for real-time tracking');

      // Initialize session
      const sessionId = this.getSessionId();
      console.log('[Analytics] Session initialized:', sessionId);
    } catch (error) {
      console.error('[Analytics] Initialization failed:', error);
    }
  }

  // Set user ID for better tracking
  setUser(userId) {
    if (typeof window === 'undefined' || !this.analytics) return;
    
    try {
      console.log('[Analytics] Setting user ID:', userId);
      setUserId(this.analytics, userId);
      
      // Log user identification event
      this.logRealtimeEvent('user_identified', { user_id: userId });
      console.log('[Analytics] User ID set successfully');
    } catch (error) {
      console.error('[Analytics] Failed to set user ID:', error);
    }
  }

  // Set user properties for better segmentation
  setUserProperties(properties) {
    if (typeof window === 'undefined' || !this.analytics) return;
    
    try {
      console.log('[Analytics] Setting user properties:', properties);
      setUserProperties(this.analytics, properties);
      
      // Log properties update
      this.logRealtimeEvent('user_properties_updated', properties);
      console.log('[Analytics] User properties set successfully');
    } catch (error) {
      console.error('[Analytics] Failed to set user properties:', error);
    }
  }

  // Regular analytics event logging
  logEvent(eventName, params = {}) {
    if (typeof window === 'undefined' || !this.analytics) {
      console.log('[Analytics] Skipping event on server side:', eventName);
      return;
    }

    const eventParams = {
      ...params,
      timestamp: new Date().toISOString(),
      provider: this.provider
    };

    try {
      // Log to regular analytics
      console.log('[Analytics] Sending regular event:', eventName, eventParams);
      logEvent(this.analytics, eventName, eventParams);
      
      // Also log as real-time event
      this.logRealtimeEvent(eventName, eventParams);

      if (this.debug) {
        console.log(`[Analytics - Regular] Event sent successfully: ${eventName}`);
      }
    } catch (error) {
      console.error(`[Analytics] Failed to log event ${eventName}:`, error);
    }
  }

  // Real-time specific event logging
  logRealtimeEvent(eventName, params = {}) {
    if (typeof window === 'undefined' || !this.analytics) {
      console.log('[Analytics] Skipping realtime event on server side:', eventName);
      return;
    }

    const realtimeParams = {
      ...params,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
      is_realtime: true,
      provider: this.provider
    };

    try {
      // Add rt_ prefix to distinguish real-time events
      const realtimeEventName = `rt_${eventName}`;
      console.log('[Analytics] Sending realtime event:', realtimeEventName, realtimeParams);
      logEvent(this.analytics, realtimeEventName, realtimeParams);

      if (this.debug) {
        console.log(`[Analytics - Realtime] Event sent successfully: ${realtimeEventName}`);
      }
    } catch (error) {
      console.error(`[Analytics] Failed to log realtime event ${eventName}:`, error);
    }
  }

  // Generate or retrieve session ID
  getSessionId() {
    if (typeof window === 'undefined') return 'server-side';
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('analytics_session_id', sessionId);
      console.log('[Analytics] New session created:', sessionId);
      
      // Log session start event
      this.logRealtimeEvent('session_started', { session_id: sessionId });
    } else {
      console.log('[Analytics] Using existing session:', sessionId);
    }
    return sessionId;
  }

  // Standard event methods with both regular and real-time tracking
  pageView(pageName, params = {}) {
    console.log('[Analytics] Tracking page view:', pageName);
    const eventParams = { page_name: pageName, ...params };
    this.logEvent('page_view', eventParams);
  }

  search(searchTerm, category = 'global') {
    console.log('[Analytics] Tracking search:', searchTerm, category);
    const eventParams = { search_term: searchTerm, category };
    this.logEvent('search', eventParams);
  }

  contentView(contentType, contentId, contentName) {
    console.log('[Analytics] Tracking content view:', { contentType, contentId, contentName });
    const eventParams = { content_type: contentType, content_id: contentId, content_name: contentName };
    this.logEvent('content_view', eventParams);
  }

  tabChange(tabName, contentType = 'article_tab') {
    console.log('[Analytics] Tracking tab change:', tabName, contentType);
    const eventParams = { tab_name: tabName, content_type: contentType };
    this.logEvent('tab_change', eventParams);
  }

  filterUse(filterType, filterValue) {
    console.log('[Analytics] Tracking filter use:', filterType, filterValue);
    const eventParams = { filter_type: filterType, filter_value: filterValue };
    this.logEvent('filter_use', eventParams);
  }

  auth(eventType, method = 'email') {
    console.log('[Analytics] Tracking auth event:', eventType, method);
    const eventParams = { auth_method: method };
    this.logEvent(eventType, eventParams);
  }

  platformSelect(platform) {
    console.log('[Analytics] Tracking platform selection:', platform);
    const eventParams = { platform_name: platform };
    this.logEvent('platform_select', eventParams);
  }

  packageInteraction(packageId, packageName, actionType) {
    console.log('[Analytics] Tracking package interaction:', { packageId, packageName, actionType });
    const eventParams = { 
      package_id: packageId, 
      package_name: packageName, 
      action_type: actionType 
    };
    this.logEvent('package_interaction', eventParams);
  }
}

// Create a singleton instance
const analyticsService = new AnalyticsService();
console.log('[Analytics] Analytics service instance created');

// Freeze the instance to prevent modifications
Object.freeze(analyticsService);

export default analyticsService; 