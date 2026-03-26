import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { fetchAnalyticsData, trackFeature } from '../redux/analyticsSlice';
import Filters from '../components/Filters';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { featureClicks, timeTrend, loading, filters, selectedFeature } = useSelector(
    (state) => state.analytics
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

    await dispatch(fetchAnalyticsData(params));
  };

  const handleFilterChange = () => {
    loadData();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(trackFeature('refresh_button'));
    await loadData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    if (selectedFeature) {
      loadData();
    }
  }, [selectedFeature]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, <span className="font-medium">{user?.username}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <svg
                className="animate-spin h-12 w-12 text-primary-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4 text-gray-600">Loading analytics data...</p>
            </div>
          </div>
        )}

        {/* Charts */}
        {!loading && (
          <div className="space-y-6">
            {/* Bar Chart */}
            <BarChart data={featureClicks} selectedFeature={selectedFeature} />

            {/* Line Chart */}
            <LineChart data={timeTrend} selectedFeature={selectedFeature} />

            {/* Stats Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Summary Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">
                    Total Features Tracked
                  </p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {featureClicks.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">
                    Total Clicks
                  </p>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {featureClicks.reduce(
                      (sum, item) => sum + parseInt(item.click_count),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">
                    Selected Feature
                  </p>
                  <p className="text-2xl font-bold text-purple-900 mt-1 truncate">
                    {selectedFeature || 'None'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Interactive Product Analytics Dashboard - Vigility Technologies Challenge
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
