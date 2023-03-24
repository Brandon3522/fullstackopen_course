import axios from "axios";

const baseURL = 'https://restcountries.com/v3.1'

// Weather app API
const API_KEY = process.env.REACT_APP_API_KEY

// /all endpoint: restcountries
const getAll = () => {
	const request = axios.get(`${baseURL}/all`);
	return request.then((response) => response.data);
}

// URL https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherBaseURL = `https://api.openweathermap.org/data/2.5/weather?q=`
const getCityWeather = (cityName) => {
	const request = axios.get(`${weatherBaseURL}${cityName}&appid=${API_KEY}`);
	return request.then((response) => response.data);
}


export default {getAll, getCityWeather};