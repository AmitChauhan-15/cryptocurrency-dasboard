import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ label, chartData, type = "line", legend }) => {
  const color = ["#60a5fa", "#f56565", "#faf089", "#7BBF4B", "#7A3A8C"];

  const datasets = chartData.map((value, i) => ({
    label: legend?.[i],
    data: value,
    fill: false,
    borderColor: type === "pie" ? "" : color[i],
    backgroundColor: type === "pie" ? value.map((_, i) => color[i]) : color[i],
    pointBackgroundColor: color[i],
    pointRadius: 1,
    borderWidth: type === "pie" ? 0 : 4,
    tension: 0,
  }));

  const data = {
    labels: label,
    datasets: datasets.length > 0 ? datasets : [],
  };

  const options = {
    interaction: {
      mode: "index", // Show tooltip on hover
      intersect: false,
    },
    elements: {
      point: {
        radius: 0, // Set point radius to 0 to remove points
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          callback: function (val, index, arr) {
            const number = Math.trunc(arr.length / 6);
            return index % number === 0 || arr.length === index + 1
              ? this.getLabelForValue(val)
              : "";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true, // Display legend as points
          pointStyle: "circle", // Set the point style to circle
          boxWidth: type === "pie" ? 8 : 6,
          boxHeight: type === "pie" ? 8 : 6,
          padding: type === "pie" ? 30 : 10,
        },
        align: type === "pie" ? "center" : "end",
        position: type === "pie" ? "right" : "top",
      },
    },
  };

  if (type === "pie") delete options.scales;

  if (type === "line") {
    return <Line data={data} options={options} />;
  } else if (type === "bar") {
    return <Bar data={data} options={options} />;
  } else if (type === "pie") {
    return <Pie data={data} options={options} />;
  }
};

export default Chart;
