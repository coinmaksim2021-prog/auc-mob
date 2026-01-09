/**
 * Application Constants
 * 
 * Centralized configuration values used across the application.
 */

// Backend URL from environment
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// API base URL
export const API_URL = `${BACKEND_URL}/api`;

// Dynamic.xyz Environment ID for wallet connections
export const DYNAMIC_ENVIRONMENT_ID = '3f47c17e-3c08-48a7-b78d-050cfde66c62';

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Supported languages
export const SUPPORTED_LANGUAGES = ['en', 'ru'];

export default {
  BACKEND_URL,
  API_URL,
  DYNAMIC_ENVIRONMENT_ID,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
};
