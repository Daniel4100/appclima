import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

import Card from './components/Card'
import Loader from './components/Loader'



function App() {
  const [cordenadas, setcordenadas] = useState()
  const [weather, setWeather] = useState()
  const [changeTemp, setChangeTemp] = useState(true)
  const [isLoading, setisLoading] = useState(true)

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
      .then(res => {
        setWeather(res.data)
        setisLoading(false)
    })
      .catch(err => console.log(err)) 
    }
  }, [cordenadas])

  console.log(weather);

  const change = () => setChangeTemp(!changeTemp)
  

  return (
    <div className="App">
      {isLoading ? <Loader /> :<Card 
      weather={weather}
      change={change}
      changeTemp={changeTemp}/>}
    </div>
  )
}

export default App
