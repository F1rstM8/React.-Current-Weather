import { Component } from "react";

class WeatherControls extends Component {
  render() {
    const { windUnit, tempUnit, onWindChange, onTempChange } = this.props;

    return (
      <section className="weather-controls" aria-label="Weather settings">
        <div className="control-group">
          <label htmlFor="wind-select">Wind speed unit:</label>
          <select
            id="wind-select"
            value={windUnit}
            onChange={onWindChange}
            className="weather-select"
          >
            <option value="ms">M/s</option>
            <option value="kmh">Km/h</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="temp-select">Temperature unit:</label>
          <select
            id="temp-select"
            value={tempUnit}
            onChange={onTempChange}
            className="weather-select"
          >
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
        </div>
      </section>
    );
  }
}

export default WeatherControls;
