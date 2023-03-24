import { useState, useEffect } from 'react';
import './App.css';
import Countries from './components/Countries.js'
import countryService from './services/countryService.js'
import Filter from './components/Filter';

function App() {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');

	useEffect(() => {
		countryService
			.getAll()
			.then(response => {
				setCountries(response)
				console.log(response)
				// let languages = countries[0].languages
				// Object.values(languages).map(language => (
				// 	console.log(language)
				// ))
				// console.log(countries[0].languages['spa'])
				// console.log(countries[0].flags['png'])
			})
			.catch(error => {
				console.log(`Error reading country`)
			})
	}, [])

	const handleSelectedCountry = (name) => {
	}


	if (!countries) {
		return null;
	}

  return (
    <div className="App">
      <form>
				<label>Find countries </label>
				<input type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
			</form>
			<br />

			{/* Countries */}
			<div>
				{/* <Countries countries={countries}/> */}
				<Filter countries={countries} search={search}/>
			</div>
			

    </div>
  );
}

export default App;
