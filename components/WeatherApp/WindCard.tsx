import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { WeatherData } from "@/types/weather";
import WindIcon from "./WindIcon";

const WindCard = ({ weatherData }: { weatherData: WeatherData }) => (
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
);

export default WindCard;
