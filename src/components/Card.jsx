import React from 'react'
import imagen from "../assets/intercambiar.png"

const Card = ({weather, change, changeTemp}) => {
    return (
    <>
        <div className='card'>
            <div className='cardone'>
            <h1>{changeTemp ? (weather?.main.temp - 273.15).toFixed(1) + ' °C' : ( 1.8 * (weather?.main.temp - 273) +32).toFixed (1) + ' °F'}</h1>
            <button onClick={change}> <img src={imagen} />{changeTemp ? 'F' : 'C'}</button>
            
            
            </div>
            
            <div className='title'>
                <p className='city'>{weather?.name} {weather?.sys.country} </p>
                {/* <p className='country'></p> */}
                <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                <h2>{weather?.weather[0].description}</h2>
            </div>
            <div className='cardtwo'>
            <h2>Clouds: {weather?.clouds.all}%</h2>
            <h2>Humidity: {weather?.main.humidity}%</h2>
            <h2>wind speed: {weather?.wind.speed} m/s</h2>
            </div>
            
            
            
        </div>
    </>
  )
}

export default Card