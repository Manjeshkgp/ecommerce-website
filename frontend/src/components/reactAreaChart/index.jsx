import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function index({labels,dataNumberArr,label,titleText}) {
const options = {
  maintainAspectRatio:false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: titleText,
    },
  },
  tension:0.4, // by default it is 0 for straight line chart, by increasing the number the graph starts curving in a mathematical cubic manner
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: label,
      data: dataNumberArr,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  return <Line options={options} data={data} />;
}
