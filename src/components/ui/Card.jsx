import React, { memo } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const Card = memo(({ 
  children, 
  title,
  subtitle,
  action,
  className = '',
  animate = true,
  hover = false,
  ...props 
}) => {
  const cardClasses = classNames(
    'bg-white rounded-xl shadow-soft overflow-hidden',
    {
      'hover:shadow-medium transition-shadow duration-300': hover,
    },
    className
  );
  
  const cardContent = (
    <>
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      
      <div className="p-6">{children}</div>
    </>
  );
  
  if (animate) {
    return (
      <motion.div
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return (
    <div className={cardClasses} {...props}>
      {cardContent}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
