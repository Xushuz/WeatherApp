const API_KEY = 'dc61fae0db1837fecf8f709518ff8227';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
    );
    if (!response.ok) {
      if (response.status === 404) throw new Error('City not found. Please check the name and try again.');
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchForecast = async (city, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch forecast data.');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};
