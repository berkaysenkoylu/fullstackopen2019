import React, { useState, useEffect } from 'react';

import weatherAxios from '../../../weatherAxios';
import Weather from '../../../Components/Weather/Weather';

const API_KEY = 'b111cf52caa7ebb3131f26070153b42d';

const Country = (props) => {
    const [ weatherData, setWeatherData ] = useState({});

    let country = props.country;

    let languagesContent = country.languages.map(language => {
        return <li key={language.name}>{language.name}</li>
    });

    useEffect(() => {
        weatherAxios.get(`/current?access_key=${API_KEY}&query=${country.capital}`).then(response => {
            setWeatherData(response.data);
        })
    }, [country.capital]);

    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
            </div>
            <h3>languages</h3>
            <div>
                <ul>
                    {languagesContent}
                </ul>
            </div>
            <img src={country.flag} alt="flag" style={{ width: '20%' }} />
            <Weather weatherData={weatherData} />
        </div>
    )
}

export default Country;
