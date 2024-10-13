import React from "react";
import { Line } from "react-chartjs-2";

const ForecastChart: React.FC<{ data: any }> = ({ data }) => {
  const chartData = {
    labels: data.daily.map((day: any) =>
      new Date(day.dt * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.daily.map((day: any) => day.temp.day),
        borderColor: "blue",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ForecastChart;
