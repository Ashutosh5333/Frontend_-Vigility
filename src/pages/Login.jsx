import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import { 
  login, 
  clearError, 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectAuthError 
} from '../redux/authSlice';
import { validateLoginForm } from '../utils/validation';
import { ROUTES, TOAST_MESSAGES } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  useEffect(() => {
    if (isAuthenticated) {
      toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
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
    
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    dispatch(login(formData));
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
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </motion.div>
        
        {/* Login Form Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-strong p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={HiLockClosed}
            />
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to={ROUTES.REGISTER} 
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Demo Credentials */}
        <motion.div
          className="mt-6 bg-white rounded-xl shadow-soft p-4 border border-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xs text-gray-600 text-center mb-2">
            <span className="font-semibold">Demo Credentials:</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
            <code className="bg-gray-100 px-3 py-1 rounded-lg font-mono">
              john_doe
            </code>
            <span className="text-gray-400">/</span>
            <code className="bg-gray-100 px-3 py-1 rounded-lg font-mono">
              password123
            </code>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
