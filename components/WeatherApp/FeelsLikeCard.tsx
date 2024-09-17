import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { WeatherData } from "@/types/weather";

const FeelsLikeCard = ({ weatherData }: { weatherData: WeatherData }) => (
  <Card className="col-span-1 bg-white shadow-md">
    <CardHeader>
      <CardTitle>Feels Like</CardTitle>
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
);

export default FeelsLikeCard;
