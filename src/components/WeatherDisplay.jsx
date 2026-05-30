import { Component } from "react";

class WeatherDisplay extends Component {
  render() {
    const { displayTemp, displayWind, tempSymbol, windSymbol } = this.props;

    return (
      <section className="weather-display" aria-label="Current weather data">
        <h2 className="weather-title">Current Weather</h2>

        <div className="weather-info">
          <div className="info-row">
            <i className="fas fa-temperature-half icon" aria-hidden="true"></i>
            <span>
              {displayTemp.toFixed(1)} {tempSymbol}
            </span>
          </div>

          <div className="info-row">
            <i className="fas fa-wind icon" aria-hidden="true"></i>
            <span>
              {displayWind.toFixed(1)} {windSymbol}
            </span>
          </div>
        </div>
      </section>
    );
  }
}

export default WeatherDisplay;
