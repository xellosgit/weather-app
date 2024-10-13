import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface FavouriteCitiesProps {
  cities: string[];
  currentCity: string;
  onWeatherChange: (city: string) => void;
  onAddCity: (city: string) => void;
  onRemoveCity: (city: string) => void;
}

const FavouriteCities: React.FC<FavouriteCitiesProps> = ({
  cities,
  currentCity,
  onWeatherChange,
  onAddCity,
  onRemoveCity,
}) => {
  const { t } = useTranslation();
  const [newCity, setNewCity] = useState("");

  const handleAddCity = () => {
    if (newCity.trim()) {
      onAddCity(newCity.trim());
      setNewCity("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddCity();
    }
  };

  return (
    <div>
      <h2>{t("weatherApp.favouriteCities")}</h2> {}
      <div className="mb-3">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("weatherApp.addCity")}
          className="form-control"
        />
        <button className="btn mt-2" onClick={handleAddCity}>
          {t("weatherApp.addCity")} {}
        </button>
      </div>
      <ul className="list-group">
        {cities.map((city) => (
          <li
            key={city}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {city}
            {city === currentCity && (
              <span className="badge bg-info ms-2">
                {t("weatherApp.myLocation")}
              </span>
            )}
            <div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onWeatherChange(city)}
              >
                {t("weatherApp.showWeather")} {}
              </button>
              {city !== currentCity && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onRemoveCity(city)}
                >
                  {t("weatherApp.removeCity")} {}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouriteCities;
