import "./App.css";
import { Hero } from "./sections/hero.jsx";
import Windowbar from "./components/windowbar.jsx";

function App() {
  return (
    <div className="home">
      <Windowbar />
      <Hero />
    </div>
  );
}

export default App;
