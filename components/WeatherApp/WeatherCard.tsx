import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { WeatherData } from "@/types/weather";

const WeatherCard = ({ weatherData }: { weatherData: WeatherData }) => (
  <Card className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white shadow-md">
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
);

export default WeatherCard;
