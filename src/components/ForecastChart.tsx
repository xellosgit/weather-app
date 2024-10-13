import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Реєстрація необхідних компонентів
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const ForecastChart: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.main || !data.weather) {
    return <div>No data available</div>; // Відображення повідомлення про відсутність даних
  }

  const cityName = data.city || "Unknown City"; // Отримання назви міста
  const temperature = data.main.temp; // Отримання температури

  const chartData = {
    labels: data.weather.map((item: any) => item.description), // Використання описів погоди як міток
    datasets: [
      {
        label: "Temperature (°C)",
        data: [temperature], // Зміна на правильний формат даних
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>{cityName}</h2> {/* Відображаємо назву міста */}
      <h3>Current Temperature: {temperature}°C</h3>{" "}
      {/* Відображаємо температуру */}
      <Line data={chartData} />
    </div>
  );
};

export default ForecastChart;
