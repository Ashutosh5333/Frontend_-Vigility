import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsAPI } from '../api/api';
import Cookies from 'js-cookie';

const initialState = {
  featureClicks: [],
  timeTrend: [],
  loading: false,
  error: null,
  filters: {
    startDate: Cookies.get('startDate') || null,
    endDate: Cookies.get('endDate') || null,
    age: Cookies.get('age') || 'All',
    gender: Cookies.get('gender') || 'All',
  },
  selectedFeature: null,
};

// Async thunks
export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getData(params);
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
      await analyticsAPI.track(featureName);
      return featureName;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to track feature'
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Save filters to cookies
      if (action.payload.startDate !== undefined) {
        if (action.payload.startDate) {
          Cookies.set('startDate', action.payload.startDate, { expires: 30 });
        } else {
          Cookies.remove('startDate');
        }
      }
      
      if (action.payload.endDate !== undefined) {
        if (action.payload.endDate) {
          Cookies.set('endDate', action.payload.endDate, { expires: 30 });
        } else {
          Cookies.remove('endDate');
        }
      }
      
      if (action.payload.age !== undefined) {
        Cookies.set('age', action.payload.age, { expires: 30 });
      }
      
      if (action.payload.gender !== undefined) {
        Cookies.set('gender', action.payload.gender, { expires: 30 });
      }
    },
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
    clearError: (state) => {
      state.error = null;
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
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Track feature
      .addCase(trackFeature.fulfilled, () => {
        // Successfully tracked, no state update needed
      })
      .addCase(trackFeature.rejected, (state, action) => {
        console.error('Track error:', action.payload);
      });
  },
});

export const { setFilters, setSelectedFeature, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
