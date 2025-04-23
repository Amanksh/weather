import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const API_KEY = "797de55c03e83f69dba7120fc9362b84";
const DEFAULT_CITY = "Lucknow";

const WeatherCard = ({ weather }) => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col bg-white rounded-3xl p-6 w-full max-w-xs shadow-xl text-gray-800">
      <div className="font-bold text-2xl text-center">{weather.name}</div>
      <div className="text-sm text-gray-500 text-center">{currentDate}</div>
      <div className="mt-6 self-center inline-flex items-center justify-center rounded-full text-indigo-400 h-24 w-24">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="weather icon"
          className="w-24 h-24"
        />
      </div>
      <div className="flex flex-row items-center justify-center mt-6">
        <div className="font-medium text-6xl">
          {Math.round(weather.main.temp)}°
        </div>
        <div className="flex flex-col items-center ml-6">
          <div className="capitalize text-lg">
            {weather.weather[0].description}
          </div>
          <div className="mt-1">
            <span className="text-sm font-light text-gray-500">
              Max: {Math.round(weather.main.temp_max)}°C
            </span>
          </div>
          <div>
            <span className="text-sm font-light text-gray-500">
              Min: {Math.round(weather.main.temp_min)}°C
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-6">
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Wind</div>
          <div className="text-sm text-gray-500">{weather.wind.speed} m/s</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Humidity</div>
          <div className="text-sm text-gray-500">{weather.main.humidity}%</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Visibility</div>
          <div className="text-sm text-gray-500">
            {(weather.visibility / 1000).toFixed(1)} km
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center p-6">
      {loading ? (
        <div className="text-white text-xl flex items-center gap-2 animate-pulse">
          <LoaderCircle className="animate-spin" /> Loading weather...
        </div>
      ) : weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <div className="text-white text-xl">Unable to load weather data</div>
      )}
    </div>
  );
};

export default App;
