import { useState } from 'react'
import './App.css'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
};

const StatisticLine = ({text, value}) => {
  return (
    // <div>
    //   <div>{text} {value}</div>
    // </div>
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
};

const Statistics = ({details, values}) => {
  if (values.good === 0 && values.neutral === 0 && values.bad === 0) {
    return (
      <h2>No feedback given</h2>
    )
    
  } else 
  return (
    
    <div>
      <h1>{details.stats}</h1>
      <StatisticLine text= {details.good} value={values.good}/>
      <StatisticLine text={details.neutral} value={values.neutral}/>
      <StatisticLine text={details.bad} value={values.bad}/>
      <StatisticLine text={details.all} value = {values.good + values.neutral + values.bad} />
      <StatisticLine text={details.ave} value={(values.good*1 + values.neutral*0 + values.bad*-1)/(values.good + values.neutral + values.bad)}/>
      <StatisticLine text={details.pos} value={(values.good / (values.good + values.neutral + values.bad))*100 + '%'}/>
      
    </div>
  )
};

const App = () => {

  // save clicks for each button
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => {
    setGood(good + 1);
  };

  const handleNeutralClicks = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClicks = () => {
    setBad(bad + 1);
  };

  const title = 'give feedback';
  const details = {
    stats:'statistics', 
    all:'all', 
    ave:'average', 
    pos:'positive',
    good: 'good',
    neutral: 'neutral',
    bad: 'bad'
  };

  return (
    <div>
      <Header title={title}/>
      <Button handleClick={handleGoodClicks} text='good'/>
      <Button handleClick={handleNeutralClicks} text='neutral' />
      <Button handleClick={handleBadClicks} text='bad'/>
      <Statistics values = {{good, neutral, bad}} details={details}/>
    </div>
  )
}
export default App
