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

export const MiniChart = ({
  list,
  isIncreased,
}: {
  list: TList;
  isIncreased: boolean;
}) => {
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
    labels: prices!.map((price) => moment(price[0]).format(`MMM. DD HH:mm`)),
    datasets: [
      {
        borderWidth: 2,
        backgroundColor: isIncreased
          ? `rgba(40, 167, 69, .9)`
          : `rgba(229, 62, 62, .9)`,
        borderColor: isIncreased
          ? `rgba(40, 167, 69, .9)`
          : `rgba(229, 62, 62, .9)`,
        data: prices!.map((price: number[]) => price[1]),
      },
    ],
  };

  return <Line options={options} data={data} />;
};
