const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = ""; // https://openweathermap.org/api

// Інтерфейс для координат
interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getWeatherByLocation = async () => {
  // Зміна типу для об'єкта coords
  const { coords }: { coords: Coordinates } = await new Promise(
    (resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
  );

  const latitude = coords.latitude;
  const longitude = coords.longitude;

  const response = await fetch(
    `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) throw new Error("Unable to fetch weather data");

  return await response.json();
};

export const getWeatherByCity = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) throw new Error("Unable to fetch weather data");

  return await response.json();
};
