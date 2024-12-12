import React from "react";

const Persons = ({person, handleRemove}) => {
  return (
    <div>
      <>
        <li className="list">{person.name} {person.number}</li>
        <button onClick={handleRemove}>remove</button>
      </>
    </div>
  )
}

export default Persons;