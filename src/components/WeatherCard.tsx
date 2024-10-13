import React from "react";
import { WeatherData } from "../types/weatherTypes";
import "./WeatherCard.css"; // Стилі для WeatherCard

interface WeatherCardProps {
  data: WeatherData;
  onAddFavourite: (city: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, onAddFavourite }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p>{data.weather[0].description}</p>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <button onClick={() => onAddFavourite(data.name)}>
        Add to Favourites
      </button>
    </div>
  );
};

export default WeatherCard;
