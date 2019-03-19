import React, { Component } from 'react';
import 'whatwg-fetch';
import CitySearch from './components/CitySearch';
import './App.css';

const apikey = "cIgKO9NuJUj2JXirDRKHJ8jBAFxdAHDR";
const query = "San Francisco, CA";

const urlGenerators = {
    getCity: (cityName) => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${encodeURI(cityName)}`,
    getWeather: (cityKey) => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apikey}`,
    getCityByKey: (cityKey) => `http://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${apikey}`
}

class App extends Component {
    constructor(props) {
        super(props);
        this.parseResponseStatus = this.parseResponseStatus.bind(this);
        this.parseJson = this.parseJson.bind(this);
        this.parseData = this.parseData.bind(this);
        this.retrieveCityByTheName = this.retrieveCityByTheName.bind(this);
    }
    
    parseResponseStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    parseJson = (response) => {
        return response.json()
    }
    
    parseData = (data) => {
        if (data.length) {
            var resp = data[0];
            console.log(`location name: ${resp["LocalizedName"]}`)
            console.log(`location key: ${resp["Key"]}`)
            console.log(`weather request url: ${urlGenerators.getWeather(resp["Key"])}`)
            // fetch(urlGenerators.getWeather(resp[0]["Key"]))
            return data[0] 
        } else {
            
        }
    }

    retrieveCityByTheName = () => fetch(urlGenerators.getCity(query))
        .then(this.parseResponseStatus)
        .then(this.parseJson)
        .then(this.parseData)
    
    render() {
        return (
            <div className="App">
                <CitySearch 
                    handleClick = { this.retrieveCityByTheName }
                />
            </div>
        );
    }
}

export default App;
