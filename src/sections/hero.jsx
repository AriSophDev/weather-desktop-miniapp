import Heart from "../assets/heart.svg";
import "./hero.css";

export function Hero() {
  return (
    <div className="hero">
      <div className="heart">
        <img src={Heart} alt="a pixelart of heart" />
      </div>
      <a className="texto" href="">
        Your City
      </a>

      <div className="button-box">
        <button className="button-f">°F</button>
        <button className="button-c">°C</button>
      </div>
    </div>
  );
}
