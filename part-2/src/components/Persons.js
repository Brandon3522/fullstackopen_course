import Person from "./Person"


const Persons = ({persons, deletePerson}) => {
	
	return (
		<ul>
			{persons.map(person =>
				<li key={person.id}>
					<Person name={person.name} number={person.number} id={person.id} deletePerson={deletePerson}/>
				</li> 
			)}
		</ul>
	)
}

export default Persons