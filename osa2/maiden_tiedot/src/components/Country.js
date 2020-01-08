import React, { useState, useEffect } from 'react'
import axios from 'axios'
// just export your openweathermap api key as a string from /src/weatherApiKey.js
import weatherApiKey from '../weatherApiKey.js'

const Weather = (props) => {
	const { country, weather } = props

	console.log(props)

	const icon_url = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` // 01d@2x.png

	const deg2card = (deg) => {
		const lkup = [
			{v: 0, t: 'N'},
			{v: 22.5, t: 'NNE'},
			{v: 45, t: 'NE'},
			{v: 67.5, t: 'ENE'},
			{v: 90, t: 'E'},
			{v: 112.5, t: 'ESE'},
			{v: 135, t: 'SE'},
			{v: 157.5, t: 'SSE'},
			{v: 180, t: 'S'},
			{v: 202.5, t: 'SSW'},
			{v: 225, t: 'SW'},
			{v: 247.5, t: 'WSW'},
			{v: 270, t: 'W'},
			{v: 292.5, t: 'WNW'},
			{v: 315, t: 'NW'},
			{v: 337.5, t: 'NNW'},
			{v: 360, t: 'N'}
		]
		let closest = [420, -1]
		for (let i = 0; i < lkup.length; i += 1) {
			let diff = Math.abs( lkup[i].v - deg )
			if (diff < closest[0]) {
				closest = [diff, i]
			}
		}
		console.log("deg2card", deg, closest, lkup[closest[1]])
		return lkup[closest[1]].t
	}

	const k2c = (k) => (k - 273.15).toFixed(1)

	return (
		<div>
			<h2>Weather in {country.capital}</h2>
			<p><strong>temperature:</strong> {k2c(weather.main.temp)}°C, feels like {k2c(weather.main.feels_like)}°C</p>
			<p><img src={icon_url} alt={`${weather.weather.main}: ${weather.weather.description}`} /></p>
			{(weather.wind && typeof (weather.wind.speed) !== 'undefined')
				? <p><strong>wind:</strong> {typeof (weather.wind.deg) !== 'undefined'
					? <>{deg2card(weather.wind.deg)} ({weather.wind.deg}°)</>
					: <></>
				} @ {weather.wind.speed} m/s</p>
				: <></>}
		</div>
	)
}

const Country = (props) => {
	const { country } = props
	const [ weather, setWeather ] = useState(null)

	useEffect(() => {
		if (typeof (weatherApiKey) !== 'string' || weatherApiKey === '') {
			console.log('no weatherApiKey set! see /src/weatherApiKey.example.js for instructions')
			return
		}
		const api_url = `https://api.openweathermap.org/data/2.5/weather/?appid=${weatherApiKey}&q=${country.capital},${country.alpha2Code}`
		const wkey = `weather_${country.alpha2Code}`

		const expiryMs = 1000 * 60 * 15
		const tsNow = new Date()
		const tsNewest = JSON.parse(sessionStorage.getItem('weather_latest'))
		if (
			!tsNewest ||
			tsNow - Date.parse(tsNewest) > expiryMs
		) {
			console.log('all weather data has expired')
			sessionStorage.clear()
		}
		const storedWeather = JSON.parse(sessionStorage.getItem(wkey))

		if (
			!storedWeather ||
			tsNow - Date.parse(storedWeather.ts) > expiryMs
		) {
			console.log('fetching new weather data')
			axios.get(api_url).then((resp) => {
				setWeather(resp.data)
				sessionStorage.setItem(wkey, JSON.stringify({
					weather: resp.data,
					ts: new Date()
				}))
				sessionStorage.setItem('weather_latest', JSON.stringify(new Date()))
			})
		} else {
			console.log('using stored weather')
			setWeather(storedWeather.weather)
		}
	}, [country, setWeather])

	return (
		<div>
			<h2>{country.name}</h2>
			<p>capital: {country.capital}</p>
			<p>population: {country.population}</p>
			<h3>languages</h3>
			<ul>
				{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
			</ul>
			<img style={{maxHeight: "33vh"}} src={country.flag} alt={`flag of ${country.name}`} />
			{!weather ? '' : <Weather country={country} weather={weather} />}
		</div>
	)
}

export default Country
