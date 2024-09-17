import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { WeatherData } from "@/types/weather";

const PrecipitationCard = ({ weatherData }: { weatherData: WeatherData }) => (
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
);

export default PrecipitationCard;
