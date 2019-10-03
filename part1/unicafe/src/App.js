import React, { useState } from 'react';
import './App.css';

import Header from './components/header/header';
import Stats from './components/stats/stats';
import Button from './components/ui/button/button';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonPressedHandler = (btnName) => {
    switch(btnName) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default: 
        console.log("Wrong button type PLEB! Check for mistakes.");
        break;
    }
  }

  const data = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'total': good + neutral + bad,
    'average': (((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)).toFixed(1),
    'positive': ((good / (good + neutral + bad)) * 100).toFixed(1)
  };

  return (
    <div className="App">
      <Header />

      <div>
        <Button btnName={'good'} clicked={() => onButtonPressedHandler('good')} />
        <Button btnName={'neutral'} clicked={() => onButtonPressedHandler('neutral')} />
        <Button btnName={'bad'} clicked={() => onButtonPressedHandler('bad')} />
      </div>

      <Stats data={data} />
    </div>
  );
}

export default App;
