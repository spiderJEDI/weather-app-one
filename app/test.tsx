"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { WeatherData, ForecastData } from "./types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export default function WeatherApp() {
  const [city, setCity] = useState("Dhaka");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetchWeatherData(city);
    fetchForecastData(city);
  }, [city]);

  const fetchWeatherData = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchForecastData = async (cityName: string) => {
    try {
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();
      const { lat, lon } = geoData[0];

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecast = await forecastResponse.json();
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setCity(searchTerm);

    if (searchTerm.length > 2) {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();
        setSuggestions(data.map((item) => `${item.name}, ${item.country}`));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
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
      <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </CardTitle>
            <CardDescription>{weatherData.name}</CardDescription>
            <div className="text-4xl font-bold">
              {weatherData.main && weatherData.main.temp !== undefined
                ? `${Math.round(weatherData.main.temp)}°`
                : "N/A"}
            </div>
            <div className="text-sm">
              {weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].main
                : "N/A"}
            </div>
            <div className="text-xs">
              H:{" "}
              {weatherData.main && weatherData.main.temp_max !== undefined
                ? `${Math.round(weatherData.main.temp_max)}°`
                : "N/A"}{" "}
              L:{" "}
              {weatherData.main && weatherData.main.temp_min !== undefined
                ? `${Math.round(weatherData.main.temp_min)}°`
                : "N/A"}
            </div>
          </CardHeader>
        </Card>
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Air pollution</CardTitle>
            <div className="flex items-center">
              <div className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full" />
            </div>
            <CardDescription>Air quality data not available.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Sunset</CardTitle>
            <div className="text-2xl">
              {weatherData.sys && weatherData.sys.sunset
                ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : "N/A"}
            </div>
            <CardDescription>
              Sunrise:{" "}
              {weatherData.sys && weatherData.sys.sunrise
                ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : "N/A"}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Wind</CardTitle>
            <div className="flex items-center justify-center">
              <WindIcon className="w-16 h-16" />
              <div className="ml-2">
                {weatherData.wind && weatherData.wind.speed !== undefined
                  ? `${weatherData.wind.speed} m/s`
                  : "N/A"}
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>UV Index</CardTitle>
            <div className="text-2xl">N/A</div>
            <CardDescription>UV Index data not available</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Precipitation</CardTitle>
            <div className="text-2xl">
              {weatherData.rain && weatherData.rain["1h"] !== undefined
                ? `${weatherData.rain["1h"]} mm`
                : "0 mm"}
            </div>
            <CardDescription>in the last hour</CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Feels like</CardTitle>
            <div className="text-2xl">
              {weatherData.main && weatherData.main.feels_like !== undefined
                ? `${Math.round(weatherData.main.feels_like)}°`
                : "N/A"}
            </div>
            <CardDescription>
              {weatherData.main &&
              weatherData.main.feels_like !== undefined &&
              weatherData.main.temp !== undefined
                ? weatherData.main.feels_like < weatherData.main.temp
                  ? "Feels colder than the actual temperature."
                  : "Feels warmer than the actual temperature."
                : "N/A"}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="col-span-2 bg-white shadow-md overflow-x-auto">
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-scroll space-x-4">
              {forecastData.list
                .filter((_, index) => index % 8 === 0)
                .slice(0, 5)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-48 bg-gray-200 p-4 rounded-lg shadow-md text-center"
                  >
                    <div className="text-lg font-bold">
                      {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                    <div className="text-2xl font-bold">
                      {Math.round(item.main.temp)}°
                    </div>
                    <Image
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      width={48}
                      height={48}
                    />
                    <div className="text-sm">{item.weather[0].description}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function WindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}
