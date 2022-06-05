import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import imagen from "./assets/intercambiar.png"



function App() {
  const [cordenadas, setcordenadas] = useState()
  const [weather, setWeather] = useState()
  const [changeTemp, setChangeTemp] = useState(true)

  useEffect (() =>{
    const success = pos =>{
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setcordenadas({lat, lon})
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() =>{
    if(cordenadas !== undefined){
      const API_KEY = '5d80462efd1536c1a19cc3bd1562d397'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${cordenadas.lat}&lon=${cordenadas.lon}&appid=${API_KEY}`

      axios.get(URL)
      .then(res => setWeather(res.data))
      .catch(err => console.log(err)) 
    }
  }, [cordenadas])

  console.log(weather);

  const change = () => setChangeTemp(!changeTemp)
  

  return (
    <div className="App">
      <div className='card'>
        <div className='cardone'>
          <h1>{changeTemp ? (weather?.main.temp - 273.15).toFixed(1) + ' °C' : ( 1.8 * (weather?.main.temp - 273) +32).toFixed (1) + ' °F'}</h1>
          <button onClick={change}> <img src={imagen} />{changeTemp ? 'F' : 'C'}</button>
        </div>
        
        <div className='title'>
          <p className='city'>{weather?.name} </p>
          <p className='country'>{weather?.sys.country}</p>
        </div>
        <div className='cardtwo'>
          <h2>Clouds: {weather?.clouds.all}%</h2>
          <h2>Humidity: {weather?.main.humidity}%</h2>
          <h2>wind speed: {weather?.wind.speed} m/s</h2>
        </div>
        
        
        
      </div>
    </div>
  )
}

export default App
