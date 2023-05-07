/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { registerables, Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { format, parseISO } from "date-fns";

ChartJS.register(...registerables, zoomPlugin);

const RR = ({ rrDistancesMs = [], label = "" }) => {
  const data = {
    // labels: Array.from({ length: rrDistancesMs.length }, (_, i) => (i + 1).toString()),
    labels: rrDistancesMs.map(({ timestamp }) => format(parseISO(timestamp), "HH:mm:ss")),
    datasets: [
      {
        label,
        data: rrDistancesMs.map(({ value }) => value),
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
        text: label,
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