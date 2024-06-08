import React from "react";
import TypingEffect from "./TypingEffect"; // Adjust the import path as needed

const LandingPageDescription = () => {
  const description = `At WeatherWise, we understand the importance of having accurate and timely weather information at your fingertips. Whether you're planning your day, preparing for a trip, or just curious about the weather, our app is designed to provide you with the latest and most reliable forecasts.
  Our easy-to-use interface allows you to quickly check the weather conditions for any location around the world. Simply enter the city name, and you'll receive detailed information including temperature, humidity, wind speed, and weather conditions, all beautifully presented and updated in real-time.
 `;

  return (
    <section className="bg-blue-800  lg:py-8 h-[510px] md:pt-[120px] lg:h-[500px] pt-[100px] lg:pt-[120px] lg:px-[500px] md:px-[100px] px-10 text-sm">
      <h1 className=" text-xl lg:text-3xl font-bold text-center text-white mb-4 italic">
        Welcome to WeatherWise
      </h1>
      <p className="lg:text-xl text-black p-4 text-center shadow-lg bg-white rounded-3xl lg:p-10 lg:h-[300px] h-[350px]">
        <TypingEffect text={description} speed={75} />
      </p>
    </section>
  );
};

export default LandingPageDescription;
