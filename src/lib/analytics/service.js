'use client';

import { logEvent, getAnalytics, setAnalyticsCollectionEnabled, setUserId, setUserProperties } from "firebase/analytics";
import { analytics as firebaseAnalytics, analyticsPromise } from "../firebase";

class AnalyticsService {
  constructor() {
    this.provider = 'firebase';
    this.debug = process.env.NODE_ENV === 'development';
    this._analytics = null;
    this.initialized = false;
    this.isClient = typeof window !== 'undefined';
    this.initializationPromise = null;
  }

  // Getter for analytics instance
  get analytics() {
    return this._analytics;
  }

  async initialize() {
    if (!this.isClient) {
      if (this.debug) console.log('[Analytics] Running on server side, initialization skipped');
      return;
    }

    if (this.initialized) {
      if (this.debug) console.log('[Analytics] Already initialized, skipping');
      return;
    }

    // If initialization is in progress, return the existing promise
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        if (this.debug) console.log('[Analytics] Initializing analytics service');
        
        // Wait for Firebase analytics to be ready
        this._analytics = await analyticsPromise;
        
        // Enable analytics collection if analytics is available
        if (this._analytics) {
          setAnalyticsCollectionEnabled(this._analytics, true);
          if (this.debug) console.log('[Analytics] Analytics collection enabled');
        } else {
          if (this.debug) console.warn('[Analytics] Analytics instance not available');
          return;
        }

        // Enable debug mode for real-time analytics in all environments
        window.localStorage.setItem('debug', 'true');
        if (this.debug) console.log('[Analytics] Debug mode enabled for real-time tracking');

        // Initialize session
        const sessionId = this.getSessionId();
        if (this.debug) console.log('[Analytics] Session initialized:', sessionId);

        this.initialized = true;
      } catch (error) {
        console.error('[Analytics] Initialization failed:', error);
      }
    })();

    return this.initializationPromise;
  }

  // Utility method to check if analytics is ready
  isReady() {
    return this.isClient && this.initialized && this._analytics;
  }

  // Helper method to ensure analytics is initialized before any operation
  async ensureInitialized() {
    if (!this.initialized && this.isClient) {
      await this.initialize();
    }
    return this.isReady();
  }

  // Set user ID for better tracking
  async setUser(userId) {
    if (!await this.ensureInitialized()) return;
    
    try {
      if (this.debug) console.log('[Analytics] Setting user ID:', userId);
      setUserId(this._analytics, userId);
      
      // Log user identification event
      this.logRealtimeEvent('user_identified', { user_id: userId });
      if (this.debug) console.log('[Analytics] User ID set successfully');
    } catch (error) {
      console.error('[Analytics] Failed to set user ID:', error);
    }
  }

  // Set user properties for better segmentation
  async setUserProperties(properties) {
    if (!await this.ensureInitialized()) return;
    
    try {
      if (this.debug) console.log('[Analytics] Setting user properties:', properties);
      setUserProperties(this._analytics, properties);
      
      // Log properties update
      this.logRealtimeEvent('user_properties_updated', properties);
      if (this.debug) console.log('[Analytics] User properties set successfully');
    } catch (error) {
      console.error('[Analytics] Failed to set user properties:', error);
    }
  }

  // Regular analytics event logging
  async logEvent(eventName, params = {}) {
    if (!await this.ensureInitialized()) {
      if (this.debug) console.log('[Analytics] Analytics not ready, skipping event:', eventName);
      return;
    }

    const eventParams = {
      ...params,
      timestamp: new Date().toISOString(),
      provider: this.provider
    };

    try {
      // Log to regular analytics
      if (this.debug) console.log('[Analytics] Sending regular event:', eventName, eventParams);
      logEvent(this._analytics, eventName, eventParams);
      
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
  async logRealtimeEvent(eventName, params = {}) {
    if (!await this.ensureInitialized()) {
      if (this.debug) console.log('[Analytics] Analytics not ready, skipping realtime event:', eventName);
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
      if (this.debug) console.log('[Analytics] Sending realtime event:', realtimeEventName, realtimeParams);
      logEvent(this._analytics, realtimeEventName, realtimeParams);

      if (this.debug) {
        console.log(`[Analytics - Realtime] Event sent successfully: ${realtimeEventName}`);
      }
    } catch (error) {
      console.error(`[Analytics] Failed to log realtime event ${eventName}:`, error);
    }
  }

  // Generate or retrieve session ID
  getSessionId() {
    if (!this.isClient) return 'server-side';
    
    try {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('analytics_session_id', sessionId);
        if (this.debug) console.log('[Analytics] New session created:', sessionId);
        
        // Log session start event
        this.logRealtimeEvent('session_started', { session_id: sessionId });
      } else {
        if (this.debug) console.log('[Analytics] Using existing session:', sessionId);
      }
      return sessionId;
    } catch (error) {
      console.error('[Analytics] Failed to handle session ID:', error);
      return 'error-session';
    }
  }

  // Standard event methods
  pageView(pageName, params = {}) {
    if (this.debug) console.log('[Analytics] Tracking page view:', pageName);
    const eventParams = { page_name: pageName, ...params };
    this.logEvent('page_view', eventParams);
  }

  search(searchTerm, category = 'global') {
    if (this.debug) console.log('[Analytics] Tracking search:', searchTerm, category);
    const eventParams = { search_term: searchTerm, category };
    this.logEvent('search', eventParams);
  }

  contentView(contentType, contentId, contentName) {
    if (this.debug) console.log('[Analytics] Tracking content view:', { contentType, contentId, contentName });
    const eventParams = { content_type: contentType, content_id: contentId, content_name: contentName };
    this.logEvent('content_view', eventParams);
  }

  tabChange(tabName, contentType = 'article_tab') {
    if (this.debug) console.log('[Analytics] Tracking tab change:', tabName, contentType);
    const eventParams = { tab_name: tabName, content_type: contentType };
    this.logEvent('tab_change', eventParams);
  }

  filterUse(filterType, filterValue) {
    if (this.debug) console.log('[Analytics] Tracking filter use:', filterType, filterValue);
    const eventParams = { filter_type: filterType, filter_value: filterValue };
    this.logEvent('filter_use', eventParams);
  }

  auth(eventType, method = 'email') {
    if (this.debug) console.log('[Analytics] Tracking auth event:', eventType, method);
    const eventParams = { auth_method: method };
    this.logEvent(eventType, eventParams);
  }

  platformSelect(platform) {
    if (this.debug) console.log('[Analytics] Tracking platform selection:', platform);
    const eventParams = { platform_name: platform };
    this.logEvent('platform_select', eventParams);
  }

  packageInteraction(packageId, packageName, actionType) {
    if (this.debug) console.log('[Analytics] Tracking package interaction:', { packageId, packageName, actionType });
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
if (analyticsService.debug) console.log('[Analytics] Analytics service instance created');

export default analyticsService; 