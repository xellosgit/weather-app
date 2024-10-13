import React, { useEffect, useState, Suspense, useCallback } from "react";
import { getWeatherByCity } from "./services/weatherService";
import FavouriteCities from "./components/FavouriteCities";
import { useTranslation } from "react-i18next";
import "./App.css";
import "./i18n/i18n";

const ForecastChart = React.lazy(() => import("./components/ForecastChart"));

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState<any>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    const storedCities = localStorage.getItem("favouriteCities");
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    }

    getCityByIP().then((city) => {
      if (city) {
        setCurrentCity(city);
        getWeatherByCity(city)
          .then((newWeather) => {
            setWeather({ ...newWeather, city });
            handleAddCity(city);
          })
          .catch(console.error);
      }
    });
  }, []);

  const getCityByIP = async () => {
    try {
      const response = await fetch("http://ip-api.com/json/");
      const data = await response.json();
      return data.city;
    } catch (error) {
      console.error("Error fetching city by IP:", error);
      return null;
    }
  };

  const handleWeatherChange = async (city: string) => {
    try {
      const newWeather = await getWeatherByCity(city);
      if (newWeather) {
        setWeather({ ...newWeather, city });
        setError(null);
      }
    } catch (err) {
      setError(`City "${city}" not found.`);
    }
  };

  const handleAddCity = useCallback(
    async (city: string) => {
      try {
        const newWeather = await getWeatherByCity(city);
        if (newWeather) {
          let updatedCities: string[];

          if (cities.includes(city)) {
            updatedCities = [city, ...cities.filter((c) => c !== city)];
          } else {
            updatedCities = [city, ...cities];
          }

          setCities(updatedCities);
          localStorage.setItem(
            "favouriteCities",
            JSON.stringify(updatedCities)
          );
          setError(null);
        }
      } catch (err) {
        setError(`City "${city}" not found. Cannot add to favourites.`);
      }
    },
    [cities]
  ); // Додано cities до масиву залежностей

  const handleRemoveCity = (city: string) => {
    const updatedCities = cities.filter((c) => c !== city);
    setCities(updatedCities);
    localStorage.setItem("favouriteCities", JSON.stringify(updatedCities));
  };

  const toggleTheme = () => {
    const currentTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", currentTheme ? "dark" : "light");
  };

  return (
    <div
      className={`app ${
        document.body.classList.contains("dark-theme") ? "dark-theme" : ""
      }`}
    >
      <h1
        className={
          document.body.classList.contains("dark-theme") ? "dark-theme" : ""
        }
      >
        {t("weatherApp.title")}
      </h1>
      <div className="text-center mb-3">
        <button className="btn" onClick={toggleTheme}>
          {t("weatherApp.toggleTheme")}
        </button>
        <button className="btn" onClick={() => i18n.changeLanguage("uk")}>
          Укр
        </button>
        <button className="btn" onClick={() => i18n.changeLanguage("en")}>
          Eng
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <FavouriteCities
        cities={cities}
        currentCity={currentCity || ""}
        onWeatherChange={handleWeatherChange}
        onAddCity={handleAddCity}
        onRemoveCity={handleRemoveCity}
      />
      <Suspense fallback={<p>Loading...</p>}>
        {weather ? (
          <ForecastChart data={weather} />
        ) : (
          <p>{t("weatherApp.noWeatherData")}</p>
        )}
      </Suspense>
    </div>
  );
};

export default App;
