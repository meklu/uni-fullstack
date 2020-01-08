import React from 'react'

const Country = (props) => {
	const { country } = props
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
		</div>
	)
}

export default Country
