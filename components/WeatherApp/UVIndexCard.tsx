import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

const UVIndexCard = () => (
  <Card className="col-span-1 bg-white shadow-md">
    <CardHeader>
      <CardTitle>UV Index</CardTitle>
      <div className="text-2xl">N/A</div>
      <CardDescription>UV Index data not available</CardDescription>
    </CardHeader>
  </Card>
);

export default UVIndexCard;
