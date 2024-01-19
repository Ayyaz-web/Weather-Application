import axios from "axios";
import React from 'react'
// import './App.css'


const Weatherapi = async (id) => {

    const options = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/current/${id}`,
        params: {
            alt: '0',
            tempunit: 'C',
            windunit: 'MS',
            tz: 'Europe/London',
            lang: 'en'
        },
        headers: {
            'X-RapidAPI-Key': 'cc6f0cf0b0mshd896447a3b00b70p16861ajsne4470eb92925',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.current;
    } catch (error) {
        console.error(error);
    }
}

const GetLocation = async (city, country) => {

    const options = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/location/search/${city}`,
        params: {
            lang: 'en',
            country,
        },
        headers: {
            'X-RapidAPI-Key': 'cc6f0cf0b0mshd896447a3b00b70p16861ajsne4470eb92925',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.locations[0]?.id;
    } catch (error) {
        console.error(error);
    }
}

export { Weatherapi, GetLocation };

