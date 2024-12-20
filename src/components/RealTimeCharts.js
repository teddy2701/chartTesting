"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const RealTimeCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100),
        sinValue: Math.sin(Date.now() / 1000) * 50 + 50,
        cosValue: Math.cos(Date.now() / 1000) * 50 + 50,
      };

      setData((prevData) => [...prevData.slice(-20), newData]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const lineChartData = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label: "Nilai 1",
        data: data.map((d) => d.value),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Nilai 2",
        data: data.map((d) => d.sinValue),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: data.slice(-5).map((d) => d.time),
    datasets: [
      {
        label: "Nilai 1",
        data: data.slice(-5).map((d) => d.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Nilai 2",
        data: data.slice(-5).map((d) => d.cosValue),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Nilai 1", "Nilai 2"],
    datasets: [
      {
        data: [
          data[data.length - 1]?.value || 0,
          100 - (data[data.length - 1]?.value || 0),
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const polarAreaData = {
    labels: ["Nilai 1", "Nilai 2", "Nilai 3"],
    datasets: [
      {
        data: [
          data[data.length - 1]?.value || 0,
          data[data.length - 2]?.value || 0,
          data[data.length - 3]?.value || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Line Chart</h2>
        <Line data={lineChartData} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
        <Bar data={barChartData} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Pie Chart</h2>
        <Pie data={pieChartData} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Polar Area Chart</h2>
        <PolarArea data={polarAreaData} />
      </div>
    </div>
  );
};

export default RealTimeCharts;
