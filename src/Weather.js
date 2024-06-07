import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [citySubmitted, setCitySubmitted] = useState(false);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching new data
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ddc3883b1100a8b7418bbc124b63cbff&units=metric`
      );
      setWeatherData(response.data);
      setCitySubmitted(true);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (city.trim()) {
      fetchWeatherData();
    }
  };

  return (
    <div className="weather-container">
      {!citySubmitted ? (
        <form onSubmit={handleSubmit} className="city-form">
          <h2>Enter a city to get the weather:</h2>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="city-input"
          />
          <button type="submit" className="submit-button">
            Get Weather
          </button>
        </form>
      ) : (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div>
              <p>Error fetching data: {error}</p>
              <button
                onClick={() => setCitySubmitted(false)}
                className="try-again-button"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="weather-info">
              <h1>Weather in {weatherData.name}</h1>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Condition: {weatherData.weather[0].description}</p>
              <p>Feels Like: {weatherData.main.feels_like} °C</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <button
                onClick={() => setCitySubmitted(false)}
                className="new-search-button"
              >
                Search Another City
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
