import React from "react"

const Filter = ({ value, handleNameSearch}) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={handleNameSearch}/>
      </div>
  )
}

export default Filter;