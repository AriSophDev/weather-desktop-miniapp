import { useState, useEffect, useRef } from "react";
import "./weather.css";

const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 21) return "evening";
  return "night";
}

function mapWeatherCode(code) {
  if (code === 0) return "sunny";
  if (code <= 3) return "sunny";
  if (code <= 48) return "cloudy";
  if (code <= 67) return "rainy";
  if (code <= 77) return "cloudy";
  if (code <= 82) return "rainy";
  if (code <= 86) return "cloudy";
  return "rainy";
}

function getWeatherIcon(condition) {
  switch (condition) {
    case "sunny":
      return "☀️";
    case "cloudy":
      return "☁️";
    case "rainy":
      return "🌧️";
    default:
      return "☀️";
  }
}

function getConditionLabel(condition) {
  switch (condition) {
    case "sunny":
      return "Soleado";
    case "cloudy":
      return "Nublado";
    case "rainy":
      return "Lluvioso";
    default:
      return "Soleado";
  }
}

function RainDrops() {
  return (
    <div className="rain-container">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  return (
    <div className="clouds-container">
      <div className="cloud cloud-1">☁️</div>
      <div className="cloud cloud-2">☁️</div>
      <div className="cloud cloud-3">☁️</div>
    </div>
  );
}

function SunRays() {
  return (
    <div className="sun-container">
      <div className="sun">☀️</div>
      <div className="sun-rays" />
    </div>
  );
}

export function WeatherView({ coords, onCityName, unit }) {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [weather, setWeather] = useState("sunny");
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchWeather(lat, lon) {
      try {
        const res = await fetch(
          `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();
        const cw = data.currentweather || data.current_weather;
        if (cw) {
          setTemperature(Math.round(cw.temperature));
          setWeather(mapWeatherCode(cw.weathercode));
        }
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCityName(lat, lon) {
      try {
        const res = await fetch(
          `${GEO_API}?latitude=${lat}&longitude=${lon}&count=1`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          onCityName?.(data.results[0].name);
        }
      } catch (err) {
        console.error("Error fetching city name:", err);
      }
    }

    if (coords) {
      setLoading(true);
      fetchWeather(coords.lat, coords.lon);
    } else if (initialLoad.current) {
      initialLoad.current = false;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeather(latitude, longitude);
            fetchCityName(latitude, longitude);
          },
          () => {
            fetchWeather(-34.6037, -58.3816);
            onCityName?.("Buenos Aires");
            setLoading(false);
          }
        );
      } else {
        fetchWeather(-34.6037, -58.3816);
        onCityName?.("Buenos Aires");
        setLoading(false);
      }
    }
  }, [coords, onCityName]);

  return (
    <div className={`weather-box ${timeOfDay} ${weather}`}>
      <div className="weather-overlay" />

      {weather === "sunny" && <SunRays />}
      {weather === "cloudy" && <Clouds />}
      {weather === "rainy" && (
        <>
          <Clouds />
          <RainDrops />
        </>
      )}

      <div className="weather-content">
        <div className="weather-icon">{getWeatherIcon(weather)}</div>
        <div className="weather-temp">
          {loading ? "..." : unit === "F" ? `${Math.round(temperature * 9 / 5 + 32)}°F` : `${temperature}°C`}
        </div>
        <div className="weather-condition">
          {loading ? "Cargando..." : getConditionLabel(weather)}
        </div>
      </div>
    </div>
  );
}
