import './App.css';
import {useState, useEffect, useRef} from 'react';
import {PanelSearch} from './components/PanelSearch';
import {Forecast} from './components/Forecast';
import {WeatherMain} from './components/WeatherMain';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationCrosshairs, faLocationDot} from '@fortawesome/free-solid-svg-icons';

function App() {

  const [weatherData, setWeatherData] = useState({city: undefined});
  const [city, setCity] = useState('Madrid');
  const [cityNames, setCityNames] = useState([]);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    currentPosition();
  }, []);

  useEffect(() => {
    getGeoData(city);
  }, [city]);

  const locationInp = useRef();
  const panelSearch = useRef();

  const getGeoData = (name) => {
    setCityNames([]);
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(response => setCityNames(response))
      .catch(err => console.log(err));
  }

  const getWeatherData = (lat, lon, units = 'metric') => {
    setWeatherData([]);
    if (units !== 'metric') setUnit('imperial')
    else setUnit('metric');
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(response => setWeatherData(response))
      .catch(err => console.error(err)); 
  }

  const searchCity = () => {
    let value = locationInp.current.value;
    if (value.length === 0) return null;
    setCity(value);
  }

  const getWeatherLocation = (e) => {
    panelSearch.current.style.left = "-100%";
    let lat = e.target.parentElement.parentElement.dataset.lat;
    let lon = e.target.parentElement.parentElement.dataset.lon;
    if (lat === undefined && lon === undefined) getWeatherData(e.target.dataset.lat, e.target.dataset.lon);
    else getWeatherData(lat, lon);
  }

  const success = pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    getWeatherData(lat, lon);
  }

  const error = err => console.warn(`ERROR(${err.code}): ${err.message}`);

  const currentPosition = () => navigator.geolocation.getCurrentPosition(success, error);

  const openSearch = () => {
    locationInp.current.focus();
    panelSearch.current.style.left = "0px";
  };

  const closeSearch = () => panelSearch.current.style.left = "-100%";

  let date = new Date().toUTCString();
  let dateFormat = date.slice('', 11);

  return (
    <div className="App">
      <div className="main-data">
        <PanelSearch panelSearch={panelSearch} closeSearch={closeSearch}
                     locationInp={locationInp} searchCity={searchCity} city={city}
                     cityNames={cityNames} getWeatherLocation={getWeatherLocation}
        />
        <div className="options">
          <button className="open-button" onClick={openSearch}>Search for places</button>
          <button className="position-button" onClick={currentPosition}>
            <FontAwesomeIcon icon={faLocationCrosshairs}/>
          </button>          
        </div>
        <div className="bg-clouds">
          <img src={require('./icons/Cloud-background.png')} alt="background"/>
        </div>
          {
            weatherData.city !== undefined ? (
              <>
                <div className="main-icon">                  
                  {weatherData.list[0].weather[0].description === 'clear sky' && <img src={require('./icons/Clear.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'scattered clouds' && <img src={require('./icons/Cloud.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'broken clouds' && <img src={require('./icons/Cloud.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'overcast clouds' && <img src={require('./icons/Cloud.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'light snow' && <img src={require('./icons/Cold-Cloud.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'snow' && <img src={require('./icons/Cold.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'few clouds' && <img src={require('./icons/Light-Cloud.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'light rain' && <img src={require('./icons/Rain.png')} alt="weather icon"/>}
                  {weatherData.list[0].weather[0].description === 'moderate rain' && <img src={require('./icons/Cloud-Rain.png')} alt="weather icon"/>} 
                </div>
                <div className="temp">
                  <h1>{weatherData.list[0].main.temp.toFixed(0)}</h1>
                  <h3>°C</h3>
                </div>
                <h5 className="description">{weatherData.list[0].weather[0].description}</h5>
                <p className="date">Today - {dateFormat}</p>
                <div className="location">
                  <FontAwesomeIcon icon={faLocationDot}/>
                  <p>{weatherData.city.name}</p>
                </div>
              </>
            ) : <div className="spinner"></div>
          }
      </div>
      <div className="weather-info">
        <div className="metrics">
          <button style={unit === 'metric' ? {background: '#fff', color: "#000"} : {background: '#666'}} onClick={e => {
            getWeatherData(weatherData.city.coord.lat, weatherData.city.coord.lon, 'metric')
          }}>°C</button>
          <button style={unit === 'imperial' ? {background: '#fff', color: '#000'} : {background: '#666'}} onClick={e => {
            getWeatherData(weatherData.city.coord.lat, weatherData.city.coord.lon, 'imperial')
          }}>°F</button>
        </div>
        <Forecast weatherData={weatherData}/>
        <h3>Today's Hightlights</h3>
        <WeatherMain weatherData={weatherData} unit={unit}/>
        <footer><p>created by <a href="https://github.com/Kevyhn" target="_BLANK">Kevin</a> - devChallenges.io</p></footer>
      </div>
    </div>
  );
}
export default App;
