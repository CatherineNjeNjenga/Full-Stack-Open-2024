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

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then((initialPersons) => {
        console.log('promise fulfilled')
        setPersons(initialPersons);
      })
  }, [])
  console.log('response', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    for (let person of persons) {
      if (newName === person.name && newNumber === person.number) {
        alert(`${newName} is already added to phonebook`);
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

              alert(`${returnedPerson.name}'s new number updated`);
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
                alert(`${name} deleted`)
              })
          }
          return;
        })
  }
    

  // when the search is used display based on the names array vs persons array
  const handleNameSearch = (event) => {
    let inputSerch = event.target.value;
    setSearchName(inputSerch);
    const names = persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    setDisplayPersons(names);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} handleNameSearch={handleNameSearch}/>
      <h3>add a new</h3>
      <PersonForm value={{newName, newNumber}} onChange={{handleNewName, handleNewNumber}} onSubmit={addPerson}/>
      <h3>Numbers</h3>
      <ul>
        {displayPersons.map((person) => 
        <>
          <li key={person.id}>{person.name} {person.number}</li>
          <button onClick={() => handleRemove(person.id)}>remove</button>
        </>
      )}
      </ul>
      {/* <Persons 
        persons={displayPersons} 
        onClick={() => handleRemove(id)}/> */}
    </div>
  )
}

export default App
