import React, { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setFilters, 
  setDatePreset,
  selectFilters 
} from '../../redux/analyticsSlice';
import { useTracker } from '../../hooks/useTracker';
import { 
  DATE_PRESETS, 
  DATE_PRESET_OPTIONS, 
  FEATURE_NAMES 
} from '../../constants';
import { getDateRangeFromPreset } from '../../utils/dateUtils';
import classNames from 'classnames';

const DateFilter = memo(({ onFilterChange }) => {
  const dispatch = useDispatch();
  const track = useTracker();
  const filters = useSelector(selectFilters);
  
  const [localStartDate, setLocalStartDate] = useState(
    filters.startDate ? new Date(filters.startDate) : null
  );
  const [localEndDate, setLocalEndDate] = useState(
    filters.endDate ? new Date(filters.endDate) : null
  );
  const [activePreset, setActivePreset] = useState(
    filters.datePreset || DATE_PRESETS.LAST_7_DAYS
  );
  
  // Initialize with preset on mount
  // useEffect(() => {
  //   if (activePreset !== DATE_PRESETS.CUSTOM && !filters.startDate) {
  //     handlePresetChange(activePreset);
  //   }
  // }, []);
  
 

  const handlePresetChange = useCallback((preset) => {
    setActivePreset(preset);
    dispatch(setDatePreset(preset));
    track(FEATURE_NAMES.DATE_PRESET_CHANGE);
    
    if (preset === DATE_PRESETS.CUSTOM) {
      // Don't auto-set dates for custom, let user pick
      return;
    }
    
    
    const { startDate, endDate } = getDateRangeFromPreset(preset);
    
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    
    dispatch(setFilters({
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      endDate: endDate ? endDate.toISOString().split('T')[0] : null,
    }));
    
    track(FEATURE_NAMES.DATE_FILTER);
    
    if (onFilterChange) {
      onFilterChange();
    }
  }, [dispatch, track, onFilterChange]);

  useEffect(() => {
    if (activePreset !== DATE_PRESETS.CUSTOM && !filters.startDate) {
      handlePresetChange(activePreset);
    }
  }, [activePreset, filters.startDate, handlePresetChange]);
  
  const handleStartDateChange = useCallback((date) => {
    setLocalStartDate(date);
    setActivePreset(DATE_PRESETS.CUSTOM);
    
    const dateStr = date ? date.toISOString().split('T')[0] : null;
    dispatch(setFilters({ startDate: dateStr }));
    dispatch(setDatePreset(DATE_PRESETS.CUSTOM));
    track(FEATURE_NAMES.DATE_FILTER);
    
    if (onFilterChange) {
      onFilterChange();
    }
  }, [dispatch, track, onFilterChange]);
  
  const handleEndDateChange = useCallback((date) => {
    setLocalEndDate(date);
    setActivePreset(DATE_PRESETS.CUSTOM);
    
    const dateStr = date ? date.toISOString().split('T')[0] : null;
    dispatch(setFilters({ endDate: dateStr }));
    dispatch(setDatePreset(DATE_PRESETS.CUSTOM));
    track(FEATURE_NAMES.DATE_FILTER);
    
    if (onFilterChange) {
      onFilterChange();
    }
  }, [dispatch, track, onFilterChange]);
  
  const isCustom = activePreset === DATE_PRESETS.CUSTOM;
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        
        {/* Preset Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {DATE_PRESET_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handlePresetChange(option.value)}
              className={classNames(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                {
                  'bg-primary-600 text-white shadow-md': activePreset === option.value,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200': activePreset !== option.value,
                }
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Custom Date Pickers - Animated */}
      <AnimatePresence>
        {isCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <DatePicker
                selected={localStartDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={localStartDate}
                endDate={localEndDate}
                maxDate={localEndDate || new Date()}
                dateFormat="MMM d, yyyy"
                placeholderText="Select start date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                isClearable
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <DatePicker
                selected={localEndDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={localStartDate}
                endDate={localEndDate}
                minDate={localStartDate}
                maxDate={new Date()}
                dateFormat="MMM d, yyyy"
                placeholderText="Select end date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                isClearable
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DateFilter.displayName = 'DateFilter';

export default DateFilter;
