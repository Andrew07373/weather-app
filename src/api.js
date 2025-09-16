// src/api.js
const BASE = "https://api.openweathermap.org/data/2.5";
const KEY = import.meta.env.VITE_OWM_API_KEY;

export async function fetchCurrentWeather(cityOrCoords) {
  // cityOrCoords: {q: 'London'} or {lat, lon}
  const params = new URLSearchParams({
    units: "metric",
    appid: KEY,
    ...(cityOrCoords.q
      ? { q: cityOrCoords.q }
      : { lat: cityOrCoords.lat, lon: cityOrCoords.lon }),
  });
  const res = await fetch(`${BASE}/weather?${params.toString()}`);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function fetchForecast(city) {
  const params = new URLSearchParams({ q: city, units: "metric", appid: KEY });
  const res = await fetch(`${BASE}/forecast?${params.toString()}`);
  if (!res.ok) throw new Error("Forecast not found");
  return res.json();
}
