import { useState } from 'react'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const points = Array(anecdotes.length).fill(0);
  const copy = [...points];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(copy);
  


  const handleSelected = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    // set selected to a random number
    let selectedNumber = (selected + random - selected);
    setSelected(selectedNumber);
  }; 

  const handleVotes = () => {
    votes[selected] += 1;
    // maitain the latest array
    setVotes(votes)
    console.log(votes)
  };
  let voted = 0;;
  const maxVotes = votes.reduce((a, b) => Math.max(a, b), -Infinity);
  console.log(maxVotes);
  for (let index = 0; index < votes.length; index++) {
    if (votes[index] === maxVotes) {
      voted = anecdotes[index];
      console.log(voted);
    }
  }
  console.log(voted);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <h3>has {votes[selected]} votes</h3>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleSelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{voted}</div>
      <h3>has {maxVotes} votes</h3>
    </div>
  )
};

export default App
