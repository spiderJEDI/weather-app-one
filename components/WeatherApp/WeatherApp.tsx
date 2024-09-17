"use client";

import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard";
import AirPollutionCard from "./AirPollutionCard";
import SunsetCard from "./SunsetCard";
import WindCard from "./WindCard";
import UVIndexCard from "./UVIndexCard";
import PrecipitationCard from "./PrecipitationCard";
import FeelsLikeCard from "./FeelsLikeCard";
import HumidityCard from "./HumidityCard";
import VisibilityCard from "./VisibilityCard";
import ForecastCard from "./ForecastCard";
import { WeatherData, ForecastData } from "@/types/weather";

import {
  fetchWeatherData,
  fetchForecastData,
  fetchCitySuggestions,
} from "lib/weatherApi";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";

export default function WeatherApp() {
  const [city, setCity] = useState("Dhaka");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeatherData(city);
      const forecast = await fetchForecastData(city);
      setWeatherData(weather);
      setForecastData(forecast);
    };
    fetchData();
  }, [city]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setCity(searchTerm);

    if (searchTerm.length > 2) {
      const citySuggestions = await fetchCitySuggestions(searchTerm);
      setSuggestions(citySuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    const [selectedCity] = suggestion.split(", ");
    setCity(selectedCity);
    setSuggestions([]);
  };

  if (!weatherData || !forecastData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <header className="flex items-center justify-between mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search city..."
            className="w-64 bg-gray-200 border-none text-gray-800"
            value={city}
            onChange={handleSearch}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-64 bg-white border border-gray-300 mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button variant="outline" className="text-gray-800 border-gray-800">
          Support Project
        </Button>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData && <WeatherCard weatherData={weatherData} />}
        <AirPollutionCard />
        <SunsetCard weatherData={weatherData} />
        <WindCard weatherData={weatherData} />
        <UVIndexCard />
        <PrecipitationCard weatherData={weatherData} />
        <FeelsLikeCard weatherData={weatherData} />
        <HumidityCard weatherData={weatherData} />
        <VisibilityCard weatherData={weatherData} />
        {forecastData && <ForecastCard forecastData={forecastData} />}
      </main>
    </div>
  );
}
