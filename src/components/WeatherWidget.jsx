import { Component } from "react";
import WeatherControls from "./WeatherControls";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherWidget.scss";

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windUnit: "ms",
      tempUnit: "celsius",
    };
  }

  componentDidMount() {
    const savedWind = localStorage.getItem("weather_windUnit");
    const savedTemp = localStorage.getItem("weather_tempUnit");

    if (savedWind || savedTemp) {
      this.setState({
        windUnit: savedWind || "ms",
        tempUnit: savedTemp || "celsius",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.windUnit !== this.state.windUnit) {
      localStorage.setItem("weather_windUnit", this.state.windUnit);
    }
    if (prevState.tempUnit !== this.state.tempUnit) {
      localStorage.setItem("weather_tempUnit", this.state.tempUnit);
    }
  }

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
      <article className="weather-widget">
        <WeatherControls
          windUnit={windUnit}
          tempUnit={tempUnit}
          onWindChange={this.handleWindChange}
          onTempChange={this.handleTempChange}
        />
        <WeatherDisplay
          displayTemp={displayTemp}
          displayWind={displayWind}
          tempSymbol={tempSymbol}
          windSymbol={windSymbol}
        />
      </article>
    );
  }
}

export default WeatherWidget;
