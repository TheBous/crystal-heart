/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { registerables, Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(...registerables, zoomPlugin);

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
    zoom: {
      zoom: {
        wheel: {
          enabled: true, // SET SCROOL ZOOM TO TRUE
        },
      },
      pan: {
        enabled: true,
      },
    },
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