import React, { useState } from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
  const weatherurl = `https://api.openweathermap.org//data/2.5/forecast?q=${location}&cnt=5&appid=${API_KEY}&units=imperial`

  // const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
  const [temps, setTemp] = useState(null); 
  const [unit, setUnit] = useState("F");
  const [feelsLike, setFeelsLike] = useState(null); 
  const oppositeUnit = unit === "C" ? "F" : "C";

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(weatherurl).then((response) => {
        setData(response.data)
        setTemp(response.data.list[0].main.temp); 
        setFeelsLike(response.data.list[0].main.feels_like); 
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const convert = () => {
    if (unit === "C") {
      const newT = temps * 1.8 + 32;
      setTemp(Math.round(newT));
      
      const newFeelsLike = feelsLike * 1.8 + 32;
      setFeelsLike(Math.round(newFeelsLike));
      setUnit(oppositeUnit);
    }

    if (unit === "F") {
      const newT = ((temps - 32)/1.8);
      setTemp(Math.round(newT));

      const newFeelsLike = (feelsLike - 32) / 1.8; 
      setFeelsLike(Math.round(newFeelsLike));
      setUnit(oppositeUnit);
    }
  };


  return (
    <div className="app">
{/*/// search bar// */}
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
          <button onClick={convert}>°{oppositeUnit}</button>
      </div>

      <div className="container">
{/*//// top//// */}
        <div className="top">
          <div className="location">
            <p>{data.city ? data.city.name : ''}</p>
          </div>
          {data.list && data.list[0] && data.list[0].weather ? (
            <img  
              className='weather-icon' 
              alt='weather-icon' 
              src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`}
              /> 
            ): null
          }
          <div className="temp">
            {data.list ? <h1>{temps.toFixed()}°{unit}</h1> : null}
          </div>
          <div className="description">
            {data.list && data.list[0] && data.list[0].weather ? (
              <p>{data.list[0].weather[0].main}</p>
            ) : null}
          </div>
        </div>
      
{/*/// bottom// */}

        {data.list !== undefined &&(
          <div className="bottom">
             <div className="feels">
             {feelsLike !== null ? <p className='bold'>{feelsLike.toFixed()}°{unit}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.list && data.list[0] && data.list[0].main ? (
                <p className='bold'>{data.list[0].main.humidity}%</p> 
              ): null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.list && data.list[0] && data.list[0].wind ? (
                <p className="bold">{data.list[0].wind.speed.toFixed()} MPH</p>
              ) : null}              
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        {data.list !== undefined && (
          <div className="bottom-forecast">
            {data.list.slice(1).map((forecast, index) => (
              <div className="forecast" key={index}>
                {forecast.dt_txt.split(' ')[1]}
                {forecast.weather ? (
                  <img
                    className="forecast-icon"
                    alt="forecast-icon"
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  />
                ) : null}
                {forecast.main ? (
                  // chnage to min and max or chnage to temp and feels like?
                  <>
                    {unit === 'C' ? Math.round((forecast.main.temp - 32) / 1.8) : Math.round(forecast.main.temp)}°{unit}
                    <br />
                    {unit === 'C' ? Math.round((forecast.main.feels_like - 32) / 1.8) : Math.round(forecast.main.feels_like)}°{unit}
                  </>
                ) : null}
              </div>
            ))}
          </div>
        )}
        
      </div>

    </div>
    
  );
  
}

export default App;