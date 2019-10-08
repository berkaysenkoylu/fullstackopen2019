import React, { useState } from 'react';

import classes from './App.module.css';
import countryAxios from './countryAxios';

import Countries from './Components/Countries/Countries';

const App = () => {
  const [ country, setCountry ] = useState('');
  const [ countriesResult, setCountriesResult ] = useState([]);


  const onCountryInputChangeHandler = (event) => {
    setCountry(event.target.value);
    if (event.target.value.length > 0) {
      countryAxios.get(`name/${event.target.value}`).then(response => {
        setCountriesResult(response.data);
      });
    }
    else {
      setCountriesResult([]);
    }
  }

  return (
    <div className={classes.App}>
      <div>
        find countries: <input value={country} onChange={onCountryInputChangeHandler} />
        <Countries countries={countriesResult} shouldReset={country} />
      </div>
    </div>
  );
}

export default App;
