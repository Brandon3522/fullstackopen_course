


const Person = ({name, id, number, deletePerson}) => {
	return (
		<>
			{name} {number}
			<button onClick={() => deletePerson(id)}>Delete</button>
		</>
	)
}

export default Person