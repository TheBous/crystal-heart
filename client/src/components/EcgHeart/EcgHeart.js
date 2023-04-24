/* eslint-disable react/prop-types */
import { memo } from "react";
import { Line } from "react-chartjs-2";
import { registerables, Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(...registerables, zoomPlugin);

const EcgChart = ({ ecgData = [] }) => {
    const labels = ecgData.map((data) => {
        return data.samples.map(() => {
            return new Date(data.timestamp).toISOString().substring(17, 22);
        });
    });

    const data = ecgData
        .map((data) => {
            return data.samples;
        })
        .flat();

    const options = {
        responsive: true,
        plugins: {
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
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "ECG Chart",
            },
        },
    };

    const chartData = {
        labels: labels.flat(),
        datasets: [
            {
                label: "ECG",
                data: data,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default memo(EcgChart);
