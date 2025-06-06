import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ WeatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === WeatherData.isDay &&
      option.condition === WeatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[WeatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{WeatherData.temp.F}&deg;F</p>
      <img
        src={weatherOption?.url}
        alt={`Weather is ${WeatherData.isDay ? "day" : "night"} and ${
          WeatherData.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
