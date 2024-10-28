import React from "react";

const PersonForm = ({ value, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: 
        <input 
          value={value.newName} 
          onChange={onChange.handleNewName}
        />
      </div>
      <div>
        number:
        <input 
          value={value.newNumber} 
          onChange={onChange.handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;