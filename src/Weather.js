import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [citySubmitted, setCitySubmitted] = useState(false);

  // Fetch geographic coordinates for the given city
  useEffect(() => {
    if (citySubmitted && city.trim()) {
      const fetchCoordinates = async () => {
        setLoading(true);
        setError(null);
        try {
          const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              city
            )}&format=json&limit=1`
          );
          if (geoResponse.data.length > 0) {
            const { lat, lon } = geoResponse.data[0];
            setCoordinates({ lat, lon });
          } else {
            setError("City not found");
            setLoading(false);
          }
        } catch (error) {
          setError("Error fetching coordinates");
          setLoading(false);
        }
      };

      fetchCoordinates();
    }
  }, [citySubmitted, city]);

  // Fetch weather data for the given coordinates
  useEffect(() => {
    if (coordinates) {
      const fetchWeatherData = async () => {
        try {
          const locationResponse = await axios.get(
            `https://api.weather.gov/points/${coordinates.lat},${coordinates.lon}`
          );
          const forecastUrl = locationResponse.data.properties.forecast;

          const weatherResponse = await axios.get(forecastUrl);
          setWeatherData(weatherResponse.data);
        } catch (error) {
          setError("Error fetching weather data");
        }
        setLoading(false);
      };

      fetchWeatherData();
    }
  }, [coordinates]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setCitySubmitted(true);
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
                onClick={() => {
                  setCitySubmitted(false);
                  setWeatherData(null);
                  setError(null);
                }}
                className="try-again-button"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="weather-info">
              <h1>Weather Forecast for {city}</h1>
              {weatherData &&
                weatherData.properties.periods.map((period, index) => (
                  <div key={index}>
                    <h3>{period.name}</h3>
                    <p>
                      {period.temperature}°{period.temperatureUnit}
                    </p>
                    <p>{period.shortForecast}</p>
                    <p>{period.detailedForecast}</p>
                  </div>
                ))}
              <button
                onClick={() => {
                  setCitySubmitted(false);
                  setWeatherData(null);
                  setError(null);
                }}
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
