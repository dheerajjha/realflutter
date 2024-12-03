'use client';

import { logEvent, getAnalytics } from "firebase/analytics";

class AnalyticsService {
  constructor() {
    this.provider = 'firebase'; // default provider
    this.debug = process.env.NODE_ENV === 'development';
  }

  // Core logging method
  logEvent(eventName, params = {}) {
    if (typeof window === 'undefined') return;

    // Add timestamp to all events
    const eventParams = {
      ...params,
      timestamp: new Date().toISOString(),
      provider: this.provider
    };

    try {
      if (this.debug) {
        console.log(`[Analytics] ${eventName}:`, eventParams);
      }

      // Currently using Firebase, but easy to swap later
      const analytics = getAnalytics();
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error(`[Analytics] Failed to log ${eventName}:`, error);
    }
  }

  // Standard event methods
  pageView(pageName, params = {}) {
    this.logEvent('page_view', { page_name: pageName, ...params });
  }

  search(searchTerm, category = 'global') {
    this.logEvent('search', { search_term: searchTerm, category });
  }

  contentView(contentType, contentId, contentName) {
    this.logEvent('content_view', { content_type: contentType, content_id: contentId, content_name: contentName });
  }

  tabChange(tabName, contentType = 'article_tab') {
    this.logEvent('tab_change', { tab_name: tabName, content_type: contentType });
  }

  filterUse(filterType, filterValue) {
    this.logEvent('filter_use', { filter_type: filterType, filter_value: filterValue });
  }

  auth(eventType, method = 'email') {
    this.logEvent(eventType, { auth_method: method });
  }

  platformSelect(platform) {
    this.logEvent('platform_select', { platform_name: platform });
  }

  packageInteraction(packageId, packageName, actionType) {
    this.logEvent('package_interaction', { 
      package_id: packageId, 
      package_name: packageName, 
      action_type: actionType 
    });
  }
}

// Create a singleton instance
const analytics = new AnalyticsService();

// Freeze the instance to prevent modifications
Object.freeze(analytics);

export default analytics; 