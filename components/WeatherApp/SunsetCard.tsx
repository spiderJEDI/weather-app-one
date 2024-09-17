import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { WeatherData } from "@/types/weather";

const SunsetCard = ({ weatherData }: { weatherData: WeatherData }) => (
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
);

export default SunsetCard;
