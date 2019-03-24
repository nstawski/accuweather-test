import React, { Component } from 'react';
import 'whatwg-fetch';
import CitySearch from './components/CitySearch';
import FavoriteCities from './components/FavoriteCities';
import text from './text.json';
import './App.scss';

const apikey = "%ENTER_APIKEY_HERE%";
const localStorageIdentifier = "accu-favoriteCities";

const urlGenerators = {
    getCity: (cityName) => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${encodeURI(cityName)}`,
    getWeatherByKey: (cityKey) => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apikey}`,
    getCityByKey: (cityKey) => `http://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${apikey}`
};

const storage = {
    getFavoriteCities: () => localStorage.getItem(localStorageIdentifier) ? JSON.parse(localStorage.getItem(localStorageIdentifier)) : [],
    addFavoriteCity: (cityKey) => {
        var favoriteCities = localStorage.getItem(localStorageIdentifier) ? JSON.parse(localStorage.getItem(localStorageIdentifier)) : [];
        if (favoriteCities.indexOf(cityKey) === -1) { //The check if the key exists or not will depend on the size of favoriteCities array. Can be remediated by using an object instead, but then we would need additional structures.logic to preserve order.
            favoriteCities.unshift(cityKey); //adding to the top of the list
        }
        localStorage.setItem(localStorageIdentifier, JSON.stringify(favoriteCities));
        return favoriteCities;
    },
    delFavoriteCity: (cityKey) => {
        var favoriteCities = localStorage.getItem(localStorageIdentifier) ? JSON.parse(localStorage.getItem(localStorageIdentifier)) : [];
        for (var i = 0; i < favoriteCities.length; i++) {
            if (favoriteCities[i] === cityKey) {
                favoriteCities.splice(i, 1)
            }
        }
        localStorage.setItem(localStorageIdentifier, JSON.stringify(favoriteCities));
        return favoriteCities;
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteCities: [],
            error: ""
        }
        this.parseResponseStatus = this.parseResponseStatus.bind(this);
        this.parseJson = this.parseJson.bind(this);
        this.getCityKeyOrFail = this.getCityKeyOrFail.bind(this);
        this.addFavoriteCity = this.addFavoriteCity.bind(this);
        this.delFavoriteCity = this.delFavoriteCity.bind(this);
        this.getCityInfoOrFail = this.getCityInfoOrFail.bind(this);
        this.getWeatherForCities = this.getWeatherForCities.bind(this);
        this.retrieveCityByTheName = this.retrieveCityByTheName.bind(this);
    }

    parseResponseStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    parseJson(response) {
        return response.json()
    }

    getCityKeyOrFail(data) {
        if (data.length && Object.keys(data[0]).indexOf("Key") !== 'undefined') {
            return Promise.resolve(data[0]["Key"])
        } else {
            return Promise.reject(new Error(text.couldNotFindTheCity))
        }
    }

    getCityInfoOrFail(data) {
        let cityInfo = {};
        if (typeof data !== 'undefined') {
            //LocalizedName AdministrativeArea (ID)
            if (Object.keys(data).indexOf("LocalizedName") !== 'undefined') {
                cityInfo.name = data["LocalizedName"];
            }
            if (Object.keys(data).indexOf("AdministrativeArea") !== 'undefined' && Object.keys(data["AdministrativeArea"]).indexOf("ID") !== 'undefined') {
                cityInfo.state = data["AdministrativeArea"]["ID"];
            }
            if (Object.keys(data).indexOf("Key") !== 'undefined') {
                cityInfo.key = data["Key"];
            }
            return Promise.resolve(cityInfo)
        } else {
            return Promise.reject(new Error(text.couldNotFetchCityData))
        }
    }

    getCityWeatherOrFail(data, cityInfo) {
        let cityWeather = {...cityInfo };
        if (data.length) {
            if (Object.keys(data[0]).indexOf("WeatherIcon") !== 'undefined') {
                cityWeather.icon = data[0]["WeatherIcon"];
            }
            if (Object.keys(data[0]).indexOf("WeatherText") !== 'undefined') {
                cityWeather.text = data[0]["WeatherText"];
            }
            if (Object.keys(data[0]).indexOf("Temperature") !== 'undefined') {
                cityWeather.temperature = data[0]["Temperature"];
            }
            return Promise.resolve(cityWeather)
        } else {
            return Promise.reject(new Error(text.couldNotFetchCityWeather))
        }
    }

    addFavoriteCity = (cityInfo) => {
        storage.addFavoriteCity(cityInfo);
    };

    delFavoriteCity = (cityKey) => {
        storage.delFavoriteCity(cityKey);
        this.getWeatherForCities();
    };

    retrieveCityByTheName = (cityName) => {
        this.setState({ error: "" });
        if (cityName && cityName.length) {
            fetch(urlGenerators.getCity(cityName))
                .then(this.parseResponseStatus)
                .then(this.parseJson)
                .then(this.getCityKeyOrFail)
                .then(this.addFavoriteCity)
                .then(this.getWeatherForCities)
                .catch(error => {
                    this.setState({ error: text.couldNotFetchTheCity });
                })
        }
    }

    getWeatherForCities = () => {
        let favoriteCities = storage.getFavoriteCities();
        let multiCityInfo = favoriteCities.map((cityKey) => {
            return fetch(urlGenerators.getCityByKey(cityKey))
                .then(this.parseResponseStatus)
                .then(this.parseJson)
                .then(this.getCityInfoOrFail)
                .then((cityInfo) => {
                    return fetch(urlGenerators.getWeatherByKey(cityInfo.key))
                        .then(this.parseResponseStatus)
                        .then(this.parseJson)
                        .then((data) => this.getCityWeatherOrFail(data, cityInfo))
                })
        })
        return Promise.all(multiCityInfo).then((allCities) => {
            this.setState({ "favoriteCities": allCities })
        })
    }

    componentDidMount() {
        this.getWeatherForCities();
    }

    render() {
        return ( <div className = "App">
            <CitySearch 
                handleClick = { this.retrieveCityByTheName }
                error = { this.state.error }
            />
            <FavoriteCities 
                cities = { this.state.favoriteCities }
                handleDelete = { this.delFavoriteCity }
            />
            </div>
        );
    }
}

export default App;