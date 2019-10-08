import React from 'react' 

const Weather = (props) => {
    const data = props.weatherData;

    let pageContent = null;
    if(data.location && data.current){
        pageContent = 
            (<div>
                <h3>Weather in {data.location.name}</h3>
                <p><b>Temperature:</b> {data.current.temperature} Celcius</p>
                <img src={data.current.weather_icons[0]} alt="weather_icon" />
                <p><b>Wind:</b> {data.current.wind_speed} kph, direction {data.current.wind_dir}</p>
            </div>)
    }
    else {
        pageContent = null;
    }

    return (
        <div>
            {pageContent}
        </div>
    )
}

export default Weather;
