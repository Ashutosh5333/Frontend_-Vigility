import { CHART_COLORS, CHART_CONFIG } from '../constants';

/**
 * Get common chart options
 * @param {Object} customOptions 
 * @returns {Object} Chart options
 */
export const getCommonChartOptions = (customOptions = {}) => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: '500',
        },
        padding: 15,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: '600',
      },
      bodyFont: {
        size: 13,
      },
      displayColors: true,
      boxPadding: 6,
    },
  },
  ...customOptions,
});

/**
 * Get bar chart configuration
 * @param {Array} data 
 * @param {string} selectedFeature 
 * @param {Function} onClick 
 * @returns {Object} Chart configuration
 */
export const getBarChartConfig = (data, selectedFeature, onClick) => {
  const chartData = {
    labels: data.map((item) => item.feature_name),
    datasets: [
      {
        label: 'Total Clicks',
        data: data.map((item) => parseInt(item.click_count)),
        backgroundColor: data.map((item) =>
          item.feature_name === selectedFeature
            ? CHART_COLORS.primary
            : CHART_COLORS.primaryLight
        ),
        borderColor: CHART_COLORS.primary,
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: CHART_CONFIG.BAR_CHART.MAX_BAR_THICKNESS,
      },
    ],
  };

  const options = getCommonChartOptions({
    onClick: (event, elements) => {
      if (elements.length > 0 && onClick) {
        const index = elements[0].index;
        const featureName = data[index].feature_name;
        onClick(featureName);
      }
    },
    plugins: {
      ...getCommonChartOptions().plugins,
      title: {
        display: true,
        text: 'Feature Usage Analytics',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color: '#1e293b',
      },
      tooltip: {
        ...getCommonChartOptions().plugins.tooltip,
        callbacks: {
          label: (context) => `Clicks: ${context.parsed.y.toLocaleString()}`,
          afterLabel: () => '👆 Click to view time trend',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: 11,
          },
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: CHART_COLORS.grid,
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  });

  return { data: chartData, options };
};

/**
 * Get line chart configuration
 * @param {Array} data 
 * @param {string} selectedFeature 
 * @returns {Object} Chart configuration
 */
export const getLineChartConfig = (data, selectedFeature) => {
  const chartData = {
    labels: data.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: `${selectedFeature || 'Feature'}`,
        data: data.map((item) => parseInt(item.click_count)),
        fill: true,
        backgroundColor: CHART_COLORS.primaryLighter,
        borderColor: CHART_COLORS.primary,
        borderWidth: 3,
        tension: CHART_CONFIG.LINE_CHART.TENSION,
        pointRadius: CHART_CONFIG.LINE_CHART.POINT_RADIUS,
        pointHoverRadius: CHART_CONFIG.LINE_CHART.POINT_HOVER_RADIUS,
        pointBackgroundColor: CHART_COLORS.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: CHART_COLORS.primary,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = getCommonChartOptions({
    plugins: {
      ...getCommonChartOptions().plugins,
      title: {
        display: true,
        text: selectedFeature 
          ? `Daily Trend: ${selectedFeature.replace(/_/g, ' ').toUpperCase()}`
          : 'Select a feature to view trend',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color: '#1e293b',
      },
      tooltip: {
        ...getCommonChartOptions().plugins.tooltip,
        callbacks: {
          label: (context) => `Clicks: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: 11,
          },
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: CHART_COLORS.grid,
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  });

  return { data: chartData, options };
};


const chartUtils = {
  getCommonChartOptions,
  getBarChartConfig,
  getLineChartConfig,
};

export default chartUtils;