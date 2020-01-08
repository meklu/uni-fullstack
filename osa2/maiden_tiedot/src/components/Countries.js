import React from 'react'

import Country from './Country'

const Countries = (props) => {
	const { countries, setFilter } = props

	if (countries.length > 10) {
		return (
			<p>Too many matches, narrow it down.</p>
		)
	} else if (countries.length !== 1) {
		return countries.map(c =>
			<p key={c.name}>{c.name} <button onClick={() => setFilter(c.name)}>show</button></p>
		)
	}
	return <Country country={countries[0]} />
}

export default Countries
