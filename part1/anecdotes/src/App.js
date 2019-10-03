import React, { useState } from 'react';
import './App.css';

import Button from './components/ui/button/button';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  const [oneWithMaxVotes, setMaxVotes] = useState(null);

  const onNextAnecdoteClickedHandler = () => {
    let randomVariable = Math.random() * props.anecdotes.length;

    randomVariable = Math.floor(randomVariable);

    setSelected(randomVariable);
  }

  const onVoteClickedHandler = () => {
    // Take a copy of the current votes object
    const copiedVotes = {...votes};

    // Check if there exists such an array index
    if (!copiedVotes[selected]) {
      // If not, initialize at 0
      copiedVotes[selected] = 0;
    } 

    // Increment its value
    copiedVotes[selected] += 1;

    getAnecdoteWithLargestVote(copiedVotes);

    // Set the votes
    setVotes(copiedVotes);
  }

  const getAnecdoteWithLargestVote = (votesObj) => {
    let maxVote = 0;
    let maxIndex = 0;

    Object.keys(votesObj).forEach(key => {
      if(votesObj[key] > maxVote) {
        maxVote = votesObj[key];
        maxIndex = +key;
      }
    });

    setMaxVotes(maxIndex);
  }

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {!votes[selected] ? 0 : votes[selected]} votes</p>

      <Button clicked={() => onVoteClickedHandler()}>vote</Button>
      <Button clicked={() => onNextAnecdoteClickedHandler()}>next anecdote</Button>
      <hr/>

      <h1>Anecdote with most votes</h1>
      <p>{oneWithMaxVotes !== null ? props.anecdotes[oneWithMaxVotes] : null}</p>

    </div>
  );
}

export default App;
