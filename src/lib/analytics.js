import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

// Navigation Events
export const trackPageView = (pageName, additionalParams = {}) => {
  logEvent(analytics, 'page_view', {
    page_name: pageName,
    ...additionalParams
  });
};

// Search Events
export const trackSearch = (searchTerm, category = 'global') => {
  logEvent(analytics, 'search', {
    search_term: searchTerm,
    category: category
  });
};

// Content Interaction Events
export const trackContentView = (contentType, contentId, contentName) => {
  logEvent(analytics, 'content_view', {
    content_type: contentType,
    content_id: contentId,
    content_name: contentName
  });
};

// Tab Interaction Events
export const trackTabChange = (tabName, contentType = 'article_tab') => {
  logEvent(analytics, 'tab_change', {
    tab_name: tabName,
    content_type: contentType
  });
};

// Filter Events
export const trackFilterUse = (filterType, filterValue) => {
  logEvent(analytics, 'filter_use', {
    filter_type: filterType,
    filter_value: filterValue
  });
};

// Authentication Events
export const trackAuthEvent = (eventType, method = 'email') => {
  logEvent(analytics, eventType, {
    auth_method: method
  });
};

// Platform Selection Events
export const trackPlatformSelection = (platform) => {
  logEvent(analytics, 'platform_select', {
    platform_name: platform
  });
};

// Package Interaction Events
export const trackPackageInteraction = (packageId, packageName, actionType) => {
  logEvent(analytics, 'package_interaction', {
    package_id: packageId,
    package_name: packageName,
    action_type: actionType
  });
}; 