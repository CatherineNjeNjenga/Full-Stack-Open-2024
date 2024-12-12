import React from "react";

export const Header = ({ name }) => {
  console.log('Header', name);
  return (
    <h1>{name}</h1>
  )
};

const Part = ({ parts }) => {
  console.log(parts)
  return (
    <>
    {parts.map((part) => 
      <p key={part.id}>
      {part.name} {part.exercises}
    </p> 
    )}
  </>
  )
};

export const Content = ({ parts }) => {
  console.log('Content', parts);
  return (
    <div>
      <Part  parts={parts} />
    </div>
  )
};

export const Total = ({ parts }) => {
  console.log('Total', parts);
  let total = [];
  return (
    <>
      {parts.map((part) => {
        console.log(part.exercises)
        total = total.concat(part.exercises);
        console.log(total);
      })}
      <h3>total of {total.reduce((a,b) => a + b, 0)} exercises</h3>
    </>
  )
};

