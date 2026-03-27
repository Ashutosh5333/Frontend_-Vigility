import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiRefresh, HiLogout } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../redux/authSlice';
import { useTracker } from '../../hooks/useTracker';
import { FEATURE_NAMES, ROUTES } from '../../constants';
import Button from '../ui/Button';

const DashboardHeader = memo(({ onRefresh, isRefreshing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const track = useTracker();
  const user = useSelector(selectUser);
  
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);
  
  const handleRefresh = useCallback(() => {
    track(FEATURE_NAMES.REFRESH_BUTTON);
    if (onRefresh) onRefresh();
  }, [track, onRefresh]);
  
  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back, <span className="font-semibold text-primary-600">{user?.username}</span> 👋
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="md"
              icon={HiRefresh}
              onClick={handleRefresh}
              loading={isRefreshing}
            >
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            
            <Button
              variant="ghost"
              size="md"
              icon={HiLogout}
              onClick={handleLogout}
            >
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
});

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;
