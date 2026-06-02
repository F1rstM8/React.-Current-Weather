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

      // НОВІ СТАНИ ДЛЯ API:
      city: "Krakow", // Місто за замовчуванням
      searchInput: "",
      weatherData: null, // Сюди ми покладемо дані, коли вони прийдуть
      isLoading: true, // Статус завантаження (спочатку крутимо лоадер)
      error: null, // Сюди запишемо помилку, якщо пропаде інтернет
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
  // Используем async, так как запрос в интернет занимает время
  fetchWeatherData = async () => {
    // Вставь сюда свой реальный ключ в кавычках!
    const API_KEY = "d03fe4b265a1e3c87f43da736b2817d7";
    const { city } = this.state;

    // Формируем ту самую ссылку, которую ты проверял в браузере
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      // Честно "ждем" (await) ответа от сервера
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      // Достаем JSON из ответа
      const data = await response.json();

      // Обновляем состояние: данные получены, загрузка окончена!
      this.setState({
        weatherData: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Если пропал интернет или ключ еще выдает ошибку
      this.setState({
        error: "Weather unavailable. Retrying...",
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
  // Зберігає текст з інпуту при кожному натисканні клавіші
  handleSearchChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  // Спрацьовує при натисканні Enter або кнопки пошуку
  handleSearchSubmit = (event) => {
    event.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки

    const { searchInput } = this.state;
    if (searchInput.trim() === "") return; // Захист від порожнього запиту

    // Оновлюємо поточне місто і вмикаємо лоадер.
    // У React setState працює асинхронно, тому ми викликаємо fetchWeatherData
    // у вигляді callback-функції (другим аргументом), щоб вона спрацювала ТІЛЬКИ після оновлення стейту.
    this.setState({ city: searchInput, isLoading: true, error: null }, () => {
      this.fetchWeatherData();
    });
  };

  render() {
    // 1. Достаємо з this.state не тільки налаштування, а й наші нові дані
    const { windUnit, tempUnit, weatherData, isLoading, error, searchInput } =
      this.state;

    // 2. Показуємо лоадер, поки дані летять по мережі
    if (isLoading) {
      return (
        <article
          className="weather-widget"
          style={{ justifyContent: "center", padding: "40px" }}
        >
          <h2>Завантаження погоди...</h2>
        </article>
      );
    }

    // 3. Показуємо повідомлення, якщо щось пішло не так
    if (error) {
      return (
        <article
          className="weather-widget"
          style={{ justifyContent: "center", padding: "40px", color: "red" }}
        >
          <h2>{error}</h2>
        </article>
      );
    }

    // 4. БЕРЕМО РЕАЛЬНІ ДАНІ З API!
    // Якщо подивитися на твій скриншот, температура лежить в об'єкті "main", а вітер в "wind"
    const baseTempC = weatherData.main.temp;
    const baseWindMs = weatherData.wind.speed;

    // 5. Вся наша попередня математика конвертації працює як годинник
    const displayTemp =
      tempUnit === "celsius" ? baseTempC : baseTempC * 1.8 + 32;
    const displayWind = windUnit === "ms" ? baseWindMs : baseWindMs * 3.6;

    const tempSymbol = tempUnit === "celsius" ? "°C" : "°F";
    const windSymbol = windUnit === "ms" ? "M/s" : "Km/h";
    const cityName = weatherData.name;
    const currentTime = new Date().toLocaleTimeString("uk-UA", {
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
