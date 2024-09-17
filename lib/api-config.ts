const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_ROUTES = {
  WEATHER: `${API_BASE_URL}/api/weather`,
  SEARCH: `${API_BASE_URL}/api/search`,
};
