import { useState } from "preact/hooks";
import Heart from "../assets/heart.svg";
import "./hero.css";

const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

export function Hero({ cityName, onSearch, unit, onUnitChange }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `${GEO_API}?name=${encodeURIComponent(query.trim())}&count=5&language=es`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Error searching city:", err);
      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  function selectCity(city) {
    onSearch(city.latitude, city.longitude, city.name);
    setShowSearch(false);
    setQuery("");
    setResults([]);
  }

  return (
    <>
      <div className="hero">
        <div className="heart">
          <img src={Heart} alt="a pixelart of heart" />
        </div>
        <button className="city-btn" onClick={() => setShowSearch(true)}>
          {cityName} ▾
        </button>

        <div className="button-box">
          <button className={`button-f ${unit === "F" ? "active" : ""}`} onClick={() => onUnitChange("F")}>°F</button>
          <button className={`button-c ${unit === "C" ? "active" : ""}`} onClick={() => onUnitChange("C")}>°C</button>
        </div>
      </div>

      {showSearch && (
        <div className="search-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                className="search-input"
                type="text"
                placeholder="Buscar ciudad..."
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-go" type="submit">
                →
              </button>
            </form>

            {searching && <div className="search-status">Buscando...</div>}

            <div className="search-results">
              {results.map((city) => (
                <button
                  key={city.id}
                  className="search-result"
                  onClick={() => selectCity(city)}
                >
                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ""}
                  {city.country ? ` - ${city.country}` : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
