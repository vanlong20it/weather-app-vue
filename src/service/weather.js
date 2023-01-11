import axios from "axios";

const API_KEY = "778cd9d5fbe20f7d5e2c36e53d96d954";
export const fetchWeatherByLocation = (location) => {
  return axios.request({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`,
  });
};
