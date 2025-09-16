import React from "react";

function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

export default function ForecastList({ forecast, unit = "C" }) {
  // forecast.list contains 3-hour slices; pick one per day (e.g., midday)
  const daily = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  return (
    <section className="forecast">
      <h3>5-day forecast</h3>
      <div className="grid">
        {daily.map((f) => {
          const d = new Date(f.dt * 1000);
          const temp = Math.round(f.main.temp);
          const displayTemp = unit === "C" ? `${temp}°C` : `${cToF(temp)}°F`;
          return (
            <div
              key={f.dt}
              className="dayCard"
              aria-label={`Forecast for ${d.toDateString()}`}
            >
              <div>
                {d.toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "numeric",
                })}
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                alt={f.weather[0].description}
              />
              <div>{displayTemp}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
