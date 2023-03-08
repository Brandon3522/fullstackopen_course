


const AddPerson = ({addPerson, handleNameChange, handleNumberChange}) => {
	return (
		<>
			<form id='phonebook-addPerson' onSubmit={addPerson}>
				<h2>Add new Person</h2>
        <div>
          Name: <input id='personInput' onChange={handleNameChange} />
        </div>
				<div>
					Number: <input id='numberInput' onChange={handleNumberChange} />
				</div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
		</>
	)
}

export default AddPerson