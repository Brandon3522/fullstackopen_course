import React from 'react'
import Country from './Country'

function Countries({countries}) {
	return (
		<div>
			{countries.map((country, idx) => (
				<Country 
					key={idx} 
					capital={country.capital} 
					area={country.area} 
					flag={country.flags} 
					languages={country.languages}
				/>
			))}
		</div>
	)
}

export default Countries