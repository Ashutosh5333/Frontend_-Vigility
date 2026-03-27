import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { 
  HiChartBar, 
  HiCursorClick, 
  HiLightningBolt 
} from 'react-icons/hi';
import {
  fetchAnalyticsData,
  selectFeatureClicks,
  selectTimeTrend,
  selectFilters,
  selectSelectedFeature,
  selectAnalyticsLoading,
  selectTotalClicks,
  selectTotalFeatures,
} from '../redux/analyticsSlice';

import { TOAST_MESSAGES } from '../constants';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCard from '../components/dashboard/StatsCard';
import Filters from '../components/filters/Filters';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const featureClicks = useSelector(selectFeatureClicks);
  const timeTrend = useSelector(selectTimeTrend);
  const filters = useSelector(selectFilters);
  const selectedFeature = useSelector(selectSelectedFeature);
  const loading = useSelector(selectAnalyticsLoading);
  const totalClicks = useSelector(selectTotalClicks);
  const totalFeatures = useSelector(selectTotalFeatures);
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Memoized API params to prevent unnecessary re-renders
  const apiParams = useMemo(() => {
    const params = {};
    
    if (filters.startDate) {
      params.startDate = filters.startDate;
    }
    
    if (filters.endDate) {
      params.endDate = filters.endDate;
    }
    
    if (filters.age && filters.age !== 'All') {
      params.age = filters.age;
    }
    
    if (filters.gender && filters.gender !== 'All') {
      params.gender = filters.gender;
    }
    
    if (selectedFeature) {
      params.feature = selectedFeature;
    }
    
    return params;
  }, [filters, selectedFeature]);
  
  // Load data function
  const loadData = useCallback(async () => {
    try {
      await dispatch(fetchAnalyticsData(apiParams)).unwrap();
      if (!initialLoad) {
        toast.success(TOAST_MESSAGES.DATA_REFRESH_SUCCESS);
      }
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setInitialLoad(false);
    }
  }, [dispatch, apiParams,initialLoad]);
  
  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  
  useEffect(() => {
    if (!initialLoad) {
      loadData();
    }
  }, [apiParams, initialLoad, loadData]);

  // Handle refresh button
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [loadData]);
  
  // Handle filter changes
  const handleFilterChange = useCallback(() => {
    // Filter changes trigger re-render via useEffect on apiParams
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            borderRadius: '0.75rem',
            padding: '1rem',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <DashboardHeader 
        onRefresh={handleRefresh} 
        isRefreshing={isRefreshing} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} />
        
        {/* Loading State */}
        {loading && initialLoad ? (
          <LoadingSpinner size="lg" text="Loading analytics data..." />
        ) : (
          <>
            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StatsCard
                title="Total Features Tracked"
                value={totalFeatures.toLocaleString()}
                icon={HiChartBar}
                color="blue"
                delay={0.1}
              />
              
              <StatsCard
                title="Total Clicks"
                value={totalClicks.toLocaleString()}
                icon={HiCursorClick}
                color="green"
                delay={0.2}
              />
              
              <StatsCard
                title="Selected Feature"
                value={selectedFeature ? selectedFeature.replace(/_/g, ' ') : 'None'}
                icon={HiLightningBolt}
                color="purple"
                delay={0.3}
              />
            </motion.div>
            
            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BarChart 
                data={featureClicks} 
                selectedFeature={selectedFeature} 
              />
              
              <LineChart 
                data={timeTrend} 
                selectedFeature={selectedFeature} 
              />
            </motion.div>
          </>
        )}
      </main>
      
      {/* Footer */}
      <motion.footer
        className="bg-white border-t border-gray-200 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Interactive Product Analytics Dashboard
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Built with React, Redux, Tailwind CSS & Chart.js
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Dashboard;
