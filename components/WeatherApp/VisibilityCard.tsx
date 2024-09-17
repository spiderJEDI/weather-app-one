import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { WeatherData } from "@/types/weather";

const VisibilityCard = ({ weatherData }: { weatherData: WeatherData }) => (
  <Card className="col-span-1 bg-white shadow-md">
    <CardHeader>
      <CardTitle>Visibility</CardTitle>
      <div className="text-2xl">
        {weatherData.visibility !== undefined
          ? `${weatherData.visibility / 1000} km`
          : "N/A"}
      </div>
      <CardDescription>
        {weatherData.visibility !== undefined
          ? weatherData.visibility >= 10000
            ? "It's perfectly clear right now."
            : "Visibility is reduced."
          : "N/A"}
      </CardDescription>
    </CardHeader>
  </Card>
);

export default VisibilityCard;
