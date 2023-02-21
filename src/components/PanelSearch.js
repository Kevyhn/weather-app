import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faChevronRight, faXmark} from '@fortawesome/free-solid-svg-icons';

export const PanelSearch = ({panelSearch, closeSearch, locationInp, searchCity, city, cityNames, getWeatherLocation}) => {
	return (
		<div className="panel-search" ref={panelSearch}>
      <button className="close-button" onClick={closeSearch}><FontAwesomeIcon icon={faXmark}/></button>
        <div className="search">
          <div className="input">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type="text" placeholder="search location" ref={locationInp} onKeyPress={e => e.charCode === 13 && searchCity()}/>
          </div>
          <button onClick={searchCity}>Search</button>
        </div>
        {
          city.length >= 1 ? (
            cityNames.length >= 1 ? (
              cityNames.map((element, index) => {
                return (
                  <li key={index} data-lat={element.lat} data-lon={element.lon} onClick={e => getWeatherLocation(e)}>
                    <div className="name-country">
                      <p className="city">{element.name}</p>           
                      <p className="country">{!element.state ? '' : `${element.state}, `}{element.country}</p>
                    </div>  
                    <div>
                    <span>
                      <FontAwesomeIcon icon={faChevronRight}/>
                    </span>
                    </div>
                  </li>
                )
              })
            ) : <div className="dots"></div>
          ) : ''
        }
    </div>
	)
}