import React from 'react';
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
  ChartData,
  ChartOptions,
} from 'chart.js';
import { TList } from 'types/lists';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const MiniChart = ({ list }: { list: TList }) => {
  const { prices } = list;

  const options: ChartOptions<any> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const data: ChartData<'line', number[], string> = {
    labels: prices!.map((price) => moment(price[0]).format(`YY/MM/DD hh:mm`)),
    datasets: [
      {
        borderWidth: 2,
        backgroundColor: `rgba(40, 167, 69, .9)`,
        borderColor: `rgba(40, 167, 69, .9)`,
        data: prices!.map((price: number[]) => price[1]),
      },
    ],
  };

  return <Line options={options} data={data} />;
};
