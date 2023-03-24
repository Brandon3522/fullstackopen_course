import React from 'react'
import { useState } from 'react';
import Country from './Country';

function Filter({countries, search, weather}) {
	const [selectedCountry, setSelectedCountry] = useState(null);

	const filteredCountries = countries.filter((country) => {
		return country.name.common.toLowerCase().includes(search.toLowerCase());
	})

	const showCountryInfo = (name) => {
		let findCountry = filteredCountries.find(country => country.name.common.toLowerCase() === name.toLowerCase())
		setSelectedCountry(findCountry)
		console.log(selectedCountry)
	}

	if (filteredCountries.length > 10) {
		return (
			<p>Too many matches, specify another filter.</p>
		)
	}

	if (selectedCountry !== null) {
		return(
			<>
			<button onClick={() => setSelectedCountry(null)}>Reset</button>
			<Country 
				name={selectedCountry.name.common}
				capital={selectedCountry.capital} 
				area={selectedCountry.area} 
				flag={selectedCountry.flags} 
				languages={selectedCountry.languages}
			/>
			</>
		)
	}

	if (filteredCountries.length > 1 && filteredCountries.length < 10) {
		return (
			<>
			{filteredCountries.map((country, idx) => (
				<>
				<p key={idx}>{country.name.common}
					<button onClick={() => showCountryInfo(country.name.common.toLowerCase())}>Show</button>
				</p>
				</>
			))}
			</>
		)
	}

	

	if (filteredCountries.length === 1) {
		return (
			<div>
				{filteredCountries.map((country, idx) => (
					<Country 
						key={idx} 
						name={country.name.common}
						capital={country.capital} 
						area={country.area} 
						flag={country.flags} 
						languages={country.languages}
					/>
				))}
			</div>
		)
	}
}

export default Filter