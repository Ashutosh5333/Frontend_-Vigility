import React, { memo } from 'react';
import classNames from 'classnames';

const Input = memo(({ 
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) => {
  const inputClasses = classNames(
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    {
      'border-danger-300 focus:ring-danger-500': error,
      'border-gray-300': !error,
      'pl-10': Icon,
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
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input className={inputClasses} {...props} />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
