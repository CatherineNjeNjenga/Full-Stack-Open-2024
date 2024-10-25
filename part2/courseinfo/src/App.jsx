import { useState } from 'react'
import './App.css'

const Course = ({course}) => {
  const {id, name, parts} = course;
  return (
    <>
      <Header name={name} id={id}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
};

const Header = ({ name }) => {
  console.log('Header', name);
  return (
    <h1>{name}</h1>
  )
};

const Part = ({part, exercises}) => {
  console.log(part, exercises)
  return (
    <>
    <p>
      {part} {exercises}
    </p>
  </>
  )
};

const Content = ({ parts }) => {
  const [part1, part2, part3] = parts;
  console.log('Content', parts);
  return (
    <div>
      <Part  part={part1.name} exercises={part1.exercises} id={part1.id}/>
      <Part  part={part2.name} exercises={part2.exercises} id={part2.id}/>
      <Part  part={part3.name} exercises={part3.exercises} id={part3.id}/>
    </div>
  )
};

const Total = ({ parts }) => {
  const [part1, part2, part3] = parts;
  const total = [part1.exercises, part2.exercises, part3.exercises]
  console.log('Total', parts);
  return (
    <h3>total of {total.reduce((a,b) => a + b, 0)} exercises</h3>
  )
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div><Course course={course}/></div>
  )
}

export default App
