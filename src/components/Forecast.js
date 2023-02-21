import React from 'react';

export const Forecast = ({weatherData}) => {
	return (
		<div className="forecast">
      <div className="weather-days">
        {
          weatherData.city !== undefined ? (
            weatherData.list.map((element, index) => {
                if (index === 0 || index === 8 || index === 16 || index === 24 || index === 32 || index === 40) {
                  let dt = new Date(element.dt_txt).toUTCString();
                  let dateFormat = dt.slice('', 11);                  
                  return (
                    <li key={index}>
                      <p className="date">{index === 0 ? 'Tomorrow' : dateFormat}</p>
                      <div className="weather-icon">
                        {element.weather[0].description === 'clear sky' && <img src={require('../icons/Clear.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'scattered clouds' && <img src={require('../icons/Cloud.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'broken clouds' && <img src={require('../icons/Cloud.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'overcast clouds' && <img src={require('../icons/Cloud.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'light snow' && <img src={require('../icons/Cold-Cloud.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'snow' && <img src={require('../icons/Cold.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'few clouds' && <img src={require('../icons/Light-Cloud.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'light rain' && <img src={require('../icons/Rain.png')} alt="weather icon"/>}
                        {element.weather[0].description === 'moderate rain' && <img src={require('../icons/Cloud-Rain.png')} alt="weather icon"/>}                        
                      </div>
                      <p>
                        <span>{element.main.temp_max.toFixed(0)}°C</span>
                        <span>{element.main.temp_min.toFixed(0)}°C</span>                        
                     </p>
                  </li>
                )
              }
            })
          ) : <div className="spinner"></div>
        }
      </div>
    </div>	
	)
}