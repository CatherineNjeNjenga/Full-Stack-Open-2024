import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [displayPersons, setDisplayPersons] = useState(persons);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled')
        setPersons(response.data);
      })
  }, [])
  console.log('response', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === ''|| newNumber === '') {
      alert('please enter your name and number');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    };
    
    setPersons(persons.concat(personObject));
    setDisplayPersons(displayPersons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNewName = (event) => {
    let inputName= event.target.value;
    for (let person of persons) {
      if (inputName === person.name) {
        alert(`${inputName} is already added to phonebook`);
        return;
      }    }
    setNewName(inputName);
  };

  const handleNewNumber = (event) => {
    let inputNumber = event.target.value;
    for (let person of persons) {
      if (inputNumber === person.number) {
        alert(`${inputNumber} is already added to phonebook`)
      } else if(inputNumber === '') {
        alert('please input your number')
      }
    }
    setNewNumber(inputNumber);
  };

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
      <Persons persons={displayPersons}/>
    </div>
  )
}

export default App
