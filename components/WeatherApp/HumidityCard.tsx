import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { WeatherData } from "@/types/weather";

const HumidityCard = ({ weatherData }: { weatherData: WeatherData }) => (
  <Card className="col-span-1 bg-white shadow-md">
    <CardHeader>
      <CardTitle>Humidity</CardTitle>
      <div className="text-2xl">
        {weatherData.main && weatherData.main.humidity !== undefined
          ? `${weatherData.main.humidity}%`
          : "N/A"}
      </div>
      <CardDescription>
        {weatherData.main && weatherData.main.humidity !== undefined
          ? weatherData.main.humidity > 60
            ? "High humidity. It might feel humid and uncomfortable."
            : "Comfortable humidity levels."
          : "N/A"}
      </CardDescription>
    </CardHeader>
  </Card>
);

export default HumidityCard;
