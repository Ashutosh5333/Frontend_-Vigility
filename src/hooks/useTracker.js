import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { trackFeature } from '../redux/analyticsSlice';

/**
 * Custom hook for tracking user interactions
 * @returns {Function} track function
 */
export const useTracker = () => {
  const dispatch = useDispatch();

  const track = useCallback((featureName) => {
    if (featureName) {
      dispatch(trackFeature(featureName));
    }
  }, [dispatch]);

  return track;
};

export default useTracker;
