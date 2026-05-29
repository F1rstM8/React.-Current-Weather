import { Component } from "react";
import "./WeatherWidget.css";

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windUnit: "ms",
      tempUnit: "celsius",
    };
  }
constructor(props) {
    super(props);
    this.state = {
      windUnit: 'ms', 
      tempUnit: 'celsius' 
    };
  }

  componentDidMount() {
    const savedWind = localStorage.getItem('weather_windUnit');
    const savedTemp = localStorage.getItem('weather_tempUnit');

    if (savedWind || savedTemp) {
      this.setState({
        windUnit: savedWind || 'ms',
        tempUnit: savedTemp || 'celsius'
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.windUnit !== this.state.windUnit) {
      localStorage.setItem('weather_windUnit', this.state.windUnit);
    }
    if (prevState.tempUnit !== this.state.tempUnit) {
      localStorage.setItem('weather_tempUnit', this.state.tempUnit);
    }
  }

  handleWindChange = (event) => {
    this.setState({ windUnit: event.target.value });
  };
  // ... остальной код остается без изменений ...
  handleWindChange = (event) => {
    this.setState({ windUnit: event.target.value });
  };

  handleTempChange = (event) => {
    this.setState({ tempUnit: event.target.value });
  };

  render() {
    const { windUnit, tempUnit } = this.state;
    const baseTempC = 17.6;
    const baseWindMs = 3.4;
    const displayTemp =
      tempUnit === "celsius" ? baseTempC : baseTempC * 1.8 + 32;

    const displayWind = windUnit === "ms" ? baseWindMs : baseWindMs * 3.6;

    const tempSymbol = tempUnit === "celsius" ? "°C" : "°F";
    const windSymbol = windUnit === "ms" ? "M/s" : "Km/h";

    return (
      <div className="weather-widget">
        <div className="weather-controls">
          <div className="control-group">
            <label htmlFor="wind-select">Wind speed unit:</label>
            <select
              id="wind-select"
              value={windUnit}
              onChange={this.handleWindChange}
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
              onChange={this.handleTempChange}
              className="weather-select"
            >
              <option value="celsius">°C</option>
              <option value="fahrenheit">°F</option>
            </select>
          </div>
        </div>

        <div className="weather-display">
          <h2 className="weather-title">Current Weather</h2>

          <div className="weather-info">
            <div className="info-row">
              <i className="fas fa-temperature-half icon"></i>
              <span>
                {displayTemp.toFixed(1)} {tempSymbol}
              </span>
            </div>

            <div className="info-row">
              <i className="fas fa-wind icon"></i>
              <span>
                {displayWind.toFixed(1)} {windSymbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherWidget;
