// src/components/Header.js

import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-lg z-50 h-[100px]  font-display font-extrabold lg:px-[380px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-5xl font-bold">WeatherWise</span>
          </div>
          <div className="flex items-center space-x-4 text-3xl">
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
