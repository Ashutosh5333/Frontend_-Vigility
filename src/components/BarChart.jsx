import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { setSelectedFeature, trackFeature } from '../redux/analyticsSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, selectedFeature }) => {
  const dispatch = useDispatch();
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map((item) => item.feature_name),
    datasets: [
      {
        label: 'Total Clicks',
        data: data.map((item) => parseInt(item.click_count)),
        backgroundColor: data.map((item) =>
          item.feature_name === selectedFeature
            ? 'rgba(14, 165, 233, 0.8)'
            : 'rgba(14, 165, 233, 0.5)'
        ),
        borderColor: data.map((item) =>
          item.feature_name === selectedFeature
            ? 'rgba(14, 165, 233, 1)'
            : 'rgba(14, 165, 233, 0.8)'
        ),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const featureName = data[index].feature_name;
        dispatch(setSelectedFeature(featureName));
        dispatch(trackFeature('bar_chart_click'));
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: 'Feature Usage (Total Clicks)',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Inter', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context) {
            return `Clicks: ${context.parsed.y}`;
          },
          afterLabel: function () {
            return 'Click to view time trend';
          },
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
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
      <div className="h-80">
        {data.length > 0 ? (
          <Bar ref={chartRef} data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="mt-2">No data available</p>
              <p className="text-sm text-gray-400 mt-1">Adjust your filters or wait for more data</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Click on a bar to view its time trend
      </p>
    </div>
  );
};

export default BarChart;
