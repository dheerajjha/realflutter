'use client';

import { logEvent, getAnalytics, setAnalyticsCollectionEnabled, setUserId, setUserProperties } from "firebase/analytics";
import { app } from "../firebase";

class AnalyticsService {
  constructor() {
    this.provider = 'firebase';
    this.debug = process.env.NODE_ENV === 'development';
    this.initialize();
  }

  initialize() {
    if (typeof window === 'undefined') return;

    try {
      const analytics = getAnalytics(app);
      
      // Enable analytics collection
      setAnalyticsCollectionEnabled(analytics, true);

      // Enable debug mode for real-time analytics in all environments
      window.localStorage.setItem('debug', 'true');
      console.log('[Analytics] Real-time tracking enabled');

      // Initialize session
      this.getSessionId();
    } catch (error) {
      console.error('[Analytics] Initialization failed:', error);
    }
  }

  // Set user ID for better tracking
  setUser(userId) {
    if (typeof window === 'undefined') return;
    try {
      const analytics = getAnalytics();
      setUserId(analytics, userId);
      
      // Log user identification event for real-time tracking
      this.logRealtimeEvent('user_identified', { user_id: userId });
    } catch (error) {
      console.error('[Analytics] Failed to set user ID:', error);
    }
  }

  // Set user properties for better segmentation
  setUserProperties(properties) {
    if (typeof window === 'undefined') return;
    try {
      const analytics = getAnalytics();
      setUserProperties(analytics, properties);
      
      // Log properties update for real-time tracking
      this.logRealtimeEvent('user_properties_updated', properties);
    } catch (error) {
      console.error('[Analytics] Failed to set user properties:', error);
    }
  }

  // Regular analytics event logging
  logEvent(eventName, params = {}) {
    if (typeof window === 'undefined') return;

    const eventParams = {
      ...params,
      timestamp: new Date().toISOString(),
      provider: this.provider
    };

    try {
      const analytics = getAnalytics();
      
      // Log to regular analytics
      logEvent(analytics, eventName, eventParams);
      
      // Also log as real-time event
      this.logRealtimeEvent(eventName, eventParams);

      if (this.debug) {
        console.log(`[Analytics - Regular] ${eventName}:`, eventParams);
      }
    } catch (error) {
      console.error(`[Analytics] Failed to log ${eventName}:`, error);
    }
  }

  // Real-time specific event logging
  logRealtimeEvent(eventName, params = {}) {
    if (typeof window === 'undefined') return;

    const realtimeParams = {
      ...params,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
      is_realtime: true,
      provider: this.provider
    };

    try {
      const analytics = getAnalytics();
      
      // Add rt_ prefix to distinguish real-time events
      const realtimeEventName = `rt_${eventName}`;
      logEvent(analytics, realtimeEventName, realtimeParams);

      if (this.debug) {
        console.log(`[Analytics - Realtime] ${realtimeEventName}:`, realtimeParams);
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
      
      // Log session start event
      this.logRealtimeEvent('session_started', { session_id: sessionId });
    }
    return sessionId;
  }

  // Standard event methods with both regular and real-time tracking
  pageView(pageName, params = {}) {
    const eventParams = { page_name: pageName, ...params };
    this.logEvent('page_view', eventParams);
  }

  search(searchTerm, category = 'global') {
    const eventParams = { search_term: searchTerm, category };
    this.logEvent('search', eventParams);
  }

  contentView(contentType, contentId, contentName) {
    const eventParams = { content_type: contentType, content_id: contentId, content_name: contentName };
    this.logEvent('content_view', eventParams);
  }

  tabChange(tabName, contentType = 'article_tab') {
    const eventParams = { tab_name: tabName, content_type: contentType };
    this.logEvent('tab_change', eventParams);
  }

  filterUse(filterType, filterValue) {
    const eventParams = { filter_type: filterType, filter_value: filterValue };
    this.logEvent('filter_use', eventParams);
  }

  auth(eventType, method = 'email') {
    const eventParams = { auth_method: method };
    this.logEvent(eventType, eventParams);
  }

  platformSelect(platform) {
    const eventParams = { platform_name: platform };
    this.logEvent('platform_select', eventParams);
  }

  packageInteraction(packageId, packageName, actionType) {
    const eventParams = { 
      package_id: packageId, 
      package_name: packageName, 
      action_type: actionType 
    };
    this.logEvent('package_interaction', eventParams);
  }
}

// Create a singleton instance
const analytics = new AnalyticsService();

// Freeze the instance to prevent modifications
Object.freeze(analytics);

export default analytics; 