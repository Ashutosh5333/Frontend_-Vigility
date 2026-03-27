import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import analyticsReducer from './analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['analytics/setFilters'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['analytics.lastFetched'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
