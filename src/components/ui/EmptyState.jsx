import React, { memo } from 'react';
import { motion } from 'framer-motion';

const EmptyState = memo(({ 
  icon: Icon, 
  title, 
  description, 
  action 
}) => (
  <motion.div
    className="flex flex-col items-center justify-center py-12 text-center"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    {Icon && (
      <div className="mb-4 text-gray-300">
        <Icon className="w-16 h-16 mx-auto" />
      </div>
    )}
    
    {title && (
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    )}
    
    {description && (
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
    )}
    
    {action && <div>{action}</div>}
  </motion.div>
));

EmptyState.displayName = 'EmptyState';

export default EmptyState;
