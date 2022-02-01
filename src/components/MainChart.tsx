import React, { useContext, useEffect, useState } from 'react';
import { THistory } from 'types/lists';
import { getCoinChartHistory } from '@/builder/lists';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { CoinContext } from '@/contexts/CoinContext';
import { Line } from 'react-chartjs-2';
import {
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from 'chart.js';
import moment from 'moment';
import { _DeepPartialObject } from 'chart.js/types/utils';

export const MainChart = () => {
  const { id, name } = useContext(CoinContext);
  const [prices, setPrices] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res: THistory = await getCoinChartHistory(id);
      setPrices(res.prices);
      setLoading(false);
    };
    getData();
  }, [id]);

  const options:
    | _DeepPartialObject<
        CoreChartOptions<'line'> &
          ElementChartOptions<'line'> &
          PluginChartOptions<'line'> &
          DatasetChartOptions<'line'> &
          ScaleChartOptions<'line'> &
          LineControllerChartOptions
      >
    | undefined = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: `index`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value: any, index: number) {
            if (index % 12 === 0) {
              return this.getLabelForValue(value);
            }
            return ``;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    maintainAspectRatio: false,
  };

  const data: ChartData<'line', number[], string> = {
    labels: prices!.map((price) => moment(price[0]).format(`MMM. DD HH:mm`)),
    datasets: [
      {
        label: name,
        borderWidth: 2,
        borderColor: `gray`,
        data: prices!.map((price: number[]) => price[1]),
      },
    ],
  };

  return (
    <Box h={`100%`}>
      {!loading ? (
        <Box h={`100%`}>
          <Line height={`100%`} data={data} options={options} />
        </Box>
      ) : (
        <Center h={`100%`}>
          <Spinner />
        </Center>
      )}
    </Box>
  );
};
