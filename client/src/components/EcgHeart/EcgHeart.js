/* eslint-disable react/prop-types */
import { memo } from "react";
import { Line } from "react-chartjs-2";
import { registerables, Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(...registerables, zoomPlugin);

const EcgChart = ({ ecgData = [] }) => {
    const labels = ecgData.map(_data => _data.timestamp);
    const data = ecgData.map(_data => _data.sample);

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
                pointBackgroundColor: (context) => {
                    const index = context.dataIndex;
                    if (ecgData[index] && ecgData[index].isRR) {
                        return 'red';
                    } else {
                        return "rgb(75, 192, 192)";
                    }
                },
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
