import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setFilters } from '../redux/analyticsSlice';
import { trackFeature } from '../redux/analyticsSlice';

const Filters = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.analytics);

  const [startDate, setStartDate] = useState(
    filters.startDate ? new Date(filters.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    filters.endDate ? new Date(filters.endDate) : null
  );
  const [age, setAge] = useState(filters.age || 'All');
  const [gender, setGender] = useState(filters.gender || 'All');

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const dateStr = date ? date.toISOString().split('T')[0] : null;
    dispatch(setFilters({ startDate: dateStr }));
    dispatch(trackFeature('date_filter'));
    if (onFilterChange) onFilterChange();
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    const dateStr = date ? date.toISOString().split('T')[0] : null;
    dispatch(setFilters({ endDate: dateStr }));
    dispatch(trackFeature('date_filter'));
    if (onFilterChange) onFilterChange();
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    dispatch(setFilters({ age: value }));
    dispatch(trackFeature('age_filter'));
    if (onFilterChange) onFilterChange();
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    dispatch(setFilters({ gender: value }));
    dispatch(trackFeature('gender_filter'));
    if (onFilterChange) onFilterChange();
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setAge('All');
    setGender('All');
    dispatch(setFilters({ 
      startDate: null, 
      endDate: null, 
      age: 'All', 
      gender: 'All' 
    }));
    dispatch(trackFeature('reset_filters'));
    if (onFilterChange) onFilterChange();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate || new Date()}
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
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="MMM d, yyyy"
            placeholderText="Select end date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            isClearable
          />
        </div>

        {/* Age Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Group
          </label>
          <select
            value={age}
            onChange={handleAgeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="All">All Ages</option>
            <option value="<18">&lt; 18</option>
            <option value="18-40">18 - 40</option>
            <option value=">40">&gt; 40</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
