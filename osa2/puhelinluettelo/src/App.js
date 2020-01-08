import React, { useState } from 'react'

import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = (props) => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: 112 }
	])

	const [ search, setSearch ] = useState('')

	const personsShown = (search === '')
		? persons
		: persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

	return (
		<div>
			<h2>Phonebook</h2>
			<Search search={search} setSearch={setSearch} />
			<h3>Add new</h3>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			<Persons persons={personsShown} />
		</div>
       )
}

export default App
