import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const formatDate = (date) => {
  if (typeof date === "number") {
    const excelDate = new Date((date - 25569) * 86400 * 1000);
    return excelDate.toLocaleDateString();
  }

  if (typeof date === "string") {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString();
  }

  if (date instanceof Date && !isNaN(date)) {
    return date.toLocaleDateString();
  }

  return "Invalid Date";
};

const parseCallScore = (scoreCall) => {
  const lines = scoreCall.split("\n");
  const scores = lines.map((line) => {
    const match = line.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0; 
  });
  return scores.reduce((a, b) => a + b, 0) / scores.length; 
};

const parseOverallScore = (scoreCall) => {
  return parseFloat(scoreCall); 
};

const CallScoresChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => formatDate(item.Date)),
    datasets: [
      {
        label: "Call Scores",
        data: data.map((item) => parseCallScore(item.score_call)),
        backgroundColor: "rgba(75, 192, 192, 0.6)", 
        borderColor: "rgba(75, 192, 192, 1)", 
        borderWidth: 1, 
      },
      {
        label: "Overall Call Scores",
        data: data.map((item) => parseOverallScore(item["Overall Call score"])),
        backgroundColor: "rgba(153, 102, 255, 0.6)", 
        borderColor: "rgba(153, 102, 255, 1)", 
        borderWidth: 1, 
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Call Scores and Overall Call Scores",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "800px", height: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "centre", marginBottom: "30px"}}>Call Scores</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CallScoresChart;
