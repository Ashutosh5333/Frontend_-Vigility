import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import { 
  register, 
  clearError, 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectAuthError 
} from '../redux/authSlice';
import { validateRegistrationForm } from '../utils/validation';
import { ROUTES, TOAST_MESSAGES, GENDER_OPTIONS } from '../constants';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'Male',
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  useEffect(() => {
    if (isAuthenticated) {
      toast.success(TOAST_MESSAGES.REGISTER_SUCCESS);
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearError());
    };
  }, [error, dispatch]);
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    const { confirmPassword, ...registerData } = formData;
    registerData.age = parseInt(registerData.age);
    
    dispatch(register(registerData));
  }, [formData, dispatch]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-12">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo/Title Card */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4 shadow-lg">
            <HiUser className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">Join the Analytics Dashboard</p>
        </motion.div>
        
        {/* Register Form Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-strong p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              icon={HiUser}
              autoFocus
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={HiLockClosed}
            />
            
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={HiLockClosed}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Age"
                name="age"
                type="number"
                placeholder="Your age"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
                min="1"
                max="120"
              />
              
              <Select
                label="Gender"
                name="gender"
                options={GENDER_OPTIONS.filter(opt => opt.value !== 'All')}
                value={formData.gender}
                onChange={handleChange}
                error={errors.gender}
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to={ROUTES.LOGIN} 
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
