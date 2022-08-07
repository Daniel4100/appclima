import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

import Card from './components/Card'
import Loader from './components/Loader'
import Notfound from './components/Notfound'



function App() {
  const [cordenadas, setcordenadas] = useState()
  const [weather, setWeather] = useState()
  const [changeTemp, setChangeTemp] = useState(true)
  const [isLoading, setisLoading] = useState(true)
  const [location, setLocation] = useState('')

  const [notFound, setNotFound] = useState(true)


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=895284fb2d2c50a520ea537456963d9c`

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

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setWeather(response.data)
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
        setNotFound(false)
        setTimeout(() =>{
          setNotFound(true)

        }, 3000)
      })
      setLocation('')
    }
  }

  const change = () => setChangeTemp(!changeTemp)
  
  console.log(weather)
  return (
    <div className="App">
      {isLoading ? <Loader /> :<Card 
      weather={weather}
      change={change}
      changeTemp={changeTemp}
      location={location}
      setLocation={setLocation}
      searchLocation={searchLocation}
      notFound={notFound}
      />}
    </div>
  )
}

export default App
