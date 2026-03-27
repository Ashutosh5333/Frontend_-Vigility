// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

// Cookie Keys
export const COOKIE_KEYS = {
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  AGE: 'age',
  GENDER: 'gender',
  DATE_PRESET: 'datePreset',
};

// Feature Names for Tracking
export const FEATURE_NAMES = {
  DATE_FILTER: 'date_filter',
  AGE_FILTER: 'age_filter',
  GENDER_FILTER: 'gender_filter',
  BAR_CHART_CLICK: 'bar_chart_click',
  LINE_CHART: 'line_chart',
  REFRESH_BUTTON: 'refresh_button',
  RESET_FILTERS: 'reset_filters',
  DATE_PRESET_CHANGE: 'date_preset_change',
};

// Filter Options
export const AGE_OPTIONS = [
  { value: 'All', label: 'All Ages' },
  { value: '<18', label: 'Under 18' },
  { value: '18-40', label: '18 - 40' },
  { value: '>40', label: 'Over 40' },
];

export const GENDER_OPTIONS = [
  { value: 'All', label: 'All Genders' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

// Date Presets
export const DATE_PRESETS = {
  TODAY: 'today',
  LAST_7_DAYS: 'last_7_days',
  THIS_MONTH: 'this_month',
  CUSTOM: 'custom',
};

export const DATE_PRESET_OPTIONS = [
  { value: DATE_PRESETS.TODAY, label: 'Today' },
  { value: DATE_PRESETS.LAST_7_DAYS, label: 'Last 7 Days' },
  { value: DATE_PRESETS.THIS_MONTH, label: 'This Month' },
  { value: DATE_PRESETS.CUSTOM, label: 'Custom Range' },
];

// Chart Colors
export const CHART_COLORS = {
  primary: 'rgba(59, 130, 246, 1)',
  primaryLight: 'rgba(59, 130, 246, 0.5)',
  primaryLighter: 'rgba(59, 130, 246, 0.1)',
  accent: 'rgba(217, 70, 239, 1)',
  accentLight: 'rgba(217, 70, 239, 0.5)',
  success: 'rgba(34, 197, 94, 1)',
  warning: 'rgba(245, 158, 11, 1)',
  danger: 'rgba(239, 68, 68, 1)',
  grid: 'rgba(0, 0, 0, 0.05)',
};

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};

// Validation Rules
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 6,
  AGE_MIN: 1,
  AGE_MAX: 120,
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! 👋',
  REGISTER_SUCCESS: 'Account created successfully! 🎉',
  LOGOUT_SUCCESS: 'Logged out successfully',
  DATA_REFRESH_SUCCESS: 'Data refreshed! ✨',
  TRACKING_ERROR: 'Failed to track interaction',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Chart Configuration
export const CHART_CONFIG = {
  BAR_CHART: {
    ASPECT_RATIO: 2,
    MAX_BAR_THICKNESS: 80,
  },
  LINE_CHART: {
    ASPECT_RATIO: 2,
    TENSION: 0.4,
    POINT_RADIUS: 4,
    POINT_HOVER_RADIUS: 6,
  },
};

const CONSTANTS = {
  API_CONFIG,
  STORAGE_KEYS,
  COOKIE_KEYS,
  FEATURE_NAMES,
  AGE_OPTIONS,
  GENDER_OPTIONS,
  DATE_PRESETS,
  DATE_PRESET_OPTIONS,
  CHART_COLORS,
  ANIMATION_DURATION,
  ROUTES,
  VALIDATION,
  TOAST_MESSAGES,
  CHART_CONFIG,
};

export default CONSTANTS;

// export default {
//   API_CONFIG,
//   STORAGE_KEYS,
//   COOKIE_KEYS,
//   FEATURE_NAMES,
//   AGE_OPTIONS,
//   GENDER_OPTIONS,
//   DATE_PRESETS,
//   DATE_PRESET_OPTIONS,
//   CHART_COLORS,
//   ANIMATION_DURATION,
//   ROUTES,
//   VALIDATION,
//   TOAST_MESSAGES,
//   CHART_CONFIG,
// };
