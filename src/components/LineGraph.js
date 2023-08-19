import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-adapter-luxon';
Chart.register(...registerables);

const LineGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const data = response.data;

        const sortedData = Object.entries(data.cases || {}).sort((a, b) => new Date(a[0]) - new Date(b[0]));

        const chartData = {
          labels: sortedData.map(([date]) => date),
          datasets: [
            {
              label: 'Cases',
              data: sortedData.map(([date, cases]) => ({ x: date, y: cases })),
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        };

        if (chartRef.current) {
          chartRef.current.data = chartData;
          chartRef.current.update();
        } else {
          chartRef.current = new Chart(document.getElementById('line-chart'), {
            type: 'line',
            data: chartData,
            options: {
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">COVID-19 Cases Over Time</h2>
      <div className="p-4 shadow-md rounded-lg w-full lg:w-3/4 xl:w-1/2">
        <canvas id="line-chart" style={{ width: '100%', height: '400px' }} />
      </div>
    </div>
  );
};

export default LineGraph;
