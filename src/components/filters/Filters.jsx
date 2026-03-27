import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiRefresh } from 'react-icons/hi';
import { 
  setFilters, 
  resetFilters,
  selectFilters 
} from '../../redux/analyticsSlice';
import { useTracker } from '../../hooks/useTracker';
import { 
  AGE_OPTIONS, 
  GENDER_OPTIONS, 
  FEATURE_NAMES 
} from '../../constants';
import DateFilter from './DateFilter';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Filters = memo(({ onFilterChange }) => {
  const dispatch = useDispatch();
  const track = useTracker();
  const filters = useSelector(selectFilters);
  
  const handleAgeChange = useCallback((e) => {
    const value = e.target.value;
    dispatch(setFilters({ age: value }));
    track(FEATURE_NAMES.AGE_FILTER);
    if (onFilterChange) onFilterChange();
  }, [dispatch, track, onFilterChange]);
  
  const handleGenderChange = useCallback((e) => {
    const value = e.target.value;
    dispatch(setFilters({ gender: value }));
    track(FEATURE_NAMES.GENDER_FILTER);
    if (onFilterChange) onFilterChange();
  }, [dispatch, track, onFilterChange]);
  
  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    track(FEATURE_NAMES.RESET_FILTERS);
    if (onFilterChange) onFilterChange();
  }, [dispatch, track, onFilterChange]);
  
  return (
    <Card
      title="Filters"
      subtitle="Customize your analytics view"
      action={
        <Button
          variant="ghost"
          size="sm"
          icon={HiRefresh}
          onClick={handleReset}
        >
          Reset
        </Button>
      }
      className="mb-6"
    >
      <div className="space-y-6">
        {/* Date Filter */}
        <DateFilter onFilterChange={onFilterChange} />
        
        {/* Age and Gender Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <Select
            label="Age Group"
            options={AGE_OPTIONS}
            value={filters.age}
            onChange={handleAgeChange}
          />
          
          <Select
            label="Gender"
            options={GENDER_OPTIONS}
            value={filters.gender}
            onChange={handleGenderChange}
          />
        </div>
      </div>
    </Card>
  );
});

Filters.displayName = 'Filters';

export default Filters;
