


import React from 'react'

const Filter = ({persons, search}) => {

	const filterPersons = persons.filter((person) => {
		return person.name.toLowerCase().includes(search.toLowerCase())
	})

	return (
		<>
			<h2>Filtered Numbers</h2>
      <ul>
        {filterPersons.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
		</>
	)
}

export default Filter