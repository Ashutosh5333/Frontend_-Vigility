import React, { memo, useCallback, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { HiChartBar } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { setSelectedFeature } from '../../redux/analyticsSlice';
import { useTracker } from '../../hooks/useTracker';
import { FEATURE_NAMES } from '../../constants';
import { getBarChartConfig } from '../../utils/chartConfig';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = memo(({ data, selectedFeature }) => {
  const dispatch = useDispatch();
  const track = useTracker();
  
  const handleBarClick = useCallback((featureName) => {
    dispatch(setSelectedFeature(featureName));
    track(FEATURE_NAMES.BAR_CHART_CLICK);
  }, [dispatch, track]);
  
  const chartConfig = useMemo(() => {
    if (!data || data.length === 0) return null;
    return getBarChartConfig(data, selectedFeature, handleBarClick);
  }, [data, selectedFeature, handleBarClick]);
  
  const isEmpty = !data || data.length === 0;
  
  return (
    <Card className="mb-6">
      <div className="h-80">
        {isEmpty ? (
          <EmptyState
            icon={HiChartBar}
            title="No data available"
            description="Adjust your filters or wait for more data to be collected"
          />
        ) : (
          <motion.div
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Bar data={chartConfig.data} options={chartConfig.options} />
          </motion.div>
        )}
      </div>
      
      {!isEmpty && (
        <motion.p
          className="text-sm text-gray-500 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          💡 Click on any bar to view its daily trend
        </motion.p>
      )}
    </Card>
  );
});

BarChart.displayName = 'BarChart';

export default BarChart;
