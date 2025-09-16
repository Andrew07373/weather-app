import React from "react";

function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

export default function WeatherCard({ data, unit = "C" }) {
  const temp = Math.round(data.main.temp);
  const displayTemp = unit === "C" ? `${temp}°C` : `${cToF(temp)}°F`;
  const icon = data.weather[0].icon;
  return (
    <section className="weatherCard" aria-live="polite">
      <div className="top">
        <h2>
          {data.name}, {data.sys.country}
        </h2>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </div>
      <div className="main">
        <p className="temp">{displayTemp}</p>
        <p className="desc">{data.weather[0].description}</p>
        <p>
          Humidity: {data.main.humidity}% · Wind: {Math.round(data.wind.speed)}{" "}
          m/s
        </p>
      </div>
    </section>
  );
}
