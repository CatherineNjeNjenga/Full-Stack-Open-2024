import React from "react";

const Persons = ({persons, onClick}) => {
  return (
    <div>
      <ul>
        {persons.map((person) => 
        <>
          <li key={person.id}>{person.name} {person.number}</li>
          <button onClick={onClick}>remove</button>
        </>
      )}
      </ul>
    </div>
  )
}

export default Persons;