import React from "react"
import { Header } from "./Content";
import { Content } from "./Content";
import { Total } from "./Content";

const Course = ({ course }) => {
  console.log('Course', course);
  const {id, name, parts} = course;
  console.log('Course', parts)
  return (
    <>
      <Header name={name} id={id}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
};

export default Course