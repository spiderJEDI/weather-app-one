import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

const AirPollutionCard = () => (
  <Card className="col-span-1 bg-white shadow-md">
    <CardHeader>
      <CardTitle>Air pollution</CardTitle>
      <div className="flex items-center">
        <div className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full" />
      </div>
      <CardDescription>Air quality data not available.</CardDescription>
    </CardHeader>
  </Card>
);

export default AirPollutionCard;
