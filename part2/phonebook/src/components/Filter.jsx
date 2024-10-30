import React from "react"

const Filter = ({ value, handleNameSearch, handleSearchFocus, handleSearchBlur}) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={handleNameSearch} onFocus={handleSearchFocus} onBlur={handleSearchBlur}/>
      </div>
  )
}

export default Filter;