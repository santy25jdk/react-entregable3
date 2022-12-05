import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {

  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {

    let API

    if(locationInput){
      API = `https://rickandmortyapi.com/api/location/${locationInput}`
    }else{
      const randomIdLocation = Math.floor(Math.random() * 126) + 1;
      API = `https://rickandmortyapi.com/api/location/${randomIdLocation}`
    }


    axios.get(API)
    .then(res => {
      setHasError(false)
      setLocation(res.data)
    } )
    .catch(err => {
      setHasError(true)
      console.log(err)
    } )
  }, [locationInput])

  const handleSubmit = e => {
    e.preventDefault()
    setLocationInput(e.target.inputSearch.value)
  }
  

  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      <form onSubmit={handleSubmit}>
        <input id='inputSearch' type="text" />
        <button>Search</button>
      </form>
      {
        hasError ?
        <ErrorFetch />
        :
      <>
      <LocationInfo location={location} />
      <div className='residents-container'>
        {
          location?.residents.map(url => (
            <ResidentCard key={url} url={url} />
            ))
        }
      </div>
      </>
      }
    </div>
  )
}

export default App
