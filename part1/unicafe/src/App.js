import React, { useState } from "react";

const Statistic = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td> {props.value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <h4>No feedback given</h4>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic
            text="all"
            value={props.good + props.neutral + props.bad}
          />
          <Statistic
            text="average"
            value={
              (props.good * 1 + props.neutral * 0 + props.bad * -1) /
              (props.good + props.neutral + props.bad)
            }
          />
          <Statistic
            text="positive"
            value={
              ((props.good * 1 + props.neutral * 0) /
                (props.good + props.neutral + props.bad)) *
              100
            }
          />
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
  console.log(good);
};

export default App;
