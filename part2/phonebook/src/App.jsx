import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [displayPersons, setDisplayPersons] = useState(persons);
  const [search, setSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const personsOnDisplay = search
    ? displayPersons
    : persons

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then((initialPersons) => {
        console.log('promise fulfilled')
        setPersons(initialPersons);
      })
  }, [])

  //don't render if no persons fetched from backend
  // if (!persons) {
  //   return null
  // }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    for (let person of persons) {
      if (newName === person.name && newNumber === person.number) {
        setErrorMessage(`${newName} is already added to phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        return;
      } else if (newName === person.name && newNumber !== person.number) {
        const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (answer) {
          const updatedPerson = {...personObject, number: newNumber};
          console.log(updatedPerson)
          personService
            .update(person.id, updatedPerson)
            .then(returnedPerson => {
              console.log(returnedPerson)
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
              setDisplayPersons(displayPersons.map(person => person.id === returnedPerson.id ? returnedPerson : person))

              setErrorMessage(`${returnedPerson.name}'s new number updated`);
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000);
            })
        }
        return;
      }
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setDisplayPersons(displayPersons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
  };

  const handleNewName = (event) => {
    let inputName= event.target.value;
    setNewName(inputName);
  };

  const handleNewNumber = (event) => {
    let inputNumber = event.target.value;
    setNewNumber(inputNumber);
  };
  // accessing the id of the targeted person
  const handleRemove = (id) => {
    const person = persons.find(person => person.id === id)
    console.log('clicked...', id)
      personService
        .getOne(id)
        .then(returnedPerson => {
          const name = returnedPerson.name
          const answer = window.confirm(`delete ${name}`)
          if (answer) {
            personService
              .remove(id)
              .then(returnedPerson => {
                const name = returnedPerson.name
                setPersons(persons.filter(person => person.id !== id));
                setDisplayPersons(displayPersons.filter(person => person.id !== id))
                setErrorMessage(`${name} deleted`)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000);
              })
          }
          return;
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from the server`)
          setPersons(persons.filter(person => person.id !== person.id));
          setDisplayPersons(displayPersons.filter(person => person.id !== person.id))
        })
  }

  // when the search is used display based on the names array vs persons array
  const handleNameSearch = (event) => {
    console.log('in focus',event);
    let inputSerch = event.target.value;
    setSearchName(inputSerch);
    const names = persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()));
    setDisplayPersons(names);
  };

  const handleSearchFocus = (event) => {
    console.log('on focus', event)
    setSearch(true)
  };

  const handleSearchBlur = (event) => {
    console.log('on blur', event)
    setSearch(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter value={searchName} handleNameSearch={handleNameSearch} handleSearchFocus={handleSearchFocus} handleSearchBlur={handleSearchBlur}/>
      <h3>add a new</h3> 
      <PersonForm value={{newName, newNumber}} onChange={{handleNewName, handleNewNumber}} onSubmit={addPerson}/>
      <h3>Numbers</h3>
      <ul>
        {personsOnDisplay.map((person) => 
          <Persons key = {person.id} person={person} handleRemove={() => handleRemove(person.id)}/>
      )}
      </ul>
    </div>
  )
}

export default App
