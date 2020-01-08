import React, { useState, useEffect } from 'react'

import personService from './services/personService'

import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
	const [ persons, setPersons] = useState([])

	const [ search, setSearch ] = useState('')

	const personsShown = (search === '')
		? persons
		: persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

	useEffect(() => {
		personService.getAll().then((initialP) => {
			setPersons(initialP)
		})
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Search search={search} setSearch={setSearch} />
			<h3>Add new</h3>
			<PersonForm persons={persons} setPersons={setPersons} personService={personService} />
			<h2>Numbers</h2>
			<Persons persons={personsShown} />
		</div>
       )
}

export default App
