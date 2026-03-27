import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { analyticsService } from '../services/api.service';
import { COOKIE_KEYS, DATE_PRESETS } from '../constants';


// Helper to load filters from cookies
const loadStoredFilters = () => ({
  startDate: Cookies.get(COOKIE_KEYS.START_DATE) || null,
  endDate: Cookies.get(COOKIE_KEYS.END_DATE) || null,
  age: Cookies.get(COOKIE_KEYS.AGE) || 'All',
  gender: Cookies.get(COOKIE_KEYS.GENDER) || 'All',
  datePreset: Cookies.get(COOKIE_KEYS.DATE_PRESET) || DATE_PRESETS.LAST_7_DAYS,
});

const initialState = {
  featureClicks: [],
  timeTrend: [],
  loading: false,
  error: null,
  filters: loadStoredFilters(),
  selectedFeature: null,
  lastFetched: null,
};

// Async thunks
export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await analyticsService.getData(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics data'
      );
    }
  }
);

export const trackFeature = createAsyncThunk(
  'analytics/track',
  async (featureName, { rejectWithValue }) => {
    try {
      await analyticsService.track(featureName);
      return featureName;
    } catch (error) {
      // Silently fail tracking
      return rejectWithValue(null);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const newFilters = { ...state.filters, ...action.payload };
      state.filters = newFilters;
      
      // Save to cookies with 30 day expiration
      const cookieOptions = { expires: 30 };
      
      Object.keys(action.payload).forEach((key) => {
        const cookieKey = COOKIE_KEYS[key.toUpperCase().replace('DATE', 'DATE')];
        if (cookieKey) {
          const value = action.payload[key];
          if (value) {
            Cookies.set(cookieKey, value, cookieOptions);
          } else {
            Cookies.remove(cookieKey);
          }
        }
      });
    },
    
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
    
    setDatePreset: (state, action) => {
      state.filters.datePreset = action.payload;
      Cookies.set(COOKIE_KEYS.DATE_PRESET, action.payload, { expires: 30 });
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    resetFilters: (state) => {
      state.filters = {
        startDate: null,
        endDate: null,
        age: 'All',
        gender: 'All',
        datePreset: DATE_PRESETS.LAST_7_DAYS,
      };
      
      // Clear cookies
      Object.values(COOKIE_KEYS).forEach((key) => Cookies.remove(key));
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch analytics data
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.featureClicks = action.payload.featureClicks;
        state.timeTrend = action.payload.timeTrend;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setFilters, 
  setSelectedFeature, 
  setDatePreset,
  clearError,
  resetFilters,
} = analyticsSlice.actions;

// Memoized selectors
export const selectAnalytics = (state) => state.analytics;
export const selectFeatureClicks = (state) => state.analytics.featureClicks;
export const selectTimeTrend = (state) => state.analytics.timeTrend;
export const selectFilters = (state) => state.analytics.filters;
export const selectSelectedFeature = (state) => state.analytics.selectedFeature;
export const selectAnalyticsLoading = (state) => state.analytics.loading;
export const selectAnalyticsError = (state) => state.analytics.error;

// Computed selectors
export const selectTotalClicks = (state) => 
  state.analytics.featureClicks.reduce(
    (sum, item) => sum + parseInt(item.click_count), 
    0
  );

export const selectTotalFeatures = (state) => 
  state.analytics.featureClicks.length;

export default analyticsSlice.reducer;
