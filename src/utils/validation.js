import { VALIDATION } from '../constants';

/**
 * Validate username
 * @param {string} username 
 * @returns {Object} { isValid, error }
 */
export const validateUsername = (username) => {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (username.length < VALIDATION.USERNAME_MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `Username must be at least ${VALIDATION.USERNAME_MIN_LENGTH} characters` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password 
 * @returns {Object} { isValid, error }
 */
export const validatePassword = (password) => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate age
 * @param {number} age 
 * @returns {Object} { isValid, error }
 */
export const validateAge = (age) => {
  const ageNum = parseInt(age);
  
  if (isNaN(ageNum)) {
    return { isValid: false, error: 'Age must be a number' };
  }
  
  if (ageNum < VALIDATION.AGE_MIN || ageNum > VALIDATION.AGE_MAX) {
    return { 
      isValid: false, 
      error: `Age must be between ${VALIDATION.AGE_MIN} and ${VALIDATION.AGE_MAX}` 
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate registration form
 * @param {Object} formData 
 * @returns {Object} { isValid, errors }
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  const usernameValidation = validateUsername(formData.username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error;
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  const ageValidation = validateAge(formData.age);
  if (!ageValidation.isValid) {
    errors.age = ageValidation.error;
  }
  
  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login form
 * @param {Object} formData 
 * @returns {Object} { isValid, errors }
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  if (!formData.username || formData.username.trim().length === 0) {
    errors.username = 'Username is required';
  }
  
  if (!formData.password || formData.password.length === 0) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validationUtils = {
  validateUsername,
  validatePassword,
  validateAge,
  validateRegistrationForm,
  validateLoginForm,
};

export default validationUtils;