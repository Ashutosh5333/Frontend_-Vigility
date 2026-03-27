import React, { memo } from 'react';
import classNames from 'classnames';

const Select = memo(({ 
  label,
  options = [],
  error,
  className = '',
  ...props
}) => {
  const selectClasses = classNames(
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200 bg-white',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    {
      'border-danger-300 focus:ring-danger-500': error,
      'border-gray-300': !error,
    },
    className
  );
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <select className={selectClasses} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
