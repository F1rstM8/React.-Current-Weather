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
      city: "Krakow",
      searchInput: "",
      weatherData: null,
      isLoading: true,
      error: null,
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
    this.fetchWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.windUnit !== this.state.windUnit) {
      localStorage.setItem("weather_windUnit", this.state.windUnit);
    }
    if (prevState.tempUnit !== this.state.tempUnit) {
      localStorage.setItem("weather_tempUnit", this.state.tempUnit);
    }
  }
  fetchWeatherData = async () => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const { city } = this.state;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      this.setState({
        weatherData: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error: "City not found or network error",
        isLoading: false,
      });
    }
  };

  handleWindChange = (event) => {
    this.setState({ windUnit: event.target.value });
  };

  handleTempChange = (event) => {
    this.setState({ tempUnit: event.target.value });
  };
  handleSearchChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };
  handleSearchSubmit = (event) => {
    event.preventDefault();

    const { searchInput } = this.state;
    if (searchInput.trim() === "") return;
    this.setState({ city: searchInput, isLoading: true, error: null }, () => {
      this.fetchWeatherData();
    });
  };

  render() {
    const { windUnit, tempUnit, weatherData, isLoading, error, searchInput } =
      this.state;
    if (isLoading) {
      return (
        <article className="weather-widget weather-widget--message">
          <h2>Завантаження погоди...</h2>
        </article>
      );
    }
    if (error) {
      return (
        <article className="weather-widget weather-widget--message weather-widget--error">
          <h2>{error}</h2>
        </article>
      );
    }
    const baseTempC = weatherData.main.temp;
    const baseWindMs = weatherData.wind.speed;
    const displayTemp =
      tempUnit === "celsius" ? baseTempC : baseTempC * 1.8 + 32;
    const displayWind = windUnit === "ms" ? baseWindMs : baseWindMs * 3.6;

    const tempSymbol = tempUnit === "celsius" ? "°C" : "°F";
    const windSymbol = windUnit === "ms" ? "M/s" : "Km/h";
    const cityName = weatherData.name;


    const localDate = new Date();

    const utcTime = localDate.getTime() + localDate.getTimezoneOffset() * 60000;

    const cityDate = new Date(utcTime + weatherData.timezone * 1000);
    const currentTime = cityDate.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <article className="weather-widget">
        <WeatherControls
          windUnit={windUnit}
          tempUnit={tempUnit}
          onWindChange={this.handleWindChange}
          onTempChange={this.handleTempChange}
          searchInput={searchInput}
          onSearchChange={this.handleSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
        />

        <WeatherDisplay
          displayTemp={displayTemp}
          displayWind={displayWind}
          tempSymbol={tempSymbol}
          windSymbol={windSymbol}
          cityName={cityName}
          currentTime={currentTime}
        />
      </article>
    );
  }
}

export default WeatherWidget;
