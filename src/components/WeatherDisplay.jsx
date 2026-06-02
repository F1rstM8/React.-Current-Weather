import { Component } from "react";
import "./WeatherDisplay.scss";
import "./WeatherWidget.scss";

class WeatherDisplay extends Component {
  render() {
    const {
      displayTemp,
      displayWind,
      tempSymbol,
      windSymbol,
      cityName,
      currentTime,
    } = this.props;
    const safeTemp = displayTemp !== undefined ? displayTemp : 0;
    const safeWind = displayWind !== undefined ? displayWind : 0;

    return (
      <section className="weather-display" aria-label="Current weather data">
        <h2 className="weather-title">Current Weather</h2>

        <p className="weather-subtitle">
          <i className="fas fa-location-dot icon-small" aria-hidden="true"></i>
          {cityName || "Невідоме місто"} • {currentTime || "--:--"}
        </p>

        <div className="weather-info">
          <div className="info-row">
            <i className="fas fa-temperature-half icon" aria-hidden="true"></i>
            <span>
              {safeTemp.toFixed(1)} {tempSymbol}
            </span>
          </div>

          <div className="info-row">
            <i className="fas fa-wind icon" aria-hidden="true"></i>
            <span>
              {safeWind.toFixed(1)} {windSymbol}
            </span>
          </div>
        </div>
      </section>
    );
  }
}

export default WeatherDisplay;
