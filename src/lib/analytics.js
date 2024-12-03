'use client';

import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

// Helper function to safely log events
const safeLogEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return;
  
  try {
    const analytics = getAnalytics();
    console.log(`Logging event: ${eventName}`, eventParams); // Debug log
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error(`Failed to log event ${eventName}:`, error);
  }
};

// Navigation Events
export const trackPageView = (pageName, additionalParams = {}) => {
  safeLogEvent('page_view', {
    page_name: pageName,
    timestamp: new Date().toISOString(),
    ...additionalParams
  });
};

// Search Events
export const trackSearch = (searchTerm, category = 'global') => {
  safeLogEvent('search', {
    search_term: searchTerm,
    category: category,
    timestamp: new Date().toISOString()
  });
};

// Content Interaction Events
export const trackContentView = (contentType, contentId, contentName) => {
  safeLogEvent('content_view', {
    content_type: contentType,
    content_id: contentId,
    content_name: contentName,
    timestamp: new Date().toISOString()
  });
};

// Tab Interaction Events
export const trackTabChange = (tabName, contentType = 'article_tab') => {
  safeLogEvent('tab_change', {
    tab_name: tabName,
    content_type: contentType,
    timestamp: new Date().toISOString()
  });
};

// Filter Events
export const trackFilterUse = (filterType, filterValue) => {
  safeLogEvent('filter_use', {
    filter_type: filterType,
    filter_value: filterValue,
    timestamp: new Date().toISOString()
  });
};

// Authentication Events
export const trackAuthEvent = (eventType, method = 'email') => {
  safeLogEvent(eventType, {
    auth_method: method,
    timestamp: new Date().toISOString()
  });
};

// Platform Selection Events
export const trackPlatformSelection = (platform) => {
  safeLogEvent('platform_select', {
    platform_name: platform,
    timestamp: new Date().toISOString()
  });
};

// Package Interaction Events
export const trackPackageInteraction = (packageId, packageName, actionType) => {
  safeLogEvent('package_interaction', {
    package_id: packageId,
    package_name: packageName,
    action_type: actionType,
    timestamp: new Date().toISOString()
  });
}; 