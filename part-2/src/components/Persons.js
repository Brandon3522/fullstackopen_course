import Person from "./Person"


const Persons = ({persons}) => {
	return (
		<ul>
			{persons.map(person =>
				<li key={person.id}>
					<Person name={person.name} number={person.number}/>
				</li> 
			)}
		</ul>
	)
}

export default Persons