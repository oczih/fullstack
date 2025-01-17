import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text}: {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad, amount, average, positive }) => {
  if (amount === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};



const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [amount, setAmount] = useState(0);
  const [score, setScore] = useState(0);
  const average = amount > 0 ? (score / amount).toFixed(2) : 0;
  const positive = amount > 0 ? ((good / amount) * 100).toFixed(2) + '%' : '0%';

  const handleGood = () => {
    setGood(good + 1);
    setAmount(amount + 1);
    setScore(score + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAmount(amount + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAmount(amount + 1);
    setScore(score - 1);
  };

  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        amount={amount} 
        average={average} 
        positive={positive} 
      />
    </div>
  );
};

export default App;
