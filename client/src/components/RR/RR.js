/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';

const RR = ({ rrDistancesMs = [] }) => {
  // Dati del grafico
  const data = {
    labels: Array.from({ length: rrDistancesMs.length }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'Distanze RR (ms)',
        data: rrDistancesMs,
      },
    ],
  };

  // Opzioni del grafico
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Distanza RR (ms)',
        },
      },
    },
  };

  return (
      <div>
          <Line data={data} options={options} />
      </div>
  );
};

export default RR;