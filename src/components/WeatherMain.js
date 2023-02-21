import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';

export const WeatherMain = ({weatherData, unit}) => {
  	return (
		<>
			{
		        weatherData.city !== undefined ? (
		            weatherData.list.map((element, index) => {
		              	if (index === 0) {
		                	return (
			                  	<div className="today-hightlights" key={index}>
				                    <div className="box">
				                    	<p className="title">Wind status</p>
				                      	<div className="info-data">
				                        	<h2>{element.wind.speed.toFixed(0)}</h2>
				                        	<span>{unit !== 'metric' ? 'km/h' : 'mph'}</span>
				                      	</div>
				                      	<div className="wsw">
				                      		<FontAwesomeIcon icon={faLocationArrow}/>
				                      		<span>WSW</span>
				                    	</div>
				                    </div>
				                    <div className="box">
				                    	<p className="title">Humidity</p>
				                        <div className="info-data">
				                        	<h2>{element.main.humidity}</h2>
				                        	<span>%</span>
				                      	</div>
				                      	<div className="porcents">
				                        	<span>0</span>
				                        	<span>50</span>
				                        	<span>100</span>
				                      	</div>
				                      	<div className="bar">
				                        	<div className="porcent" style={{width: `${element.main.humidity}%`}}></div>
				                      	</div>
				                      	<p className="porcent-icon">%</p>                      
				                    </div>
				                    <div className="box">
				                    	<p className="title">Visibility</p>
				                      	<div className="info-data visibility">
				                        	<h2>{element.visibility}</h2>
				                        	<span>{unit !== 'metric' ? 'kilometers' : 'miles'}</span>
				                      	</div>
				                    </div>
				                    <div className="box">
				                    	<p className="title">Air Pressure</p>
				                      	<div className="info-data">
				                        	<h2>{element.main.pressure}</h2>
				                        	<span>mb</span>
				                      	</div>
				                    </div>
			                    </div>
		            		)
		              	}
		            })
		        ) : <div className="spinner"></div>
	        }
        </>
	)
}