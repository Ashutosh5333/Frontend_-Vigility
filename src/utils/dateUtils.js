import { 
  startOfToday, 
  endOfToday, 
  subDays, 
  startOfMonth, 
  endOfMonth,
  format as dateFnsFormat,
  parseISO,
} from 'date-fns';

/**
 * Get date range based on preset
 * @param {string} preset - Date preset type
 * @returns {Object} Object with startDate and endDate
 */
export const getDateRangeFromPreset = (preset) => {
  const today = new Date();
  
  switch (preset) {
    case 'today':
      return {
        startDate: startOfToday(),
        endDate: endOfToday(),
      };
    
    case 'last_7_days':
      return {
        startDate: subDays(today, 6),
        endDate: endOfToday(),
      };
    
    case 'this_month':
      return {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };
    
    case 'custom':
    default:
      return {
        startDate: null,
        endDate: null,
      };
  }
};

/**
 * Format date to ISO string for API
 * @param {Date} date - Date object
 * @returns {string} ISO date string
 */
export const formatDateForAPI = (date) => {
  if (!date) return null;
  return dateFnsFormat(date, 'yyyy-MM-dd');
};

/**
 * Format date for display
 * @param {string|Date} date - Date string or Date object
 * @param {string} formatStr - Format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsFormat(dateObj, formatStr);
};

/**
 * Format date for chart labels
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date for chart
 */
export const formatChartDate = (dateString) => {
  return formatDate(dateString, 'MMM d');
};

/**
 * Check if dates are valid range
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns {boolean}
 */
export const isValidDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return true;
  return startDate <= endDate;
};


const dateUtils = {
  getDateRangeFromPreset,
  formatDateForAPI,
  formatDate,
  formatChartDate,
  isValidDateRange,
};

export default dateUtils;