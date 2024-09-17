import type { NextApiRequest, NextApiResponse } from "next";

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon, city } = req.query;

  try {
    if (lat && lon) {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      res.status(200).json(weatherData);
    } else if (city) {
      const geocodeResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();
      if (geocodeData.length > 0) {
        const { lat, lon } = geocodeData[0];
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        res.status(200).json(weatherData);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    } else {
      res.status(400).json({ message: "Missing required parameters" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data", error });
  }
}
