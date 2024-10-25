import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Megan Markle'}
  ]);

  console.log(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    if (newName === ''|| newNumber === '') {
      alert('please enter your details')
    }
    
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
    console.log('button clicked', event.target);
  };

  const handleNewName = (event) => {
    console.log(event.target.value);
    let inputName= event.target.value;
    for (let person of persons) {
      if (inputName === person.name) {
        alert(`${inputName} is already added to phonebook`);
        return;
      } else if (inputName === '') {
        alert('please input your name')
      }
    }
    setNewName(inputName);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNewName}
          />
        </div>
        <div>
          number:
          <input 
            value={newNumber} 
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>{persons.map((person) => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
          
        </ul>
       </div>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App
