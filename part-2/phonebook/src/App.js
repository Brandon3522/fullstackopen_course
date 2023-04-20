import './App.css';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Success from './components/Success';
import Error from './components/Error';
import Persons from './components/Persons';
import AddPerson from './components/AddPerson';
import Filter from './components/Filter';
import personService from './services/persons.js';

function App() {
  // Phonebook state
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // GET persons from database
  useEffect(() => {
    console.log('effect');
    personService
			.getAll()
			.then((initialPeople) => {
				console.log('Promise fulfilled');
				setPersons(initialPeople);
			});

    setLoading(false);
  }, []);

  // Add to phonebook
  const addPerson = (event) => {
    event.preventDefault();
    const isEqual = doesPersonExist(newName);
    if (isEqual) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, would you like to replace the old number with the new number?`
        )
      ) {
        // Replace old number with new number
        const currentPerson = persons.find((person) => person.name === newName);
        const changedPerson = { ...currentPerson, number: number }; // Change number
        console.log('Updating person frontend');

        personService
          .update(currentPerson.id, changedPerson)
          .then((returnedPerson) => {
            // set new number
            console.log('in persons add update');
            setPersons(
              persons.map((person) =>
                person.id !== currentPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNumber('');
          })
          .catch((error) => {
            console.log(error.response.data.error); // Error from database
            setErrorMessage(`Validation Error: ${error.response.data.error}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        return;
      }
    }

    const personObject = {
      name: newName,
      number: number,
    };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNumber('');
        setSuccessMessage(`Added: ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response.data.error); // Error from database
        setErrorMessage(`Validation Error: ${error.response.data.error}`);
        console.log(`Error message: ${errorMessage}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  // Delete person from persons and JSON database
  // id passed in from person component
  const deletePerson = (id) => {
    if (window.confirm(`Are you sure you want to delete this person?`)) {
      console.log(`Delete person: ${id}`);
      const personToDelete = persons.find((person) => person.id === id);
      //const selectedPersonName =
      console.log(personToDelete.name);

      personService
        .deletePerson(id)
        .then((returnedPerson) => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Deleted: ${personToDelete.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setDeleteError(
            `Information of '${personToDelete.name}' has already been deleted from the server.`
          );
          setTimeout(() => {
            setDeleteError(null);
          }, 5000);
          // setPersons(persons.filter(person => person.id !== id))
        });
    }
  };

  const doesPersonExist = (name) => {
    for (const person of persons) {
      if (person.name.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  if (loading) {
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
  }

  return (
    <div className="App">
      {/* Phonebook */}
      <h1>Phonebook</h1>
      <Success message={successMessage} />
      <Error message={deleteError} />
      <Error message={errorMessage} />
      {/* Search */}
      <div>
        Filter Numbers:
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>

      {/* Add person form */}
      <AddPerson
        addPerson={addPerson}
        name={newName}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>All Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />

      <Filter persons={persons} search={search} />

      {/* Phonebook */}

      <Footer />
    </div>
  );
}

export default App;
