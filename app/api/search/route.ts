import type { NextApiRequest, NextApiResponse } from "next";

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Missing query parameter" });
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`
    );
    const data = await response.json();
    const cities = data.map((city: any) => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching city data", error });
  }
}
