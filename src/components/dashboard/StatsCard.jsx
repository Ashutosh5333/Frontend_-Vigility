import React, { memo } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const StatsCard = memo(({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  trend,
  delay = 0 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-xs text-gray-500 mt-2">{trend}</p>
          )}
        </div>
        
        {Icon && (
          <div className={classNames(
            'w-14 h-14 rounded-xl flex items-center justify-center',
            colorClasses[color]
          )}>
            <Icon className="w-7 h-7" />
          </div>
        )}
      </div>
    </motion.div>
  );
});

StatsCard.displayName = 'StatsCard';

export default StatsCard;
