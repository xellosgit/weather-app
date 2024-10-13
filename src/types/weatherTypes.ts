export interface Weather {
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  humidity: number;
}

export interface Wind {
  speed: number;
}

export interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
  wind: Wind;
}

export interface ForecastData {
  list: {
    dt_txt: string;
    main: Main;
    weather: Weather[];
  }[];
}
