import { useState } from "preact/hooks";
import "./App.css";
import { Hero } from "./sections/hero.jsx";
import Windowbar from "./components/windowbar.jsx";
import { WeatherView } from "./components/Weatherview.jsx";

function App() {
  const [cityName, setCityName] = useState("Tu Ciudad");
  const [coords, setCoords] = useState(null);
  const [unit, setUnit] = useState("C");

  function handleSearch(lat, lon, name) {
    setCoords({ lat, lon });
    setCityName(name);
  }

  return (
    <div className="home">
      <Windowbar />
      <Hero cityName={cityName} onSearch={handleSearch} unit={unit} onUnitChange={setUnit} />
      <WeatherView coords={coords} onCityName={setCityName} unit={unit} />
    </div>
  );
}

export default App;
