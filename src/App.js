import React, { useState } from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
  
  // const [temp, setTemp] = useState(data.main.temp);
  const [unit, setUnit] = useState("C");
  const oppositeUnit = unit === "C" ? "F" : "C";
  const convert = () => {
    if (unit === "C") {
      // const newT = temp * 1.8 + 32;
      // setTemp(Math.round(newT));
      setUnit(oppositeUnit);
    }

    if (unit === "F") {
      // const newT = ((temp - 32) * 5) / 9;
      // setTemp(Math.round(newT));
      setUnit(oppositeUnit);
    }
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }



  return (
    <div className="app">
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
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          {/* <img className='weather-icon'lassName='weather-icon' alt='weather-icon' src={require('./assets/clear.png')}/> */}
          {data.main ? <img  className='weather-icon' alt='weather-icon' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}/> : null}
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°{unit}</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
             <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°{unit}</p> : null}
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
      </div>

    </div>
    
  );
  
}

export default App;