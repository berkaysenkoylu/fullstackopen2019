import React, { useState, useEffect, useRef } from 'react';

import Country from './Country/Country';

const Countries = (props) => {
    const [ showCaseCountry, setShowCaseCountry ] = useState(null);

    const onCountryShowHandler = (selectedCountry) => {
        setShowCaseCountry(selectedCountry);
    }

    let pageContent = useRef(null);
    if (props.countries.length > 10) {
        pageContent.current = <p>Too many matches, soecify another filter</p>
    } 
    else
    {
        if(props.countries.length === 1) {
            pageContent.current = <Country country={props.countries[0]} />;
        } 
        else 
        {
            pageContent.current = props.countries.map(country => {
                return <div key={country.name}>{country.name} <button onClick={() => onCountryShowHandler(country)}>show</button></div>
            });
        }
    }

    if(showCaseCountry) {
        pageContent.current = <Country country={showCaseCountry} />
    }
    
    // As the filter value changes, we need a way out to showcase country
    useEffect(() => {
        setShowCaseCountry(null);

        pageContent.current = props.countries.map(country => {
            return <div key={country.name}>{country.name} <button onClick={() => onCountryShowHandler(country)}>show</button></div>
        });
            
    }, [props.shouldReset, props.countries]);

    return (
        <div style={{marginTop: '1rem'}}>
            {pageContent.current}
        </div>
    )
}

export default Countries;
