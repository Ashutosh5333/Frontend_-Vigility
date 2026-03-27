import React, { memo, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { motion } from 'framer-motion';
import { HiTrendingUp } from 'react-icons/hi';
import { getLineChartConfig } from '../../utils/chartConfig';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = memo(({ data, selectedFeature }) => {
  const chartConfig = useMemo(() => {
    if (!data || data.length === 0) return null;
    return getLineChartConfig(data, selectedFeature);
  }, [data, selectedFeature]);
  
  const hasData = selectedFeature && data && data.length > 0;
  
  return (
    <Card className="mb-6">
      <div className="h-80">
        {!hasData ? (
          <EmptyState
            icon={HiTrendingUp}
            title={selectedFeature ? 'No trend data available' : 'Select a feature'}
            description={
              selectedFeature 
                ? 'Try adjusting your date range or filters'
                : 'Click on any bar in the chart above to view its daily trend'
            }
          />
        ) : (
          <motion.div
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={selectedFeature}
          >
            <Line data={chartConfig.data} options={chartConfig.options} />
          </motion.div>
        )}
      </div>
    </Card>
  );
});

LineChart.displayName = 'LineChart';

export default LineChart;
