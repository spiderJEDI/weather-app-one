import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ForecastData } from "@/types/weather";
import Image from "next/image";

const ForecastCard = ({ forecastData }: { forecastData: ForecastData }) => (
  <Card className="col-span-3 bg-white shadow-md overflow-x-auto">
    <CardHeader>
      <CardTitle>5-Day Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex space-x-4 overflow-x-auto">
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
);

export default ForecastCard;
