import { WeatherData, ForecastData } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

interface GeoItem {
  name: string;
  country: string;
}

export const fetchWeatherData = async (
  cityName: string
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchForecastData = async (
  cityName: string
): Promise<ForecastData | null> => {
  try {
    const geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    if (!geoResponse.ok) {
      throw new Error("Failed to fetch geo data");
    }
    const geoData = await geoResponse.json();
    const { lat, lon } = geoData[0];

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    const forecast = await forecastResponse.json();
    return forecast;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};

export const fetchCitySuggestions = async (
  searchTerm: string
): Promise<string[]> => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch city suggestions");
    }
    const data = await response.json();
    return data.map((item: GeoItem) => `${item.name}, ${item.country}`);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
