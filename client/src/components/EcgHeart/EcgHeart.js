/* eslint-disable react/prop-types */
import { memo } from "react";
import { Line } from "react-chartjs-2";
import { registerables, Chart as ChartJS } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { addMilliseconds, differenceInMilliseconds } from "date-fns";

ChartJS.register(...registerables, zoomPlugin);

const frequency = 125;
const measuresInASecond = 1 / frequency;
const msMeasuresInASecond = measuresInASecond * 1000;


const EcgChart = ({ ecgData = [] }) => {
    const labels = ecgData.map((data) => {
        return data.samples.map((_, index) => {
            let timestamp = data.timestamp;
            if (index !== 0) {
                const time = index * msMeasuresInASecond;
                timestamp = addMilliseconds(new Date(data.timestamp), time);
            }

            const printedTimestamp = differenceInMilliseconds(new Date(timestamp), new Date(ecgData[0].timestamp));
            // return new Date(timestamp).toISOString().substring(17, 22);
            return printedTimestamp;
        });
    });
    window.labels = labels;

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
