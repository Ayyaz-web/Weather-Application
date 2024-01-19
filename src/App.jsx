// import HomeScreen from './components/home_screen/HomeScreen';
import React, { useState } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';
import Images from './images';
import { Weatherapi, GetLocation } from './weatherapi';
const App = (data) => {

  const [WeatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);

  const [locationData, setlocationData] = useState({
    country: "",
    city: "",
  });

  const getData = async () => {
    try {
      setLoading(true);
      const id = await GetLocation(locationData.city, locationData.country);
      const data = await Weatherapi(id);
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false);
     
    }
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    
    console.log(name);
    console.log(value);

    setlocationData({ ...locationData, [name]: value });
  }

  return (


    <>
      <div className="App">
        <div className="card">
          <h2 className='title'><img src={Images.storm} alt="random" /> Weather App</h2>
          <div className="search-form">
            <input
              type="text"
              name="country"
              value={locationData.country}
              onChange={handleInput}
              placeholder='Enter your Country Name' />
            <input
              type="text"
              name="city"
              value={locationData.city}
              onChange={handleInput}
              placeholder='Enter your City Name' />
            <button type='button' onClick={getData} >Search</button>
          </div>
          {loading ? (
            <h2>Loading...</h2>
          ) : WeatherData ? (

            <div className="main-container">
              <h4>Live Weather Condition</h4>

              <h3>Weather: {WeatherData?.symbolPhrase} </h3>
              <div className="temprature">
                <h1>Temprature: {WeatherData?.temperature}&deg;C</h1>
              </div>
              <div className="location">
                <h3>{locationData.city} | {locationData.country}</h3>
              </div>
              <div className="temprature">
                <h6>Cloudiness: {WeatherData?.cloudiness}||
                  Pressure: {WeatherData?.pressure} ||
                  Humidity: {WeatherData?.relHumidity}</h6>
              </div>
            </div>
          ) : (
            <h2>Enter city and country to get weather details</h2>

          )}
        </div>
      </div>
    </>
  )
}

export default App;
