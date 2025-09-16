import React, { useState, useEffect } from "react";
import { fetchCurrentWeather, fetchForecast } from "./api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

export default function App() {
  const [city, setCity] = useState("Bucharest");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C"); // 'C' or 'F'
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeather(city);
  }, []);

  async function loadWeather(q) {
    try {
      setLoading(true);
      setError("");
      const w = await fetchCurrentWeather({ q });
      const f = await fetchForecast(q);
      setWeather(w);
      setForecast(f);
      setCity(w.name);
    } catch (err) {
      setError(err.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  }

  function handleGeolocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);
          setError("");
          const { latitude: lat, longitude: lon } = pos.coords;
          const w = await fetchCurrentWeather({ lat, lon });
          const f = await fetchForecast(w.name);
          setWeather(w);
          setForecast(f);
          setCity(w.name);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => setError("Unable to get location")
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Weather App</h1>
        <div className="controls">
          <SearchBar onSearch={loadWeather} defaultValue={city} />
          <button onClick={handleGeolocation} aria-label="Use my location">
            Use my location
          </button>
          <button onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}>
            °{unit}
          </button>
        </div>
      </header>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard data={weather} unit={unit} />}

      {forecast && <ForecastList forecast={forecast} unit={unit} />}

      <footer>
        <small>Built with React · OpenWeatherMap API</small>
      </footer>
    </div>
  );
}
