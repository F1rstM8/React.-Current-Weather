import { Component } from "react";
import "./WeatherControls.scss";

class WeatherControls extends Component {
  render() {
    const {
      windUnit,
      tempUnit,
      onWindChange,
      onTempChange,
      searchInput,
      onSearchChange,
      onSearchSubmit,
    } = this.props;

    return (
      <section className="weather-controls" aria-label="Weather settings">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Введіть місто..."
            value={searchInput}
            onChange={onSearchChange}
          />
          <button type="submit" className="search-button" aria-label="Search">
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </form>

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