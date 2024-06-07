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
    <div className=" ">
      {!citySubmitted ? (
        <div className="bg-blue-800 h-[500px] py-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 bg-blue-800  gap-10"
          >
            <div className="flex items-center justify-center">
              <h2 className="font-display text-3xl font-bold py-2 text-white">
                Enter a city to get weather details:
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="bg-white text-blue-900 border rounded-lg text-center p-2"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="font-display bg-blue-800 text-white rounded-full p-2 border-2 font-bold"
              >
                Get Weather
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {loading ? (
            <p className="bg-blue-800">Loading...</p>
          ) : error ? (
            <div className="bg-blue-800">
              <p className="font-display text-xl font-bold text-white flex justify-center items-cente py-6">
                {error}
              </p>
              <div className="flex justify-center items-center  p-8">
                {" "}
                <button
                  onClick={() => {
                    setCitySubmitted(false);
                    setWeatherData(null);
                    setError(null);
                  }}
                  className="font-display bg-blue-800 text-white rounded-full p-2 border-2 lg:font-bold lg:text-lg"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex justify-between p-1 bg-blue-800">
                <div>
                  <h1 className="font-display text-xl font-bold py-2 text-white">
                    Weather Forecast for {city}
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setCitySubmitted(false);
                      setWeatherData(null);
                      setError(null);
                    }}
                    className="font-display bg-blue-800 text-white rounded-full p-2 border-2"
                  >
                    Search Another City
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-0 h-auto w-auto overflow-scroll sm:grid-cols-2 md:grid-cols-4 sm:gap-5 md:gap-5 m-auto">
                {weatherData &&
                  weatherData.properties.periods.map((period, index) => (
                    <div key={index} className="shadow-xl rounded-lg border-2">
                      <h3 className="font-display text-lg font-semibold ">
                        {period.name}
                      </h3>
                      <p className="font-bold">
                        <img
                          src={period.icon}
                          alt={period.shortForecast}
                          className="w-full h-[250px]"
                        />
                        {period.temperature}°{period.temperatureUnit}
                      </p>
                      <p className="font-sans text-sm px-2">
                        {period.shortForecast}
                      </p>
                      <p className="font-sans text-sm px-2">
                        {period.detailedForecast}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
