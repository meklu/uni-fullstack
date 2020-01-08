import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ filter, setFilter ] = useState('')

	const filterEdited = (e) => {
		setFilter(e.target.value)
	}

	const countriesShown = (filter === '')
		? []
		: countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((resp) => {
			console.log(resp)
			setCountries(resp.data)
		})
	}, [])

	return (
		<div>
			<p>find countries: <input value={filter} onChange={filterEdited} /></p>
			<Countries countries={countriesShown} />
		</div>
	)
}

export default App
