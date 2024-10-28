import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [displayPersons, setDisplayPersons] = useState(persons);

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
