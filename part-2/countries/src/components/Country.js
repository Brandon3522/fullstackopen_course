import React from 'react'
import countryService from '../services/countryService'
import { useEffect, useState } from 'react'

function Country({name, capital, area, flag, languages}) {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		countryService
			.getCityWeather(capital)
			.then((weather) => {
				setWeather(weather)
				console.log(weather)
			}).catch((error) => {
					console.log(`Error displaying weather: ${error}`)
			})
	}, [])

	if (!languages) {
		return 'Error: Languages not found'
	}

	if (weather) {
		return (
			<div>
				<h2>Country: {name}</h2>
				<p>Capital: {capital}</p>
				<p>Area: {area}</p>
				<h3>Languages: </h3>
				<ul>
					{Object.values(languages).map((language, idx) => (
						<li key={idx}>
							{language}
						</li>
					))}
				</ul>
				<div className='country-flag'>
					<img alt='Country Flag' src={flag['png']}></img>
				</div>
				<div>
					<h2>Weather in {capital}</h2>
					<p>Temperature: {weather.main.temp} Fahrenheit</p>
					<img alt='Weather Icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
					<p>Wind: {weather.wind.speed} m/s</p>
				</div>
			</div>
		)
	}
	
	return (
		<div>
			<h2>Country: {name}</h2>
			<p>Capital: {capital}</p>
			<p>Area: {area}</p>
			<h3>Languages: </h3>
			<ul>
				{Object.values(languages).map((language, idx) => (
					<li key={idx}>
						{language}
					</li>
				))}
			</ul>
			<div className='country-flag'>
				<img alt='Country Flag' src={flag['png']}></img>
			</div>
		</div>
	)
}

export default Country