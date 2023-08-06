import React, { useState } from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
  // const weatherurl = `https://api.openweathermap.org//data/2.5/forecast?q=${location}&cnt=5&appid=${API_KEY}&units=imperial`

  const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
  const [temps, setTemp] = useState(null); // Initialize the temperature state
  const [unit, setUnit] = useState("F");
  const [feelsLike, setFeelsLike] = useState(null); // Initialize the "feels-like" state
  const oppositeUnit = unit === "C" ? "F" : "C";

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(weatherurl).then((response) => {
        setData(response.data)
        setTemp(response.data.main.temp); // Store the temperature value in the state
        setFeelsLike(response.data.main.feels_like); // Store the "feels-like" temperature value
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const convert = () => {
    if (unit === "C") {
      const newT = temps * 1.8 + 32;
      setTemp(Math.round(newT));
      
      const newFeelsLike = feelsLike * 1.8 + 32; // Convert the "feels-like" temperature to Fahrenheit
      setFeelsLike(Math.round(newFeelsLike));
      setUnit(oppositeUnit);
    }

    if (unit === "F") {
      const newT = ((temps - 32)/1.8);
      setTemp(Math.round(newT));

      const newFeelsLike = (feelsLike - 32) / 1.8; // Convert the "feels-like" temperature to Celsius
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
            <p>{data.name}</p>
          </div>
          {/* <img className='weather-icon'lassName='weather-icon' alt='weather-icon' src={require('./assets/clear.png')}/> */}
          {data.main ? <img  className='weather-icon' alt='weather-icon' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}/> : null}
          <div className="temp">
            {data.main ? <h1>{temps.toFixed()}°{unit}</h1> : null}
            {/* {data.main ? <h1>{data.main.temp.toFixed()}°{unit}</h1> : null} */}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      
{/*/// bottom// */}
        {data.name !== undefined &&
          <div className="bottom">
             <div className="feels">
             {feelsLike !== null ? <p className='bold'>{feelsLike.toFixed()}°{unit}</p> : null}
              {/* {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°{unit}</p> : null} */}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

        {/* {data.name !== undefined &&(
          <div className="bottom-forecast">
            <div className= "forecast"> 
              Friday
              <img className= "forecast-icon"alt="forecast-icon" src={require("./assets/clear.png")}/>
              83°F<br></br>68°F
            </div>
            
          </div>
        )} */}
        
      </div>

    </div>
    
  );
  
}

export default App;