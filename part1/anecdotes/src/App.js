import React, { useState } from "react";

const MostVotes = ({ header, anecdote, votes }) => {
  if (votes === 0) {
    return "";
  } else
    return (
      <>
        <h2>{header}</h2>
        <div>{anecdote}</div>
        <div>has {votes} votes</div>
      </>
    );
};

const Button = ({ event, text }) => {
  return <button onClick={event}>{text}</button>;
};

const Anecdote = ({ header, anecdote, votes }) => {
  return (
    <>
      <h2>{header}</h2>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it  hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 persent of the code accounts for the other 90 persent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  console.log(votes);

  let topVoted = Math.max(...votes);
  let topVotedIndex = votes.indexOf(topVoted);

  const handleClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const randomAnecdoteIndex = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  return (
    <>
      {/* <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div> */}
      <Anecdote
        header="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button event={handleClick} text="vote" />
      <Button event={randomAnecdoteIndex} text="next anecdote" />

      <MostVotes
        header="Anecdote with most votes"
        anecdote={anecdotes[topVotedIndex]}
        votes={votes[topVotedIndex]}
      />
    </>
  );
};

export default App;
