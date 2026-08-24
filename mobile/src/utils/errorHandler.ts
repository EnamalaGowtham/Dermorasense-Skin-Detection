import { Alert } from 'react-native';

/**
 * Safely extracts a user-friendly error message from any error object.
 * Prevents raw technical errors, stack traces, and API urls from being shown to the user.
 */
export const getErrorMessage = (error: any): string => {
  if (!error) return 'Something went wrong. Please try again.';

  // Check if it's an Axios error
  if (error.isAxiosError || (error.response && error.response.status)) {
    if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
      return 'The request took too long. Please try again.';
    }
    
    if (error.message?.toLowerCase().includes('network error') || !error.response) {
      return 'Unable to connect right now. Please check your internet connection and try again.';
    }

    const status = error.response?.status;
    if (status) {
      switch (status) {
        case 401:
          return 'Your session has expired. Please log in again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested content was not found.';
        case 422:
          return 'Invalid input provided. Please check your information and try again.';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
        case 502:
        case 503:
        case 504:
          return 'The server is temporarily unavailable. Please try again later.';
        default:
          return 'Unable to complete the request. Please try again later.';
      }
    }
    return 'Unable to connect to the server. Please try again.';
  }

  // Fallback for non-Axios errors (filesystem, react-native, generic JS errors)
  // We intentionally do NOT return error.message directly to avoid leaking technical details.
  return 'Something went wrong. Please try again.';
};

/**
 * Safely logs errors for developers without exposing them in the UI.
 * In a real production app, this would integrate with Sentry or Crashlytics.
 */
export const logError = (error: any, context: string = 'App') => {
  if (__DEV__) {
    // Only log stringified minimal info to avoid massive redbox stack traces 
    // when we just want a silent warning
    console.log(`[Error] [${context}]`, error?.message || 'Unknown error');
  }
};

/**
 * Convenience method to show a standard alert with a sanitized error message.
 */
export const showErrorAlert = (title: string, error: any) => {
  Alert.alert(title, getErrorMessage(error));
};
